import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, HelpCircle, Users, Map } from 'lucide-react'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start">
          <Map className="mr-2 h-4 w-4" />
          Generate New Roadmap
        </Button>
        <Button className="w-full justify-start">
          <FileCheck className="mr-2 h-4 w-4" />
          Check Resume ATS Score
        </Button>
        <Button className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Practice Interview
        </Button>
        <Button className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Post to Community
        </Button>
      </CardContent>
    </Card>
  )
}
