import { readFileSync } from "node:fs"
import { join } from "node:path"
import * as nodemailer from "nodemailer"
import { SITE_NAP } from "@/config/site-config"
import type { ContactFormData } from "./utils/validation"

// Cache templates at module load time
const templateDir = join(process.cwd(), "src/app/contact/utils")
const htmlTemplate = readFileSync(join(templateDir, "email.html"), "utf-8")
const textTemplate = readFileSync(join(templateDir, "email.txt"), "utf-8")

// Cache transporter at module load time
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
})

const TEMPLATE_VARIABLE = /\{\{(\w+)\}\}/gu

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

// Substitute once so submitted placeholders and replacement strings remain literal.
function fillTemplate(template: string, vars: Record<string, string>, format: "html" | "text") {
  return template.replace(TEMPLATE_VARIABLE, (placeholder: string, key: string) => {
    if (!Object.hasOwn(vars, key)) {
      return placeholder
    }
    const value = vars[key]
    if (format === "text") {
      return value
    }
    const escaped = escapeHtml(value)
    return key === "message" ? escaped.replace(/\r?\n/gu, "<br>") : escaped
  })
}

/** Send a validated enquiry, applying display defaults and escaping HTML. Logs and
 * returns false on delivery failure; callers do not need to catch SMTP errors. */
export async function sendEmail(data: ContactFormData): Promise<boolean> {
  try {
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    const vars = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      address: data.address?.trim() || "Not provided",
      howDidYouHearAboutUs: data.howDidYouHearAboutUs?.trim() || "Google",
      message: data.message.trim(),
      howDidYouHearAboutUsOther: data.howDidYouHearAboutUsOther?.trim()
        ? ` - ${data.howDidYouHearAboutUsOther.trim()}`
        : "",
      timestamp,
      siteName: SITE_NAP.name,
    }

    const html = fillTemplate(htmlTemplate, vars, "html")
    const text = fillTemplate(textTemplate, vars, "text")

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NODE_ENV === "production" ? SITE_NAP.email : process.env.SMTP_USER,
      replyTo: vars.email,
      subject: `${SITE_NAP.name} - Website Inquiry from ${vars.name.charAt(0).toUpperCase()}${vars.name.slice(1)}`,
      html,
      text,
    })
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

/** Send a plain-text spam report to the SMTP owner; failures are logged, not thrown. */
export async function sendSpamNotification(
  data: Pick<ContactFormData, "name" | "email" | "message">,
  score: number
): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `${SITE_NAP.name} - Spam Detected`,
      text: `Spam detected: ${score} from ${data.name} <${data.email}> with message: ${data.message}`,
    })
  } catch (error) {
    console.error("Failed to send spam notification:", error)
  }
}
