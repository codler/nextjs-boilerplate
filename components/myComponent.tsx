"use client"

import { api } from "@/lib/eden"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function MyComponent() {
  const { data: response } = useSuspenseQuery({
    queryKey: ["get"],
    queryFn: () => api.get(),
  })

  return <div>result: {response.data && response.data}</div>
}
