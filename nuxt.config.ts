// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '~/src/module' // Path to the custom module
  ],
  gemini: {
    apiKey: process.env.GOOGLE_API_KEY,
    apiVersion: process.env.GOOGLE_API_VERSION,
  }
})
