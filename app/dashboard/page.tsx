"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login") // redirect to login page
        },
      },
    })
  }

  return (
    <>
      <h1>Welcome {session?.user.name}</h1>
      <Button className="bg-neutral-700" onClick={onLogout}>
        Logout
      </Button>
    </>
  )
}
