import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", skillProgress: 20, interviewSuccess: 10 },
  { name: "Feb", skillProgress: 35, interviewSuccess: 20 },
  { name: "Mar", skillProgress: 50, interviewSuccess: 30 },
  { name: "Apr", skillProgress: 65, interviewSuccess: 40 },
  { name: "May", skillProgress: 80, interviewSuccess: 55 },
  { name: "Jun", skillProgress: 95, interviewSuccess: 70 },
];

export function GraphSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Career Progression</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Line type="monotone" dataKey="skillProgress" stroke="#8884d8" name="Skill Progress" />
              <Line type="monotone" dataKey="interviewSuccess" stroke="#82ca9d" name="Interview Success Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

