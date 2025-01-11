import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const metrics = [
  { name: "Profile Completion", value: 85, color: "bg-blue-500" },
  { name: "Skill Points Earned", value: 750, max: 1000, color: "bg-green-500" },
  { name: "Interview Readiness", value: 70, color: "bg-yellow-500" },
  { name: "Community Engagement", value: 60, color: "bg-purple-500" },
  { name: "Career Milestones", value: 3, max: 5, color: "bg-pink-500" },
  { name: "Roadmap Progress", value: 40, color: "bg-indigo-500" },
]

export function MetricsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.max ? `${metric.value}/${metric.max}` : `${metric.value}%`}
            </div>
            <Progress
              value={metric.max ? (metric.value / metric.max) * 100 : metric.value}
              className="h-2 mt-2"
            //   indicatorClassName={metric.color}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

