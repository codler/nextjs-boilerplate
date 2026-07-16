"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/authClient"
import { useMutation } from "@tanstack/react-query"

export default function Login() {
  const router = useRouter()
  const t = useTranslations("LoginPage")
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { email, password } = Object.fromEntries(formData) as {
        email: string
        password: string
      }

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      })

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      router.push("/dashboard")
    },
  })

  const handleLogin: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await mutateAsync(formData)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-144px)] max-w-6xl items-center px-6 py-10 lg:px-10">
      <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <div className="rounded-4xl bg-slate-100 p-8 shadow-md shadow-slate-200/60 dark:bg-slate-900 dark:shadow-black/20">
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              {t("welcomeBadge")}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {t("pageTitle")}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {t("pageSubtitle")}
            </p>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  {t("secureAccessTitle")}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {t("secureAccessDescription")}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.20em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                Fast login
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error.message}</p>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? t("signingIn") : t("signIn")}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              {t("noAccount")}{' '}
              <Link href="/sign-up" className="font-medium text-slate-950 underline decoration-slate-400 underline-offset-4 dark:text-white">
                {t("createOne")}
              </Link>
            </p>
          </div>
        </div>

        <div className="rounded-4xl bg-slate-900 px-8 py-10 text-white shadow-xl shadow-slate-900/30">
          <h2 className="text-2xl font-semibold">{t("whyTitle")}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {t("whyDescription")}
          </p>
          <div className="mt-8 space-y-5">
            {[
              t("benefitAuth"),
              t("benefitTodo"),
              t("benefitLaunch"),
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-800/70 p-5">
                <p className="text-sm leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
