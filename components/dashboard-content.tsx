"use client"

import { MetricsSection } from './metrics-section'
import { GraphSection } from './graph-section'
import { QuickActions } from './quick-actions'
import { DailyTips } from './daily-tips'
import { RecentActivity } from './recent-activity'
import Mermaid from './mermaid'

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
          {/* <GraphSection /> */}
          <Mermaid diagramText={`graph TD
    A[Start: Aspiring to be a Product Manager] --> B[Learn the Basics of Product Management]
    B --> C[Gain Relevant Skills]
    C --> D[Build a Strong Portfolio]
    D --> E[Gain Hands-On Experience]
    E --> F[Understand Industry and Company Needs]
    F --> G[Network with Industry Professionals]
    G --> H[Apply Strategically and Prepare for Interviews]
    H --> I[Dream Job: Product Manager]

    subgraph Step 1: Learn the Basics
        B1[Understand Product Management Lifecycle]
        B2[Study Common PM Frameworks]
        B3[Learn Prioritization Techniques]
        B --> B1
        B --> B2
        B --> B3
    end

    subgraph Step 2: Gain Relevant Skills
        C1[Learn Communication and Leadership Skills]
        C2[Develop Business and Technical Acumen]
        C3[Understand Data Analysis and Metrics]
        C --> C1
        C --> C2
        C --> C3
    end

    subgraph Step 3: Build a Strong Portfolio
        D1[Document Case Studies of Product Ideas]
        D2[Create Wireframes or MVPs]
        D3[Write Product Requirement Documents (PRDs)]
        D --> D1
        D --> D2
        D --> D3
    end

    subgraph Step 4: Gain Hands-On Experience
        E1[Intern in Product-Related Roles]
        E2[Collaborate on Projects in a Cross-Functional Team]
        E3[Contribute to Open Source or Freelance Projects]
        E --> E1
        E --> E2
        E --> E3
    end

    subgraph Step 5: Understand Industry and Company Needs
        F1[Research Trends in the Industry]
        F2[Understand the Company’s Products and Vision]
        F3[Identify Gaps and Propose Solutions]
        F --> F1
        F --> F2
        F --> F3
    end

    subgraph Step 6: Network with Industry Professionals
        G1[Attend Product Management Meetups and Webinars]
        G2[Engage on LinkedIn and Other Professional Platforms]
        G3[Reach Out for Informational Interviews]
        G --> G1
        G --> G2
        G --> G3
    end

    subgraph Step 7: Apply Strategically and Prepare for Interviews
        H1[Target Job Openings that Align with Skills]
        H2[Prepare for PM Case Study and Behavioral Interviews]
        H3[Showcase Portfolio and Experience]
        H --> H1
        H --> H2
        H --> H3
    end

    subgraph Step 8: Achieve Dream Job
        I1[Start as an Associate PM if Necessary]
        I2[Continue Learning and Growing]
        I3[Achieve Senior PM Roles]
        I --> I1
        I --> I2
        I --> I3
    end
` } />
        </div>
        <div className="space-y-6">
          <DailyTips />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}

