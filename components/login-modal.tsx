"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
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
      <DialogContent className="max-w-[440px] w-[calc(100vw-2rem)] bg-[#18181b] border-[#27272a] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">Team Login</DialogTitle>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">Team Portal</h2>
            <p className="text-zinc-500 text-sm">Restricted to team members</p>
          </div>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-[#27272a] border border-[#3f3f46] text-white placeholder-zinc-500 h-12 rounded-xl pl-12 pr-4 text-[15px] focus:outline-none focus:border-zinc-500 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#27272a] border border-[#3f3f46] text-white placeholder-zinc-500 h-12 rounded-xl pl-12 pr-4 text-[15px] focus:outline-none focus:border-zinc-500 transition-colors"
                required
              />
            </div>

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
