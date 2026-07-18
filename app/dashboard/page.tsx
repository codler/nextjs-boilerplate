"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/authClient"
import { getHttpErrorMessage } from "@/lib/error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { todosQueryKey, useTodosQuery } from "@/hooks/useTodosQuery"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { RoutePath } from "@/constants/route"
import { DashboardTodoItem } from "@/components/dashboard-todo-item"

export default function DashboardPage() {
  const router = useRouter()
  const t = useTranslations("DashboardPage")
  const { data: session } = authClient.useSession()
  const queryClient = useQueryClient()
  const { data, error } = useTodosQuery()
  const todos = data ?? []

  const createMutation = useMutation({
    mutationFn: async (text: string) => {
      const { error } = await api.todos.post({ text })
      if (error) {
        toast.error(getHttpErrorMessage(error))
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todosQueryKey() }),
  })

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(RoutePath.LOGIN)
        },
      },
    })
  }

  const handleCreateTodo: React.SubmitEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const text = String(formData.get("text") ?? "").trim()
    if (!text) return

    await createMutation.mutateAsync(text)
    form.reset()
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-144px)] max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10">
      <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-sky-600 uppercase dark:text-sky-400">
              {t("dashboardLabel")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
              {t("welcomeBack", {
                name: session?.user.name ?? t("fallbackName"),
              })}
            </h1>
          </div>
          <Button variant="outline" onClick={onLogout} size="sm">
            {t("signOut")}
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("totalTasks")}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
              {error ? "-" : todos.length}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("completed")}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
              {error ? "-" : todos.filter((todo) => todo.completed).length}
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-4xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm dark:border-red-800 dark:bg-red-950/20 dark:text-red-300">
          <p className="font-semibold">{t("errorTitle")}</p>
          <p className="mt-2">{error}</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {t("errorAdvice")}
          </p>
        </div>
      ) : null}

      <section className="grid gap-10 xl:grid-cols-[0.7fr_0.3fr]">
        <div className="space-y-6">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                  {t("newTaskTitle")}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {t("newTaskDescription")}
                </p>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {createMutation.isPending ? t("saving") : t("readyToCreate")}
              </div>
            </div>

            <form
              onSubmit={handleCreateTodo}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                name="text"
                aria-label={t("addTodo")}
                placeholder={t("addTodoPlaceholder")}
                className="min-h-12 flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 transition outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-300/20"
              />
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? t("adding") : t("addTodo")}
              </Button>
            </form>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                  {t("todoListTitle")}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {t("todoListDescription")}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-slate-700 uppercase dark:bg-slate-800 dark:text-slate-200">
                {error ? "—" : t("todoCount", { count: todos.length })}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {error ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-300">
                  <p className="font-semibold">{t("errorTitle")}</p>
                  <p className="mt-2">{error}</p>
                </div>
              ) : todos.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  {t("noTodos")}
                </div>
              ) : (
                todos.map((todo) => (
                  <DashboardTodoItem key={todo.id} todo={todo} />
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
              {t("focusBoardTitle")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("focusBoardDescription")}
            </p>
          </div>
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
              {t("tipsTitle")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>✔ {t("tipOne")}</li>
              <li>✔ {t("tipTwo")}</li>
              <li>✔ {t("tipThree")}</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  )
}
