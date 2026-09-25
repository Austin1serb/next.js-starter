import { z } from "zod"
import { CONTACT_FIELD_LIMITS } from "./field-limits"

const phoneSchema = z
  .string()
  .regex(/^[\d\s\-()+]+$/u, "Please enter a valid phone number")
  .transform((value) => value.replace(/\D/gu, ""))
  .refine(
    (digits) => digits.length === (digits.startsWith("1") ? 11 : 10),
    "Use 10 digits or 11 digits starting with 1"
  )
  .transform((digits) => {
    // Validation above guarantees ten national digits, with an optional US country code.
    const national = digits.length === 11 ? digits.slice(1) : digits
    return `${national.slice(0, 3)}-${national.slice(3, 6)}-${national.slice(6)}`
  })

// Server validation owns accepted values and phone normalization. Only the small
// field-limits module is shared with the browser, so client controls don't import Zod.
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(CONTACT_FIELD_LIMITS.name.min, "Name must be at least 2 characters")
    .max(CONTACT_FIELD_LIMITS.name.max, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: phoneSchema,
  address: z.string().optional(),
  howDidYouHearAboutUs: z.string().optional().default("Google"),
  howDidYouHearAboutUsOther: z.string().optional(),
  message: z
    .string()
    .min(CONTACT_FIELD_LIMITS.message.min, "Message must be at least 10 characters")
    .max(CONTACT_FIELD_LIMITS.message.max, "Message must be less than 2000 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
