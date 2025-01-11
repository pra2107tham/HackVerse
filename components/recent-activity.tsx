import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  { action: "Completed course", item: "Advanced JavaScript", date: "2 days ago" },
  { action: "Submitted application", item: "Software Engineer at Tech Co", date: "1 week ago" },
  { action: "Updated resume", item: "", date: "2 weeks ago" },
  { action: "Joined community", item: "Web Development Group", date: "3 weeks ago" },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{activity.action}</span>
              {activity.item && <span>: {activity.item}</span>}
              <span className="block text-xs text-gray-500">{activity.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

