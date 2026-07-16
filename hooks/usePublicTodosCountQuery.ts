"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const publicTodosCountQueryKey = () => ["todos", "public"]

export function usePublicTodosCountQuery() {
  return useSuspenseQuery({
    queryKey: publicTodosCountQueryKey(),
    queryFn: async () => {
      const data = (await api.public.todos.count.get()).data
      return data?.total ?? 0
    },
  })
}
