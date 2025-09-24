"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 1398 },
  { month: "Mar", earnings: 9800 },
  { month: "Apr", earnings: 3908 },
  { month: "May", earnings: 4800 },
  { month: "Jun", earnings: 3800 },
  { month: "Jul", earnings: 4300 },
  { month: "Aug", earnings: 8400 },
  { month: "Sep", earnings: 7200 },
  { month: "Oct", earnings: 9600 },
  { month: "Nov", earnings: 8900 },
  { month: "Dec", earnings: 12847 },
]

export function EarningsChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Earnings Overview</CardTitle>
        <p className="text-sm text-muted-foreground">Monthly earnings for the past year</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
