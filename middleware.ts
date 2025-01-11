import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ token }) {
      if (token) {
        return true
      }
      return false
    },
  },
})

import { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")
  if (token) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/signup", "/login"],
}

