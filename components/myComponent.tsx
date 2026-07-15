"use client"

import { api } from "@/lib/eden"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function MyComponent() {
  const { data } = useSuspenseQuery({
    queryKey: ["get"],
    queryFn: async () => {
      const data = (await api.get()).data
      return data?.hello
    },
  })

  return <div>result: {data && data}</div>
}
