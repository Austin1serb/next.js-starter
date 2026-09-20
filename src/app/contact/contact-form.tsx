"use client"

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { useActionState, useRef, useState } from "react"
import { type ContactFormResult, submitContactForm } from "./action"

const emptyFields = { name: "", email: "", phone: "", message: "" }
const inputFields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
] as const
const inputClassName =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-body-sm text-surface-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const turnstile = useRef<TurnstileInstance | null>(null)
  const [token, setToken] = useState("")
  const [verificationError, setVerificationError] = useState(false)
  const [fields, setFields] = useState(emptyFields)
  const [state, formAction, pending] = useActionState<ContactFormResult | null, FormData>(
    async (previousState, formData) => {
      try {
        const result = await submitContactForm(previousState, formData)
        if (result.success) {
          setFields(emptyFields)
        }
        return result
      } catch {
        return { success: false, message: "Unable to send your message. Please try again." }
      } finally {
        setToken("")
        turnstile.current?.reset()
      }
    },
    null
  )

  function handleVerificationError() {
    setToken("")
    setVerificationError(true)
  }

  return (
    <form action={formAction} aria-label="Contact form" className="mt-8 max-w-xl">
      <fieldset disabled={pending} className="space-y-5 disabled:opacity-60">
        {inputFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label htmlFor={`contact-${field.name}`} className="block font-medium text-body-sm">
              {field.label}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              value={fields[field.name]}
              onChange={(event) =>
                setFields({ ...fields, [field.name]: event.currentTarget.value })
              }
              aria-invalid={Boolean(state?.errors?.[field.name])}
              aria-describedby={state?.errors?.[field.name] ? `${field.name}-error` : undefined}
              className={inputClassName}
            />
            {state?.errors?.[field.name] && (
              <p id={`${field.name}-error`} className="text-body-sm text-danger">
                {state.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div className="space-y-2">
          <label htmlFor="contact-message" className="block font-medium text-body-sm">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={2000}
            value={fields.message}
            onChange={(event) => setFields({ ...fields, message: event.currentTarget.value })}
            aria-invalid={Boolean(state?.errors?.message)}
            aria-describedby={state?.errors?.message ? "message-error" : undefined}
            className={inputClassName}
          />
          {state?.errors?.message && (
            <p id="message-error" className="text-body-sm text-danger">
              {state.errors.message}
            </p>
          )}
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" autoComplete="off" tabIndex={-1} />
        </div>

        {turnstileSiteKey && (
          <Turnstile
            ref={turnstile}
            siteKey={turnstileSiteKey}
            options={{ theme: "dark", action: "contact", size: "flexible" }}
            onSuccess={(value) => {
              setToken(value)
              setVerificationError(false)
            }}
            onExpire={() => setToken("")}
            onError={handleVerificationError}
            onTimeout={handleVerificationError}
            onUnsupported={handleVerificationError}
          />
        )}

        {verificationError && (
          <p role="alert" className="text-body-sm text-danger">
            Verification could not complete. Please refresh the page and try again.
          </p>
        )}
        {state?.message && (
          <p role="alert" className="text-body-sm text-danger">
            {state.message}
          </p>
        )}
        {state?.success && (
          <p role="status" className="text-body-sm text-success">
            Thanks! Your message has been sent.
          </p>
        )}

        <button
          type="submit"
          disabled={pending || Boolean(turnstileSiteKey && !token)}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-body-sm text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </fieldset>
    </form>
  )
}
