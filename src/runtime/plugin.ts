import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const apiKey = nuxtApp.$config.public.gemini.apiKey
    const apiVersion = nuxtApp.$config.public.gemini.apiVersion

    nuxtApp.provide('googleGenerativeAI', {
        async generateContent(text: string) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${apiVersion}:generateContent?key=${apiKey}`

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: text
                                    }
                                ]
                            }
                        ]
                    })
                })

                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(`Request failed with status ${response.status}: ${errorText}`)
                }

                const data = await response.json()
                return data.candidates[0].content.parts[0].text
            } catch (error: any) {
                throw new Error(`Error: ${error.message}`)
            }
        }
    })
})
