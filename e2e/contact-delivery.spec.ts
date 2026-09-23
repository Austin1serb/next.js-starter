import { mock } from "node:test"
import { expect, test } from "@playwright/test"
import { sendEmail, transporter } from "@/app/contact/email-transporter"
import { sendSerbyteLead } from "@/app/contact/utils/serbyte-leads"

const lead = {
  apiKey: "test-key",
  clientId: "test-site",
  formSlug: "contact",
  path: "/contact",
  payload: { name: "Ada Example", email: "ada@example.test" },
}

test.afterEach(() => mock.restoreAll())

test("a missing lead key returns failure without making a request", async () => {
  const fetchLead = mock.method(globalThis, "fetch")
  expect(await sendSerbyteLead({ ...lead, apiKey: "  ", throwOnError: false })).toMatchObject({
    success: false,
    status: 0,
    error: "SERBYTE_API_KEY is required",
  })
  expect(fetchLead.mock.callCount()).toBe(0)
  await expect(sendSerbyteLead({ ...lead, apiKey: "", throwOnError: true })).rejects.toThrow(
    "SERBYTE_API_KEY is required"
  )
})

test("lead network errors are returned by default and thrown only when requested", async () => {
  mock.method(globalThis, "fetch", () => Promise.reject(new Error("Connection unavailable")))
  expect(await sendSerbyteLead(lead)).toEqual({
    success: false,
    status: 0,
    error: "Connection unavailable",
  })
  await expect(sendSerbyteLead({ ...lead, throwOnError: true })).rejects.toThrow(
    "Connection unavailable"
  )
})

test("lead delivery has a deadline and handles an expired deadline", async () => {
  const timeout = mock.method(AbortSignal, "timeout", () =>
    AbortSignal.abort(new DOMException("Delivery timed out", "TimeoutError"))
  )
  mock.method(globalThis, "fetch", (_input: unknown, init?: RequestInit) =>
    Promise.reject(init?.signal?.reason)
  )
  expect(await sendSerbyteLead(lead)).toMatchObject({ success: false, status: 0 })
  expect(timeout.mock.calls[0].arguments).toEqual([10_000])
})

test("lead HTTP failures preserve their status and diagnostic", async () => {
  mock.method(globalThis, "fetch", () =>
    Promise.resolve(Response.json({ success: false, error: "Unavailable" }, { status: 503 }))
  )
  expect(await sendSerbyteLead(lead)).toMatchObject({
    success: false,
    status: 503,
    error: "Unavailable",
  })
  await expect(sendSerbyteLead({ ...lead, throwOnError: true })).rejects.toThrow("Unavailable")
})

test("malformed and unsuccessful lead responses cannot be reported as success", async () => {
  const fetchLead = mock.method(globalThis, "fetch", () =>
    Promise.resolve(new Response("not JSON"))
  )
  expect(await sendSerbyteLead(lead)).toMatchObject({ success: false, status: 200 })
  for (const response of [{}, { success: false }, { success: "true" }]) {
    fetchLead.mock.mockImplementation(() => Promise.resolve(Response.json(response)))
    expect(await sendSerbyteLead(lead)).toMatchObject({ success: false, status: 200 })
  }
})

test("successful lead delivery sends the expected payload", async () => {
  const fetchLead = mock.method(globalThis, "fetch", () =>
    Promise.resolve(Response.json({ success: true }, { status: 201 }))
  )
  expect(await sendSerbyteLead(lead)).toEqual({ success: true, status: 201 })
  const [, options] = fetchLead.mock.calls[0].arguments
  expect(JSON.parse(String(options?.body))).toEqual({
    clientId: lead.clientId,
    formSlug: lead.formSlug,
    path: lead.path,
    payload: lead.payload,
  })
  expect(options?.signal).toBeInstanceOf(AbortSignal)
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
