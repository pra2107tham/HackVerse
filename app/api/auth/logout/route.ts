import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Clear the session or authentication token here
    // For example, if using cookies:
    const response = NextResponse.json({ message: 'User logged out successfully' }, { status: 200 })
    response.cookies.set('authToken', '', { maxAge: -1 }) // Clear the auth token cookie

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
