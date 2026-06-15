export const FIRST_TOUCH_COOKIE_NAME = "bt_first_touch"
export const LAST_TOUCH_COOKIE_NAME = "bt_last_touch"
export const TOUCHES_COOKIE_NAME = "bt_touches"
export const TOUCH_COUNT_COOKIE_NAME = "bt_touch_count"
export const ATTRIBUTION_SESSION_COOKIE_NAME = "bt_attr_session"

export const ATTRIBUTION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180 // 180 days
export const ATTRIBUTION_SESSION_MAX_AGE_SECONDS = 60 * 30 // 30 minutes
export const ATTRIBUTION_TOUCH_HISTORY_LIMIT = 24 // Count max 24 per COOKIE_MAX_AGE_SECONDS - 6months

export const PAID_UTM_MEDIA = new Set(["cpc", "ppc", "paid", "paid_search", "paidsearch", "display", "video"])
