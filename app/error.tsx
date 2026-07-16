"use client"

import { useEffect } from "react"

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900 dark:bg-slate-950 dark:text-slate-200">
      <div className="max-w-xl rounded-3xl border border-red-200 bg-white p-10 shadow-lg shadow-red-100 dark:border-red-900/40 dark:bg-slate-900">
        <h1 className="mb-4 text-3xl font-semibold text-slate-950 dark:text-white">Something went wrong</h1>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          We couldn&apos;t load the page. Please refresh or try again later.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-slate-100 p-4 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {error.message}
        </pre>
      </div>
    </div>
  )
}
