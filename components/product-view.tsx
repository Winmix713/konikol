"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart } from "@/components/charts/bar-chart"

export function ProductView() {
  const [timeframe, setTimeframe] = useState("Last 7 days")

  return (
    <Card className="mb-6">
      <div className="flex items-center h-12 px-5 border-b">
        <div className="mr-auto text-xl font-semibold">Product view</div>
        <Button variant="outline" className="flex items-center gap-1 h-12 px-4 rounded-3xl">
          {timeframe}
          <ChevronDown className="h-5 w-5 ml-2" />
        </Button>
      </div>

      <div className="pt-6 px-5 pb-5">
        <div className="flex items-end">
          <div className="shrink-0 w-52 mr-18">
            <div className="flex mb-4">
              <div className="text-2xl text-muted-foreground">$</div>
              <div className="text-4xl font-bold">10.2m</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 px-1.5 rounded-lg bg-green-500/10 text-green-500 h-7 text-sm font-medium">
                <svg className="h-4 w-4 fill-green-500 rotate-180" viewBox="0 0 24 24">
                  <path d="M12 5.5a1.1 1.1 0 0 1 1.098 1.102v9.327c.068-.051.133-.108.195-.17l1.833-1.84c.429-.43 1.124-.43 1.552 0s.429 1.128 0 1.558l-1.833 1.84c-1.572 1.578-4.12 1.578-5.691 0l-1.833-1.84c-.429-.43-.429-1.128 0-1.558s1.124-.43 1.552 0l1.833 1.84c.062.062.127.119.195.17l.001-9.327A1.1 1.1 0 0 1 12 5.5z"></path>
                </svg>
                36.8%
              </div>
              <div className="text-xs text-muted-foreground">vs last month</div>
            </div>
          </div>

          <div className="grow h-[296px]">
            <BarChart />
          </div>
        </div>
      </div>
    </Card>
  )
}
