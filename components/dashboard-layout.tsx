import { Navigation } from './navigation'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

