"use client"

import { api } from "@/lib/api"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function MyComponent() {
  const { data } = useSuspenseQuery({
    queryKey: ["api"],
    queryFn: async () => {
      const data = (await api.public.todos.count.get()).data
      return data?.total ?? 0
    },
  })

  return <div>result: {data && data}</div>
}
