import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  output: "standalone",
}

const withNextIntl = createNextIntlPlugin("./server-config/i18n-request.ts")
export default withNextIntl(nextConfig)
