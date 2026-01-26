import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AddonGeneratorContent } from "@/components/addon-generator-content"

export default async function AddonGeneratorPage() {
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

  return <AddonGeneratorContent />
}
