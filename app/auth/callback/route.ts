import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const userEmail = data.user.email?.toLowerCase()

      // Check if the user's email is whitelisted
      const { data: whitelist, error: whitelistError } = await supabase
        .from("team_whitelist")
        .select("email, role")
        .eq("email", userEmail)
        .single()

      if (whitelistError || !whitelist) {
        // User is not whitelisted - sign them out and redirect to error
        await supabase.auth.signOut()
        return NextResponse.redirect(
          `${origin}/auth/error?message=Your email is not whitelisted. Contact the team owner for access.`
        )
      }

      // User is whitelisted, redirect to tools
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error?message=Authentication failed. Please try again.`)
}
