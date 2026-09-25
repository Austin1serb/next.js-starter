import { expect, test } from "@playwright/test"
import { contactFormSchema } from "@/app/contact/utils/validation"

const enquiry = {
  name: "Ada Example",
  email: "ada@example.test",
  phone: "202-555-0137",
  message: "Please contact me about a project.",
}

test("accepted phone formats normalize to the same national number", () => {
  for (const phone of ["2025550137", "(202) 555-0137", "+1 (202) 555-0137", "12025550137"]) {
    expect(contactFormSchema.parse({ ...enquiry, phone }).phone).toBe("202-555-0137")
  }
})

test("invalid phone numbers are rejected before email delivery", () => {
  for (const phone of [
    "",
    "123",
    "1234567890",
    "22025550137",
    "202555013700",
    "call me",
    2025550137,
  ]) {
    const result = contactFormSchema.safeParse({ ...enquiry, phone })
    expect(result.success, String(phone)).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === "phone")).toBe(true)
    }
  }
})

test("name and message limits accept their boundaries and reject values outside them", () => {
  for (const name of ["Ab", "A".repeat(100)]) {
    expect(contactFormSchema.safeParse({ ...enquiry, name }).success).toBe(true)
  }
  for (const name of ["A", "A".repeat(101)]) {
    expect(contactFormSchema.safeParse({ ...enquiry, name }).success).toBe(false)
  }
  for (const length of [10, 2000]) {
    expect(contactFormSchema.safeParse({ ...enquiry, message: "a".repeat(length) }).success).toBe(
      true
    )
  }
  for (const length of [9, 2001]) {
    expect(contactFormSchema.safeParse({ ...enquiry, message: "a".repeat(length) }).success).toBe(
      false
    )
  }
})

test("optional enquiry details get the existing referral default", () => {
  expect(contactFormSchema.parse(enquiry)).toEqual({ ...enquiry, howDidYouHearAboutUs: "Google" })
  expect(contactFormSchema.safeParse({ ...enquiry, email: "invalid" }).success).toBe(false)
  expect(contactFormSchema.safeParse({ ...enquiry, message: null }).success).toBe(false)
})
