"use server"

import { contactFormSchema, type ContactFormData } from "./utils/validation"

import { detectSpamKeywords, SPAM_KEYWORDS } from "./utils/spam-detection"
import { sendSerbyteLead } from "./utils/serbyte-leads"
import { sendEmail, transporter } from "./email-transporter"
import { SITE_NAP, SITE_SLUGS } from "@/config/site-config"

class TurnstileVerificationError extends Error {
  constructor(
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = "TurnstileVerificationError"
  }
}

async function verifyTurnstileToken(token: string) {
  if (!process.env.TURNSTILE_SECRET) {
    return console.warn("TURNSTILE_SECRET is not set, skipping turnstile verification")
  }
  if (!token) {
    return console.warn("Token is not set, skipping turnstile verification")
  }
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET,
        response: token,
      }),
    }).then((r) => r.json())

    if (!response.success) {
      throw new TurnstileVerificationError("Turnstile verification failed", { response })
    }
  } catch (error) {
    if (error instanceof TurnstileVerificationError) {
      throw error
    }

    throw new TurnstileVerificationError("Turnstile verification threw", { error })
  }
}

interface ContactFormResult {
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

export async function submitContactForm(prevState: ContactFormResult | null, payload: FormData | Record<string, unknown>): Promise<ContactFormResult> {
  // Handle both FormData and plain object (useActionState compatibility)
  const data = payload instanceof FormData ? Object.fromEntries(payload.entries()) : payload

  // Honeypot check - if filled, it's a bot (silently reject)
  if (data.website) {
    return { success: true }
  }

  // Verify Cloudflare Turnstile token
  const token = data["cf-turnstile-response"] as string | null
  if (!token) {
    return { success: false, message: "Captcha missing - Please reload the page and try again." }
  }

  try {
    await verifyTurnstileToken(token)
  } catch (error) {
    console.error("[Turnstile]", error)
    return { success: false, message: "Captcha verification failed. Please try again." }
  }

  // Validation with Zod
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    const errors: ContactFormResult["errors"] = {}
    result.error.issues.forEach((err) => {
      if (err.path[0]) {
        errors[err.path[0] as keyof typeof errors] = err.message
      }
    })
    // Return the submitted data so form can be repopulated
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

  // Check for spam keywords in the message (silent detection)
  const spamScore = detectSpamKeywords(result.data.message, SPAM_KEYWORDS)
  if (spamScore >= 2) {
    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `${SITE_NAP.name} - Spam Detected`,
      text: `Spam detected: ${spamScore} from ${result.data.name} <${result.data.email}> with message: ${result.data.message}`,
    })
    // Return success to prevent spammer from knowing they were blocked
    return { success: true }
  }

  try {
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
    void sendSerbyteLead({
      apiKey: process.env.SERBYTE_API_KEY!, // keep this server-side
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
          ...(result.data.howDidYouHearAboutUsOther && { referrerOther: result.data.howDidYouHearAboutUsOther?.toLowerCase() }),
        },
      },

      // optional enrichment (example)
      // enrich: {
      //   data: {
      //     address: result.data.address,
      //     message: result.data.message,
      //   },
      //   outputSchema: {
      //     details: {
      //       address: {
      //         street: "string",
      //         city: "string",
      //         state: "string",
      //         zipCode: "string",
      //       },
      //       service: "string",
      //     },
      //   },
      //   instructions: `
      //   # Split address into components where possible, and enrich, all the addresses are in WA state.\n
      //   # Based on the message, determine the service requested and return the service in the output schema,
      //   concrete patio, concrete sidewalk, concrete driveway, etc.".\n
      //   ## The service should be 2-3 words max.
      //   ## If the service is not clear, return ""
      //   `,
      // },
      // do NOT block the user on central API failure
      throwOnError: false,
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
