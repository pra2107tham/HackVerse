import Image from 'next/image'
import Link from 'next/link'
import { Search, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function BlogPage() {
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
              <Link href="/community">Community</Link>
              <Link href="/profile">Profile</Link>
            </nav>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search for blogs, topics, or keywords" className="pl-8" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Knowledge, Share Insights</h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Read, learn, and contribute to trending career and industry topics.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Trending Blogs</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogCard
                  key={i}
                  title={`Trending Blog ${i}`}
                  summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  author="John Doe"
                  tags={['#CareerTips', '#ResumeBuilding']}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Personalized Recommendations</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <BlogCard
                  key={i}
                  title={`Recommended Blog ${i}`}
                  summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  author="Jane Smith"
                  tags={['#IndustryTrends', '#SkillDevelopment']}
                  recommended
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Blog Categories</h2>
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
              <CarouselContent>
                {['Interview Tips', 'Resume Building', 'Industry Trends', 'Skill Development', 'Career Transitions', 'Job Search Strategies'].map((category) => (
                  <CarouselItem key={category} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Button variant="outline" className="w-full">
                        {category}
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Blog Feed</h2>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <BlogFeedItem
                  key={i}
                  title={`Blog Post ${i}`}
                  summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  author="Alex Johnson"
                  readTime={5}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button size="lg">Load More</Button>
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
    </div>
  )
}

function BlogCard({ title, summary, author, tags, recommended }: { title: string; summary: string; author: string; tags: string[]; recommended?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {recommended && <Badge variant="secondary">Recommended for You</Badge>}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">By {author}</div>
        <div className="flex space-x-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

function BlogFeedItem({ title, summary, author, readTime }: { title: string; summary: string; author: string; readTime: number }) {
  return (
    <div className="flex space-x-4">
      <Image src="/placeholder-blog.jpg" alt={title} width={200} height={150} className="rounded-lg object-cover" />
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{summary}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {author}</span>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}

