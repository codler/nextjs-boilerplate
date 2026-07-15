"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { todos } from "@/lib/eden"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = (await todos.get()).data
      return data ?? []
    },
  })

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login") // redirect to login page
        },
      },
    })
  }

  const handleCreateTodo: React.SubmitEventHandler = async (event) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    await todos.post({ text: formData.get("text") as string })

    await refetch()
  }

  const handleToggleTodo: React.SubmitEventHandler = async (event) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    await todos.toggle({ id: formData.get("id") as string }).patch()

    await refetch()
  }

  const handleDeleteTodo: React.SubmitEventHandler = async (event) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    await todos({ id: formData.get("id") as string }).delete()

    await refetch()
  }

  return (
    <>
      <h1>Welcome {session?.user.name}</h1>

      <form onSubmit={handleCreateTodo} className="mb-8 flex gap-2">
        <input
          type="text"
          name="text"
          className="flex-1 rounded-lg border-gray-300 px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder="Add a new todo..."
        />
        <button
          disabled={!session}
          type="submit"
          name="intent"
          value="create"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {data.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 rounded-lg bg-white p-4 shadow dark:bg-gray-800"
          >
            <form
              onSubmit={handleToggleTodo}
              className="flex flex-1 items-center gap-2"
            >
              <input type="hidden" name="id" value={todo.id} />
              <button
                disabled={session?.user.id !== todo.userId}
                type="submit"
                name="intent"
                value="toggle"
                className="text-gray-500 hover:text-blue-500"
              >
                <span
                  className={todo.completed ? "text-gray-400 line-through" : ""}
                >
                  {todo.text}
                </span>
              </button>
            </form>

            {session?.user.id === todo.userId && (
              <form onSubmit={handleDeleteTodo}>
                <input type="hidden" name="id" value={todo.id} />
                <button
                  type="submit"
                  name="intent"
                  value="delete"
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <Button className="bg-neutral-700" onClick={onLogout}>
        Logout
      </Button>
    </>
  )
}
