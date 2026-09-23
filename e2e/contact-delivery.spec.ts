import { mock } from "node:test"
import { expect, test } from "@playwright/test"
import { sendEmail, transporter } from "@/app/contact/email-transporter"

test.afterEach(() => mock.restoreAll())

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
