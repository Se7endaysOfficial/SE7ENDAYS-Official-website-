import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Simple middleware - just pass through
  // Auth is handled client-side via localStorage
  return NextResponse.next({ request })
}
