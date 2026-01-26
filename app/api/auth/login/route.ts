import { NextResponse } from "next/server"

// Team credentials - Add more users here
// Format: { username: "password" }
const TEAM_CREDENTIALS: Record<string, string> = {
  "mike156x": "156186Xx",
  // Add more team members below:
  // "username2": "password2",
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Check if credentials match
    if (TEAM_CREDENTIALS[username] && TEAM_CREDENTIALS[username] === password) {
      return NextResponse.json({ success: true, username })
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}
