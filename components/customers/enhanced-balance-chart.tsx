"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts"

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

    // Add transaction count and growth data
    const transactions = Math.round(Math.random() * 100 + 50)
    const growth = i > 0 ? ((value - (baseValue - 5000)) / (baseValue - 5000)) * 100 : 0

    return {
      name: month,
      value: Math.round(value),
      transactions,
      growth: Math.round(growth * 10) / 10,
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
    const data = payload[0].payload
    return (
      <Card className="p-3 border shadow-md bg-background max-w-[200px]">
        <p className="text-sm font-medium mb-1">{label}</p>
        <p className="text-sm text-primary font-semibold">{formatCurrency(data.value)}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{data.transactions} transactions</span>
          <span
            className={`text-xs font-medium ${data.growth >= 0 ? "text-green-500" : "text-red-500"}`}
          >{`${data.growth >= 0 ? "+" : ""}${data.growth}%`}</span>
        </div>
      </Card>
    )
  }

  return null
}

export function EnhancedBalanceChart() {
  const [data, setData] = useState(generateData())
  const [activePoint, setActivePoint] = useState<number | null>(null)

  // Regenerate data when component mounts
  useEffect(() => {
    setData(generateData())
  }, [])

  // Calculate average value for reference line
  const averageValue = data.reduce((sum, item) => sum + item.value, 0) / data.length

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={250}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        onMouseMove={(e) => {
          if (e.activeTooltipIndex !== undefined) {
            setActivePoint(e.activeTooltipIndex)
          }
        }}
        onTouchStart={(e) => {
          if (e.activeTooltipIndex !== undefined) {
            setActivePoint(e.activeTooltipIndex)
          }
        }}
        onMouseLeave={() => setActivePoint(null)}
        onTouchEnd={() => setActivePoint(null)}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
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
          tickFormatter={(value) => {
            // On small screens, simplify the labels
            const isMobile = window.innerWidth < 640
            return isMobile ? `$${value / 1000}k` : `$${value / 1000}k`
          }}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <ReferenceLine
          y={averageValue}
          stroke="#94a3b8"
          strokeDasharray="3 3"
          label={{
            value: "Average",
            position: "right",
            fill: "var(--muted-foreground)",
            fontSize: 12,
            // Hide the label on very small screens
            className: "hidden sm:block",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorGradient)"
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
      </AreaChart>
    </ResponsiveContainer>
  )
}
