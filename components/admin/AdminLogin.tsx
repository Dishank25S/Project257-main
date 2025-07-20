"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Eye, EyeOff, Shield, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useContactInfo } from "@/hooks/useContactInfo"
import Link from "next/link"

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
})

type LoginForm = z.infer<typeof loginSchema>

export function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const { data: contactInfo } = useContactInfo()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("")
      await login.mutateAsync({ password: data.password })
    } catch (error) {
      setError("Invalid password. Please try again.")
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative">
      {/* Minimal geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-200/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gray-300/30 rounded-full"></div>
        <div className="absolute top-2/3 left-1/2 w-16 h-16 bg-gray-400/20 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left space-y-8"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {contactInfo?.photographer_name || "Sharp Cinematic"}
                </h1>
                <p className="text-gray-600 font-medium">Admin Dashboard</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                Welcome back to your
                <span className="block text-gray-700">Creative Control Center</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Manage your portfolio, upload stunning photos, organize your work, 
                and keep your audience engaged with fresh content.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                Real-time Updates
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                Mobile Responsive
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                Secure Dashboard
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                Easy Management
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200 overflow-hidden">
            <CardContent className="p-8 lg:p-10">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Secure Login
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Access Dashboard</h3>
                  <p className="text-gray-600">Enter your admin password to continue</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="form-group">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Admin Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter your admin password"
                        className="pr-12 h-12 text-base focus-ring border-gray-300"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                    )}
                    {error && (
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-gray-900 hover:bg-gray-800 text-white group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign in to Dashboard
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Default password: <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">admin123</code>
                    <br />
                    You can change this in your dashboard settings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 lg:hidden text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
