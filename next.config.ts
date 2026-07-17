import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  output: "standalone",
  typedRoutes: true,
}

const withNextIntl = createNextIntlPlugin("./backend/config/i18n-request.ts")
export default withNextIntl(nextConfig)
