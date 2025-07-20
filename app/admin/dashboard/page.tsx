"use client"

import { AdminAuth } from "@/components/admin/AdminAuth"
import { AdminDashboard } from "@/components/admin/AdminDashboard"

export default function AdminDashboardPage() {
  return (
    <AdminAuth>
      <AdminDashboard />
    </AdminAuth>
  )
}
