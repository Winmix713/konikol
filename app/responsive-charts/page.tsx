import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { ResponsiveChart } from "@/components/responsive-chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatedCard } from "@/components/ui/animated-card"

function ChartSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 border-b">
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  )
}

export default function ResponsiveChartsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <AnimatedCard delay={0} className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Responsive Charts</h1>
            <p className="text-sm text-muted-foreground">
              Implemented with use-resize-observer to adapt to container size
            </p>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <ResponsiveChart title="Revenue Trend" description="Monthly revenue over the past year" />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <ResponsiveChart title="Customer Growth" description="New customer acquisitions by month" />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <ResponsiveChart title="Product Sales" description="Top product performance by category" />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  )
}
