import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tips = [
  {
    content: "Networking isn't about just connecting people. It's about connecting people with people, people with ideas, and people with opportunities.",
    author: "Michele Jennae"
  },
  {
    content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    author: "Steve Jobs"
  },
  {
    content: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs"
  }
]

export function DailyTips() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          "{randomTip.content}"
        </p>
        <p className="text-xs text-gray-500 mt-2">- {randomTip.author}</p>
      </CardContent>
    </Card>
  )
}

