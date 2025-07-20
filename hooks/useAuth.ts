"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (simple localStorage check)
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn === "true") {
      setUser({ email: "admin" })
    }
    setIsLoading(false)
  }, [])

  const login = {
    mutateAsync: async ({ password }: { password: string }) => {
      if (password === "admin123") {
        localStorage.setItem("admin_logged_in", "true")
        setUser({ email: "admin" })
        router.push("/admin/dashboard")
        return { user: { email: "admin" } }
      } else {
        throw new Error("Invalid password")
      }
    },
    isPending: false,
    error: null,
  }

  const logout = {
    mutate: () => {
      localStorage.removeItem("admin_logged_in")
      setUser(null)
      router.push("/")
    },
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  }
}
