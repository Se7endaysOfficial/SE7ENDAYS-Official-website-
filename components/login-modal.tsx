"use client"

import React from "react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { Shield, User, Lock } from "lucide-react"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess?: () => void
}

export function LoginModal({ open, onOpenChange, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // Call server-side API to verify credentials
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Store login state
        localStorage.setItem("team_logged_in", "true")
        localStorage.setItem("team_username", data.username)
        setIsLoading(false)
        setUsername("")
        setPassword("")
        onOpenChange(false)
        if (onLoginSuccess) {
          onLoginSuccess()
        }
      } else {
        setError(data.error || "Invalid username or password")
        setIsLoading(false)
      }
    } catch {
      setError("Failed to connect to authentication service")
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[500px] bg-[#18181b] border-[#27272a] p-0 gap-0 rounded-2xl overflow-hidden"
      >
        <DialogTitle className="sr-only">Team Login</DialogTitle>

        {/* Content */}
        <div className="p-10">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">Team Portal</h2>
            <p className="text-zinc-500 text-sm">Restricted to team members</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-[#27272a] border border-[#3f3f46] text-white placeholder-zinc-500 h-12 rounded-xl pl-12 pr-4 focus:outline-none focus:border-zinc-500 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#27272a] border border-[#3f3f46] text-white placeholder-zinc-500 h-12 rounded-xl pl-12 pr-4 focus:outline-none focus:border-zinc-500 transition-colors"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-zinc-100 active:bg-zinc-200 text-zinc-900 font-medium h-12 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
