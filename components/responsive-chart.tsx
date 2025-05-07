"use client"

import { useResizeObserver } from "@/hooks/use-resize-observer"
import { AreaChart } from "@/components/charts/area-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface ResponsiveChartProps {
  title: string
  description?: string
}

export function ResponsiveChart({ title, description }: ResponsiveChartProps) {
  const [ref, size] = useResizeObserver<HTMLDivElement>()
  const [chartType, setChartType] = useState<"area" | "bar">("area")

  // Determine if we should show a simplified version based on width
  const isSmallWidth = size.width && size.width < 400

  return (
    <Card className="h-full">
      <CardHeader className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <Tabs value={chartType} onValueChange={(v) => setChartType(v as "area" | "bar")}>
            <TabsList className="h-8">
              <TabsTrigger value="area" className="text-xs px-2">
                Area
              </TabsTrigger>
              <TabsTrigger value="bar" className="text-xs px-2">
                Bar
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="p-4">
        <div ref={ref} className="w-full h-[200px]">
          {chartType === "area" ? (
            <AreaChart color="#22c55e" simplified={isSmallWidth} />
          ) : (
            <BarChart simplified={isSmallWidth} />
          )}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {size.width && size.height ? (
            <p>
              Chart dimensions: {Math.round(size.width)}px × {Math.round(size.height)}px
            </p>
          ) : (
            <p>Measuring chart dimensions...</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
