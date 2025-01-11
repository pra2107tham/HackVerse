'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlusCircle, Filter, ThumbsUp, MessageCircle, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const interests = ['Tech', 'Mechanical', 'Finance', 'Design', 'Healthcare', 'Education', 'Marketing']

export default function CommunityPage() {
  const [showInterestModal, setShowInterestModal] = useState(true)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleInterestSelection = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Career Guidance Logo" width={32} height={32} />
              <span className="font-bold">CareerGuide</span>
            </Link>
            <nav className="flex items-center space-x-4 text-sm font-medium">
              <Link href="/">Home</Link>
              <Link href="/features">Features</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/profile">Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Community</h1>
            <div className="flex justify-between items-center mb-8">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                    <DialogDescription>Share your thoughts, questions, or opportunities with the community.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Title" />
                    <Textarea placeholder="What's on your mind?" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Post</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <CommunityPost
                  key={i}
                  title={`Community Post ${i}`}
                  author="Jane Doe"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  likes={42}
                  comments={15}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Mentor Highlights</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <MentorCard
                  key={i}
                  name={`Mentor ${i}`}
                  role="Senior Software Engineer"
                  company="Tech Corp"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="container flex flex-col items-center justify-between space-y-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image src="/logo.svg" alt="Career Guidance Logo" width={32} height={32} />
            <p className="text-center text-sm leading-loose md:text-left text-gray-600">
              © 2023 CareerGuide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={showInterestModal} onOpenChange={setShowInterestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Your Interests</DialogTitle>
            <DialogDescription>Choose the topics you're most interested in to personalize your community feed.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {interests.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={selectedInterests.includes(interest)}
                  onCheckedChange={() => handleInterestSelection(interest)}
                />
                <label htmlFor={interest}>{interest}</label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowInterestModal(false)}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CommunityPost({ title, author, content, likes, comments }: { title: string; author: string; content: string; likes: number; comments: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-gray-500">Posted by {author}</div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="mr-2 h-4 w-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

function MentorCard({ name, role, company }: { name: string; role: string; company: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="text-sm text-gray-500">{role} at {company}</div>
      </CardHeader>
      <CardContent>
        <p>Experienced mentor ready to guide you in your career journey.</p>
      </CardContent>
      <CardFooter>
        <Button>Request Connection</Button>
      </CardFooter>
    </Card>
  )
}

