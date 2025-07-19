import { bodyAttributes } from "./attributes.js" //EG export declare const bodyAttributes: {
//   "data-theme": "dark" | "light";
// };

if (typeof window !== "undefined") {
  const act = {
    toggle: (k: string, [on = "on"]: string[]) => {
      document.body.dataset[k] = document.body.dataset[k] ? "" : on
    },
    cycle: (k: string, vals: string[]) => {
      const current = document.body.dataset[k] ?? vals[0]
      const next = vals[(vals.indexOf(current) + 1) % vals.length]
      document.body.dataset[k] = next
    },
    set: (k: string, [v = ""]: string[]) => {
      document.body.dataset[k] = v
    },
    attr: (k: string, [attr]: string[], el: HTMLElement) => {
      document.body.dataset[k] = el.getAttribute(attr) ?? ""
    },
  }

  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-ui]")
    if (!el) return

    const [, cmd, key, raw] = el.dataset.ui!.match(/^(\w+):([\w-]+)(?:\((.*?)\))?$/) || []
    if (!cmd || !(key in bodyAttributes)) return

    act[cmd as keyof typeof act]?.(
      key.slice(5), // strip "data-"
      raw ? raw.split(",") : [],
      el
    )
  })
}
/* optional helpers for unit tests */
// export const setBodyAttr = (k: keyof typeof bodyAttributes, v: string) => (document.body.dataset[k.slice(5)] = v)
// export const getBodyAttr = (k: keyof typeof bodyAttributes) => document.body.dataset[k.slice(5)]
