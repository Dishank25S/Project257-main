"use client"

import { useState } from "react"
import { AdminPasswordModal } from "@/components/AdminPasswordModal"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { useRouter } from "next/navigation"

export function AdminAccess() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const router = useRouter()

  // Keyboard shortcut to open admin panel (Ctrl+Shift+A)
  useKeyboardShortcut(["ctrl", "shift", "a"], () => {
    setIsPasswordModalOpen(true)
  })

  const handleAdminSuccess = () => {
    // Set admin logged in and redirect to admin dashboard
    localStorage.setItem("admin_logged_in", "true")
    router.push("/admin/dashboard")
  }

  return (
    <>
      <AdminPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      {/* Hidden keyboard shortcut hint (only visible in dev) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-xs text-gray-400 p-2 rounded opacity-50">
          Press Ctrl + Shift + A for admin
        </div>
      )}
    </>
  )
}
