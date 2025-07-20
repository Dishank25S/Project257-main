"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds for more frequent updates
            refetchOnWindowFocus: true, // Refetch when window gains focus
            refetchOnMount: true, // Always refetch on mount
            refetchOnReconnect: true, // Refetch when reconnected
            retry: 2, // Retry failed requests
          },
          mutations: {
            retry: 1, // Retry failed mutations once
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
