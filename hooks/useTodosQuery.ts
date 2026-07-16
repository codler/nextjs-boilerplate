import { useSuspenseQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const todosQueryKey = () => ["todos"]

export function useTodosQuery() {
  return useSuspenseQuery({
    queryKey: todosQueryKey(),
    queryFn: async () => {
      const data = (await api.todos.get()).data
      return data ?? []
    },
  })
}
