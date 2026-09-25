import { mock } from "node:test"
import { expect, test } from "@playwright/test"
import { sendEmail, sendSpamNotification, transporter } from "@/app/contact/email-transporter"

test.afterEach(() => mock.restoreAll())

test("email delivery owns trimming and display defaults for optional fields", async () => {
  const sendMail = mock.method(transporter, "sendMail", () =>
    Promise.resolve({ messageId: "test" })
  )
  expect(
    await sendEmail({
      name: " ada ",
      email: " ada@example.test ",
      phone: "202-555-0137",
      message: " Please contact me. ",
      howDidYouHearAboutUs: " ",
    })
  ).toBe(true)
  const mail = sendMail.mock.calls[0].arguments[0]
  expect(mail?.replyTo).toBe("ada@example.test")
  expect(mail?.subject).toContain("Website Inquiry from Ada")
  expect(String(mail?.text)).toContain("Not provided")
  expect(String(mail?.text)).toContain("Google")
})

test("spam notifications remain plain text and handle SMTP failure internally", async () => {
  const sendMail = mock.method(transporter, "sendMail", () =>
    Promise.resolve({ messageId: "test" })
  )
  const data = { name: "Ada", email: "ada@example.test", message: "<b>Sample message</b>" }
  await sendSpamNotification(data, 2)
  const mail = sendMail.mock.calls[0].arguments[0]
  expect(mail?.html).toBeUndefined()
  expect(mail?.text).toBe(
    "Spam detected: 2 from Ada <ada@example.test> with message: <b>Sample message</b>"
  )
  sendMail.mock.mockImplementation(() => Promise.reject(new Error("SMTP unavailable")))
  const log = mock.method(console, "error", () => {
    // Assert the failure is reported without rejecting the background task.
  })
  await expect(sendSpamNotification(data, 2)).resolves.toBeUndefined()
  expect(log.mock.callCount()).toBe(1)
})

test("email HTML escapes submitted values while plain text stays literal", async () => {
  const sendMail = mock.method(transporter, "sendMail", () =>
    Promise.resolve({ messageId: "test" })
  )
  const name = `Ada <b>Example</b> & " ' $& $$ {{timestamp}}`
  const message = `<img src=x onerror="alert(1)">\r\nKeep {{siteName}} and $& literal.`
  expect(
    await sendEmail({
      name,
      email: "ada@example.test",
      phone: "202-555-0137",
      address: "<b>Example address</b>",
      howDidYouHearAboutUs: "<em>Search</em>",
      howDidYouHearAboutUsOther: "<i>Other</i>",
      message,
    })
  ).toBe(true)

  const mail = sendMail.mock.calls[0].arguments[0]
  const html = String(mail?.html)
  expect(html).toContain(
    "Ada &lt;b&gt;Example&lt;/b&gt; &amp; &quot; &#39; $&amp; $$ {{timestamp}}"
  )
  expect(html).toContain(
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;<br>Keep {{siteName}} and $&amp; literal."
  )
  expect(html).toContain("&lt;b&gt;Example address&lt;/b&gt;")
  expect(html).not.toContain("<b>Example address</b>")
  expect(html).not.toContain("<img src=x")
  expect(String(mail?.text)).toContain(name)
  expect(String(mail?.text)).toContain(message)
})

test("an SMTP failure returns false", async () => {
  mock.method(transporter, "sendMail", () => Promise.reject(new Error("SMTP unavailable")))
  mock.method(console, "error", () => {
    // The expected SMTP failure is asserted through the return value.
  })
  expect(
    await sendEmail({
      name: "Ada",
      email: "ada@example.test",
      phone: "202-555-0137",
      address: "",
      howDidYouHearAboutUs: "",
      howDidYouHearAboutUsOther: "",
      message: "Please contact me.",
    })
  ).toBe(false)
})
