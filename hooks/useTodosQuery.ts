import { useSuspenseQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { getHttpErrorMessage } from "@/lib/error"

export const todosQueryKey = () => ["todos"]

export function useTodosQuery() {
  const query = useSuspenseQuery({
    queryKey: todosQueryKey(),
    queryFn: async () => {
      const { data, error } = await api.todos.get()
      if (error) {
        return { error: error?.value.error.message || "Unknown error" }
      }
      return { data: data ?? [] }
    },
  })

  return {
    ...query,
    data: query.data.data,
    error: query.data.error ?? getHttpErrorMessage(query.error),
  }
}
