export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50 px-6 py-8 text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-950/80 dark:text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>FlowDesk — productivity built for fast teams.</p>
        <p className="text-xs">© {new Date().getFullYear()} FlowDesk.</p>
      </div>
    </footer>
  )
}
