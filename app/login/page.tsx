'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'react-hot-toast'
import google from '@/public/google.png'
import img from '@/public/career.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const router = useRouter() //Removed useRouter import

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Logged in successfully')
      window.location.href = '/dashboard'
    }
  }

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={img} alt="Career Guidance Logo" width={32} height={32} />
          <span className="font-bold text-xl">CareerGuide</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Log in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline" onClick={handleGoogleLogin}>
              <Image src={google} alt="Google Logo" width={20} height={20} className="mr-2" />
              Log in with Google
            </Button>
            <div className="flex items-center">
              <Separator className="flex-grow" />
              <span className="mx-2 text-sm text-gray-500">or</span>
              <Separator className="flex-grow" />
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
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
              <Button type="submit" className="w-full">Log In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="h-16 border-t border-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-600">© 2023 CareerGuide. All rights reserved.</p>
      </footer>
    </div>
  )
}

