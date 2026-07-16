import { useTranslations } from "next-intl"

export default function SiteFooter() {
  const t = useTranslations("Common")

  return (
    <footer className="border-t border-slate-200/70 bg-slate-50 px-6 py-8 text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-950/80 dark:text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>{t("footerDescription")}</p>
        <p className="text-xs">{t("copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  )
}
