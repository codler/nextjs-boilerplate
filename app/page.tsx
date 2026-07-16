"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useSuspenseQuery } from "@tanstack/react-query"
import { todos } from "@/lib/eden"

export default function Page() {
  const t = useTranslations("HomePage")
  const router = useRouter()
  const { data } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = (await todos.public.get()).data
      return data?.total ?? 0
    },
  })
  const totalTasks = data

  return (
    <div className="mx-auto flex min-h-[calc(100vh-144px)] max-w-7xl flex-col gap-16 px-6 py-16 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {t("heroBadge")}
          </div>
          <div className="space-y-6">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              {t("heroTitle")}
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {t("heroSubtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => router.push("/sign-up")}>
              {t("ctaStartFree")}
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              {t("ctaViewDemo")}
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-1 shadow-2xl shadow-slate-900/10 dark:shadow-black/50">
          <div className="rounded-[1.75rem] bg-white p-8 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-100 px-5 py-4 dark:bg-slate-900">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("statusToday")}
                </p>
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                  {t("tasksReadyCount", { count: totalTasks })}
                </p>
              </div>
              <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-white">
                {t("activeLabel")}
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: t("task1Title"),
                  tag: t("task1Tag"),
                  meta: t("task1Meta"),
                },
                {
                  title: t("task2Title"),
                  tag: t("task2Tag"),
                  meta: t("task2Meta"),
                },
                {
                  title: t("task3Title"),
                  tag: t("task3Tag"),
                  meta: t("task3Meta"),
                },
              ].map((task) => (
                <div
                  key={task.title}
                  className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-slate-950 dark:text-white">
                        {task.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {task.meta}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      {task.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: t("featureSecureAuthTitle"),
            description: t("featureSecureAuthDescription"),
          },
          {
            title: t("featureDashboardTitle"),
            description: t("featureDashboardDescription"),
          },
          {
            title: t("featureLaunchTitle"),
            description: t("featureLaunchDescription"),
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
          >
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
