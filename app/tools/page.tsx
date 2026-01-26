import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ToolsContent } from "@/components/tools-content"

export default async function ToolsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/")
  }

  // Check if user is whitelisted
  const { data: whitelist } = await supabase
    .from("team_whitelist")
    .select("email, role")
    .eq("email", user.email?.toLowerCase())
    .single()

  if (!whitelist) {
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <ToolsContent 
      user={user} 
      role={whitelist.role} 
    />
  )
}
