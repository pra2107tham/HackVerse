'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import google from '@/public/google.png'
import img from '@/public/career.png'

export default function SignUpPage() {
  const { data: session } = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (session) {
      toast('Already logged in')
      router.push('/dashboard')
    }
  }, [session, router])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success('Account created successfully')
        router.push('/dashboard')
      } else {
        toast.error(data.message || 'Sign up failed')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <header className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={img} alt="Career Guidance Logo" width={32} height={32} />
          <span className="font-bold text-xl">CareerGuide</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Your Career, Your Way</CardTitle>
            <CardDescription className="text-center">Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline" onClick={handleGoogleSignUp}>
              <Image src={google} alt="Google Logo" width={20} height={20} className="mr-2" />
              Sign up with Google
            </Button>
            <div className="flex items-center space-x-2">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">or</span>
              <Separator className="flex-1" />
            </div>
            <form onSubmit={handleSignUp} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center space-x-2 text-sm text-gray-600">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </CardFooter>
        </Card>
      </main>

      <footer className="h-16 border-t border-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-600">© 2023 CareerGuide. All rights reserved.</p>
      </footer>
    </div>
  )
}

