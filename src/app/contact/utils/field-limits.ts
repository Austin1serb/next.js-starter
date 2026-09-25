// Shared by HTML controls and server validation; safe to import in client components.
export const CONTACT_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  message: { min: 10, max: 2000 },
} as const
