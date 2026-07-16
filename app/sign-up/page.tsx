"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useMutation } from "@tanstack/react-query"

export default function SignUp() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { name, email, password, repeatPassword } = Object.fromEntries(
        formData
      ) as {
        name: string
        email: string
        password: string
        repeatPassword: string
      }

      if (password !== repeatPassword) {
        throw new Error("Passwords do not match")
      }

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      return null
    },
    onSuccess: () => {
      setSuccess(true)
    },
  })

  const handleSignup: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await mutateAsync(formData)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-144px)] max-w-6xl items-center px-6 py-10 lg:px-10">
      <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="rounded-4xl bg-slate-900 px-8 py-10 text-white shadow-xl shadow-slate-900/30">
          <h1 className="text-4xl font-semibold tracking-tight">Create your FlowDesk account</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Start managing tasks, collaborating with your team, and launching faster.
          </p>
          <div className="mt-8 space-y-5">
            {[
              "Safe email sign-up with session support",
              "A simple path to your dashboard",
              "A clean interface for managing todos",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-800/70 px-5 py-4">
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          {success ? (
            <div className="space-y-6 text-center">
              <div className="rounded-3xl bg-slate-100 p-8 dark:bg-slate-900">
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">You&apos;re almost ready</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Check your email to confirm your account, then return to login and access your dashboard.
                </p>
              </div>
              <Button onClick={() => router.push("/login")}>Go to login</Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Create account
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Secure sign up with email and password.
                </p>
              </div>
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hello@company.com"
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Choose a password"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="repeat-password">Confirm password</Label>
                    <Input
                      id="repeat-password"
                      name="repeatPassword"
                      type="password"
                      placeholder="Repeat password"
                      required
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Creating account…" : "Create account"}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-slate-950 underline decoration-slate-400 underline-offset-4 dark:text-white">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
