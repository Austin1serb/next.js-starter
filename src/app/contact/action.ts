"use server"

import { after } from "next/server"
import type { ZodError } from "zod"
import { sendEmail, sendSpamNotification } from "./email-transporter"
import { detectSpamKeywords, SPAM_KEYWORDS } from "./utils/spam-detection"
import { verifyTurnstileToken } from "./utils/turnstile"
import { type ContactFormData, contactFormSchema } from "./utils/validation"

export interface ContactFormResult {
  success: boolean
  errors?: Partial<Record<keyof ContactFormData, string>>
  message?: string
  data?: Partial<Record<keyof ContactFormData, string>>
}

function validationFailure(
  data: Record<string, unknown>,
  error: ZodError<ContactFormData>
): ContactFormResult {
  const errors: Record<string, string> = Object.fromEntries(
    error.issues.flatMap((issue) => {
      const field = issue.path[0]
      return typeof field === "string" ? [[field, issue.message]] : []
    })
  )
  return {
    success: false,
    errors,
    data: {
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      address: String(data.address ?? ""),
      howDidYouHearAboutUs: String(data.howDidYouHearAboutUs ?? ""),
      howDidYouHearAboutUsOther: String(data.howDidYouHearAboutUsOther ?? ""),
      message: String(data.message ?? ""),
    },
  }
}

export async function submitContactForm(
  _prevState: ContactFormResult | null,
  payload: FormData | Record<string, unknown>
): Promise<ContactFormResult> {
  // Handle both FormData and plain object (useActionState compatibility)
  const data: Record<string, unknown> =
    payload instanceof FormData ? Object.fromEntries(payload.entries()) : payload

  // Honeypot check - if filled, it's a bot (silently reject)
  if (data.website) {
    return { success: true }
  }

  if (!(await verifyTurnstileToken(data["cf-turnstile-response"]))) {
    return { success: false, message: "Verification failed. Please try again." }
  }

  // Validation with Zod
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    return validationFailure(data, result.error)
  }

  // Check for spam keywords in the message (silent detection)
  const spamScore = detectSpamKeywords(result.data.message, SPAM_KEYWORDS)
  if (spamScore >= 2) {
    after(() => sendSpamNotification(result.data, spamScore))
    // Return success to prevent spammer from knowing they were blocked
    return { success: true }
  }

  const emailSent = await sendEmail(result.data)
  if (!emailSent) {
    return {
      success: false,
      message: "Failed to send email. Please try again or call us directly.",
    }
  }
  return { success: true }
}
