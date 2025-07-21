"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { localDB } from "@/lib/supabase"

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
      const isValid = await localDB.admin.verifyPassword(password)
      if (isValid) {
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

  const setPassword = async (password: string) => {
    await localDB.admin.setPassword(password)
  }

  const hasPassword = () => {
    // Since we always have a default password, return true
    return true
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    setPassword,
    hasPassword,
  }
}
