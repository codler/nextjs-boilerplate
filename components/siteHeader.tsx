import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { RoutePath } from "@/constants/route"

export default function SiteHeader() {
  const t = useTranslations("Common")

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href={RoutePath.HOME}
          className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white"
        >
          {t("siteName")}
        </Link>

        <div className="flex items-center gap-3">
          <Link href={RoutePath.LOGIN}>
            <Button variant="ghost" size="sm">
              {t("login")}
            </Button>
          </Link>
          <Link href={RoutePath.SIGN_UP}>
            <Button size="sm">{t("signUp")}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
