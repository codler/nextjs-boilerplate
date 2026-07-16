export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-950 dark:border-slate-700 dark:border-t-white" />
        <p className="text-base font-medium">Loading…</p>
      </div>
    </div>
  )
}
