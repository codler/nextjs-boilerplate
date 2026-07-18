import { auth } from "@/backend/config/auth"
import { getRequestConfig } from "next-intl/server"
import { headers } from "next/headers"
import en from "../../messages/en.json"
import sv from "../../messages/sv.json"

const messages = {
  en,
  sv,
} as const

const supportedLocales = Object.keys(messages) as Array<keyof typeof messages>

function getPreferredLocale(acceptLanguage?: string) {
  if (!acceptLanguage) {
    return undefined
  }

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [localePart, qPart] = part.trim().split(";")
      const quality = qPart?.split("=")[1]
      return {
        locale: localePart.toLowerCase(),
        quality: quality ? Number.parseFloat(quality) : 1,
      }
    })
    .sort((a, b) => b.quality - a.quality)
    .map(({ locale }) => locale)
    .reduce<keyof typeof messages | undefined>((preferred, locale) => {
      if (preferred) {
        return preferred
      }

      const normalized = locale.replace("_", "-")
      if (supportedLocales.includes(normalized as keyof typeof messages)) {
        return normalized as keyof typeof messages
      }

      const primary = normalized.split("-")[0]
      if (supportedLocales.includes(primary as keyof typeof messages)) {
        return primary as keyof typeof messages
      }

      return undefined
    }, undefined)
}

export default getRequestConfig(
  async ({ locale = "en" as keyof typeof messages }) => {
    const requestHeaders = await headers()
    const acceptLanguage = requestHeaders.get("accept-language") ?? undefined

    let session: Awaited<ReturnType<typeof auth.api.getSession>> | undefined
    try {
      session = await auth.api.getSession({
        headers: requestHeaders,
      })
    } catch (error) {
      console.error("Error fetching session:", error)
    }

    const preferredLocale = getPreferredLocale(acceptLanguage)
    if (preferredLocale) {
      locale = preferredLocale
    } else if (!session) {
      locale = "sv"
    }

    if (!messages[locale as keyof typeof messages]) {
      locale = "en"
    }

    return {
      locale,
      messages: messages[locale as keyof typeof messages],
    }
  }
)
