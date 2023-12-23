export type AppConfigScheme = {
  readonly APP_CONTACT_EMAIL: string
  readonly APP_BASE_URL: string
}

export default {
  APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  APP_CONTACT_EMAIL: import.meta.env.VITE_APP_CONTACT_EMAIL,
} satisfies AppConfigScheme;
