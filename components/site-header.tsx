import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white"
        >
          FlowDesk
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
