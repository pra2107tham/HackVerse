"use client";
import { MetricsSection } from './metrics-section'
import { GraphSection } from './graph-section'
import { QuickActions } from './quick-actions'
import { DailyTips } from './daily-tips'
import { RecentActivity } from './recent-activity'
import FlowRenderer from './FlowRenderer'
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Software Developer",
  company: "Tech Innovations Inc.",
  joinDate: "2023-01-15",
}

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome back, {mockUser.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <MetricsSection />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FlowRenderer />
        </div>
        <div className="space-y-6">
          <DailyTips />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}

