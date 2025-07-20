"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export function AdminSetup() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSetup, setIsSetup] = useState(false)
  const { setPassword: savePassword, hasPassword } = useAuth()

  useEffect(() => {
    setIsSetup(hasPassword())
  }, [hasPassword])

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }
    
    savePassword(password)
    setIsSetup(true)
    alert("Admin password set successfully!")
  }

  if (isSetup) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>
            Set up your admin password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Admin Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm admin password"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Set Admin Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
