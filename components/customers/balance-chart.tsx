"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Sample data for the chart
const generateData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  return Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth - 11 + i) % 12
    const month = months[monthIndex >= 0 ? monthIndex : monthIndex + 12]

    // Generate a somewhat realistic balance trend with some randomness
    const baseValue = 30000 + i * 5000
    const randomFactor = Math.random() * 10000 - 5000
    const value = Math.max(10000, baseValue + randomFactor)

    return {
      name: month,
      value: Math.round(value),
      // Add more data points if needed
      transactions: Math.round(Math.random() * 100 + 50),
    }
  })
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-3 border shadow-md bg-background">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-primary font-semibold">{formatCurrency(payload[0].value)}</p>
        <p className="text-xs text-muted-foreground">{payload[0].payload.transactions} transactions</p>
      </Card>
    )
  }

  return null
}

export function BalanceChart() {
  const [data, setData] = useState(generateData())
  const [activePoint, setActivePoint] = useState<number | null>(null)

  // Regenerate data when component mounts
  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        onMouseMove={(e) => {
          if (e.activeTooltipIndex !== undefined) {
            setActivePoint(e.activeTooltipIndex)
          }
        }}
        onMouseLeave={() => setActivePoint(null)}
      >
        <defs>
          <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb40" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          tickFormatter={(value) => `$${value / 1000}k`}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorGreen)"
          activeDot={{
            r: 6,
            stroke: "#22c55e",
            strokeWidth: 2,
            fill: "white",
          }}
          dot={(props: any) => {
            const { cx, cy, index } = props
            // Only show dots for specific points or the active point
            const isSpecialPoint = index === 0 || index === data.length - 1 || index % 3 === 0
            const isActive = index === activePoint

            if (isSpecialPoint || isActive) {
              return <circle cx={cx} cy={cy} r={isActive ? 5 : 4} stroke="#22c55e" strokeWidth={2} fill="white" />
            }
            return null
          }}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
