"use server"

import { cookies } from "next/headers"
import { after } from "next/server"
import type { ZodError } from "zod"
import { readAttributionState } from "@/attribution/cookies"
import { toSerbyteAttribution } from "@/attribution/core"
import { SITE_NAP, SITE_SLUGS } from "@/config/site-config"
import { sendEmail, transporter } from "./email-transporter"
import { sendSerbyteLead } from "./utils/serbyte-leads"
import { detectSpamKeywords, SPAM_KEYWORDS } from "./utils/spam-detection"
import { verifyTurnstileToken } from "./utils/turnstile"
import { type ContactFormData, contactFormSchema } from "./utils/validation"

export interface ContactFormResult {
  success: boolean
  errors?: Partial<Record<keyof ContactFormData, string>>
  message?: string
  data?: {
    name?: string
    email?: string
    phone?: string
    address?: string
    howDidYouHearAboutUs?: string
    howDidYouHearAboutUsOther?: string
    message?: string
  }
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
    after(async () => {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER,
          subject: `${SITE_NAP.name} - Spam Detected`,
          text: `Spam detected: ${spamScore} from ${result.data.name} <${result.data.email}> with message: ${result.data.message}`,
        })
      } catch (error) {
        console.error("Failed to send spam notification:", error)
      }
    })
    // Return success to prevent spammer from knowing they were blocked
    return { success: true }
  }

  try {
    const attribution = readAttributionState(await cookies())

    // Send email to owner
    const emailSent = await sendEmail({
      name: result.data.name.trim(),
      email: result.data.email.trim(),
      phone: result.data.phone.trim(),
      address: result.data.address?.trim() || "Not provided",
      howDidYouHearAboutUs: result.data.howDidYouHearAboutUs?.trim() || "Google",
      howDidYouHearAboutUsOther: result.data.howDidYouHearAboutUsOther?.trim() || "",
      message: result.data.message.trim(),
    })

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send email. Please try again or call us directly.",
      }
    }
    // after() lets Next.js keep background delivery alive after the form response.
    after(async () => {
      const delivery = await sendSerbyteLead({
        apiKey: process.env.SERBYTE_API_KEY, // keep this server-side
        clientId: SITE_NAP.nameSlug,
        formSlug: "contact",
        path: SITE_SLUGS.contact,
        payload: {
          name: result.data.name.trim(),
          email: result.data.email.trim(),
          phone: result.data.phone.trim(),
          message: result.data.message.trim(),
          details: {
            address: result.data.address,
            referrer: result.data.howDidYouHearAboutUs?.toLowerCase(),
            attribution: toSerbyteAttribution(attribution),
            ...(result.data.howDidYouHearAboutUsOther && {
              referrerOther: result.data.howDidYouHearAboutUsOther?.toLowerCase(),
            }),
          },
        },

        throwOnError: false,
      })
      if (!delivery.success) {
        console.warn("Central lead delivery failed:", delivery.error)
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
