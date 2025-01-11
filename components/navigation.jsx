import Link from 'next/link'
import { Home, FileCheck, HelpCircle, Users, Map, User, Book, Briefcase, Award } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'ATS Resume Checker', icon: FileCheck, href: '/ats-checker' },
  { name: 'Interview Prep', icon: HelpCircle, href: '/interview-prep' },
  { name: 'Community Feed', icon: Users, href: '/community' },
  { name: 'Career Roadmap', icon: Map, href: '/roadmap' },
  { name: 'Learning Resources', icon: Book, href: '/resources' },
  { name: 'Job Board', icon: Briefcase, href: '/jobs' },
  { name: 'Achievements', icon: Award, href: '/achievements' },
  { name: 'Profile', icon: User, href: '/profile' },
]

export function Navigation() {
  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">CareerGuide</h1>
      </div>
      <ul className="space-y-2 py-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

