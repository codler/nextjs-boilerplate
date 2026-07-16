import { auth } from "@/server-config/auth"
import { getRequestConfig } from "next-intl/server"
import { headers } from "next/headers"
import en from "../messages/en.json"
import sv from "../messages/sv.json"

const messages = {
  en,
  sv,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Readonly<Record<string, any>>

export default getRequestConfig(
  async ({ locale = "en" as keyof typeof messages }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      locale = "sv"
    }

    if (!messages[locale]) {
      locale = "en"
    }

    return {
      locale,
      messages: messages[locale],
    }
  }
)
