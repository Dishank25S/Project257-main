"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { localDB } from "@/lib/supabase"
import { auth } from "@/lib/auth"

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
    mutateAsync: ({ password }: { password: string }) => {
      const isValid = localDB.admin.verifyPassword(password)
      if (isValid) {
        localStorage.setItem("admin_logged_in", "true")
        auth.setToken(password) // Set the auth token for API calls
        setUser({ email: "admin" })
        router.push("/admin/dashboard")
        return Promise.resolve({ user: { email: "admin" } })
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
      auth.clearToken() // Clear the auth token
      setUser(null)
      router.push("/")
    },
  }

  const setPassword = (password: string) => {
    // Password management is handled via environment variables
    console.warn('Password setting not available in this version')
  }

  const hasPassword = () => {
    // Always return true as admin password is handled via environment
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
