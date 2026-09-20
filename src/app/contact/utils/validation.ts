import { z } from "zod"

/**
 * Normalizes phone numbers:
 * - Strips all non-digit characters (including dashes)
 * - If 11 digits starting with 1: strip the leading 1 (country code)
 * - Formats as XXX-XXX-XXXX
 */
function normalizePhoneNumber(value: string): string {
  // Strip all non-digits
  const digitsOnly = value.replace(/\D/gu, "")

  // If 11 digits starting with 1, strip the country code
  let phoneDigits = digitsOnly
  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
    phoneDigits = digitsOnly.slice(1)
  }

  // Format as XXX-XXX-XXXX (only if we have 10 digits)
  if (phoneDigits.length === 10) {
    return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`
  }

  // Return as-is if not 10 digits (validation will catch this)
  return value
}

// Validation rules and messages (single source of truth)
export const VALIDATION = {
  name: {
    messages: {
      min: "Name must be at least 2 characters",
      max: "Name must be less than 100 characters",
    },
    rules: {
      min: 2,
      max: 100,
    },
  },
  email: {
    messages: {
      invalid: "Please enter a valid email address",
    },
    rules: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
    },
  },
  phone: {
    messages: {
      invalid: "Please enter a valid phone number",
      minDigits: "Use 10 digits or 11 digits starting with 1",
    },
    rules: {
      minDigits: 10,
      regex: /^[\d\s\-()+]+$/u,
    },
  },
  message: {
    messages: {
      min: "Message must be at least 10 characters",
      max: "Message must be less than 2000 characters",
    },
    rules: {
      min: 10,
      max: 2000,
    },
  },
} as const

// Lightweight client-side validators (no Zod dependency)
export const clientValidators = {
  name: (value: string) => {
    if (value.length < VALIDATION.name.rules.min) {
      return VALIDATION.name.messages.min
    }
    if (value.length > VALIDATION.name.rules.max) {
      return VALIDATION.name.messages.max
    }
  },
  email: (value: string) => {
    if (!VALIDATION.email.rules.regex.test(value)) {
      return VALIDATION.email.messages.invalid
    }
  },
  phone: (value: string) => {
    if (!VALIDATION.phone.rules.regex.test(value)) {
      return VALIDATION.phone.messages.invalid
    }
    const digitsOnly = value.replace(/\D/gu, "")
    if (digitsOnly.startsWith("1")) {
      if (digitsOnly.length !== 11) {
        return VALIDATION.phone.messages.minDigits
      }
    } else if (digitsOnly.length !== 10) {
      return VALIDATION.phone.messages.minDigits
    }
  },
  message: (value: string) => {
    if (value.length < VALIDATION.message.rules.min) {
      return VALIDATION.message.messages.min
    }
    if (value.length > VALIDATION.message.rules.max) {
      return VALIDATION.message.messages.max
    }
  },
} as const

// Server-side Zod schema (only used in server actions)
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.name.rules.min, VALIDATION.name.messages.min)
    .max(VALIDATION.name.rules.max, VALIDATION.name.messages.max),
  email: z.string().email(VALIDATION.email.messages.invalid),
  phone: z
    .string()
    .regex(VALIDATION.phone.rules.regex, VALIDATION.phone.messages.invalid)
    .refine((val) => {
      const digitsOnly = val.replace(/\D/gu, "")
      if (digitsOnly.startsWith("1")) {
        return digitsOnly.length === 11
      }
      return digitsOnly.length === 10
    }, VALIDATION.phone.messages.minDigits)
    .transform((val) => normalizePhoneNumber(val))
    .refine((val) => val.replace(/\D/gu, "").length === 10, VALIDATION.phone.messages.minDigits),
  address: z.string().optional(),
  howDidYouHearAboutUs: z.string().optional().default("Google"),
  howDidYouHearAboutUsOther: z.string().optional(),
  message: z
    .string()
    .min(VALIDATION.message.rules.min, VALIDATION.message.messages.min)
    .max(VALIDATION.message.rules.max, VALIDATION.message.messages.max),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
