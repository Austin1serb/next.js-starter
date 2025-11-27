import { readFileSync } from "fs"
import { join } from "path"
import nodemailer from "nodemailer"
import { SITE_NAP } from "@/config/site-config"

// Cache templates at module load time
const templateDir = join(process.cwd(), "src/app/contact/utils")
const htmlTemplate = readFileSync(join(templateDir, "email.html"), "utf-8")
const textTemplate = readFileSync(join(templateDir, "email.txt"), "utf-8")

// Cache transporter at module load time
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
})

interface EmailData {
  name: string
  email: string
  phone: string
  address: string
  howDidYouHearAboutUs: string
  howDidYouHearAboutUsOther: string
  message: string
}

function fillTemplate(template: string, vars: Record<string, string>) {
  return Object.entries(vars).reduce((t, [key, val]) => t.replaceAll(`{{${key}}}`, val), template)
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    const vars = {
      ...data,
      howDidYouHearAboutUsOther: data.howDidYouHearAboutUsOther ? ` - ${data.howDidYouHearAboutUsOther}` : "",
      timestamp,
      siteName: SITE_NAP.name,
    }

    const html = fillTemplate(htmlTemplate, { ...vars, message: data.message.replace(/\n/g, "<br>") })
    const text = fillTemplate(textTemplate, vars)

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NODE_ENV === "production" ? SITE_NAP.email : process.env.SMTP_USER,
      replyTo: data.email,
      subject: `${SITE_NAP.name} - Website Inquiry from ${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}`,
      html,
      text,
    })
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}
