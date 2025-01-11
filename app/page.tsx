import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronRight, MessageCircle, FileText, Brain, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image src="/logo.svg" alt="Career Guidance Logo" width={32} height={32} />
              <span className="hidden font-bold sm:inline-block">CareerGuide</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/">Home</Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/features" className="relative group">
                      Features
                      <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-300">
                        4
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Explore our 4 amazing features</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Link href="/blog">Blog</Link>
              <Link href="/community">Community</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="ghost" className="text-black">
              Log in
            </Button>
            <Link href="/signup">
              <Button className="bg-black text-white hover:bg-gray-800">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Shape Your Future with Personalized Career Insights
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Explore tailored career paths, get resume advice, ace your interviews, and connect with experts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/hero-image.jpg"
                  alt="Career growth illustration"
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
            <div className="grid gap-6 lg:grid-cols-4">
              <FeatureCard
                icon={<Brain className="h-10 w-10 mb-4 text-black" />}
                title="Dynamic Career Guidance"
                description="AI-driven onboarding to personalize your experience."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 mb-4 text-black" />}
                title="Resume Analysis & Suggestions"
                description="Optimize your resume for ATS and job-specific roles."
              />
              <FeatureCard
                icon={<MessageCircle className="h-10 w-10 mb-4 text-black" />}
                title="Interview Preparation"
                description="Custom questions and insights based on your target job."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 mb-4 text-black" />}
                title="Community Blogs & Resources"
                description="Connect, learn, and grow with peers and mentors."
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-4">
              <StepCard number={1} title="Sign Up" />
              <StepCard number={2} title="Answer a Few Questions" />
              <StepCard number={3} title="Receive Insights" />
              <StepCard number={4} title="Achieve Goals" />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <TestimonialCard
                quote="This platform completely transformed my job search. The personalized advice was invaluable!"
                author="Emily Chen, Software Engineer"
              />
              <TestimonialCard
                quote="The interview preparation feature helped me land my dream job. Highly recommended!"
                author="Michael Johnson, Marketing Specialist"
              />
              <TestimonialCard
                quote="As a recent graduate, the career guidance I received here was exactly what I needed to kickstart my career."
                author="Sarah Thompson, Data Analyst"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Latest from Our Blog</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <BlogCard
                title="10 Tips for Acing Your Next Job Interview"
                excerpt="Prepare like a pro with these expert interview strategies..."
                author="Career Coach Team"
                date="May 15, 2023"
              />
              <BlogCard
                title="The Future of Work: Skills You Need in 2024"
                excerpt="Stay ahead of the curve by developing these in-demand skills..."
                author="Industry Analyst"
                date="June 2, 2023"
              />
              <BlogCard
                title="How to Write a Resume That Stands Out"
                excerpt="Learn the secrets to crafting a resume that gets you noticed..."
                author="HR Professional"
                date="June 10, 2023"
              />
            </div>
            <div className="mt-10 text-center">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                View More Articles
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
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
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm underline underline-offset-4 text-gray-600 hover:text-black">Terms of Service</Link>
            <Link href="/privacy" className="text-sm underline underline-offset-4 text-gray-600 hover:text-black">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group">
      <div className="mb-4 p-3 bg-gray-100 rounded-full transition-all duration-300 group-hover:bg-gray-200">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="mb-4">
        <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-lg mb-4 text-gray-600">{quote}</p>
      <p className="font-semibold text-gray-900">{author}</p>
    </div>
  )
}

function BlogCard({ title, excerpt, author, date }: { title: string; excerpt: string; author: string; date: string }) {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>{author}</span>
        <span>•</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

