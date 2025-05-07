import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardGrid } from "@/components/dashboard/dashboard-grid"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Toaster } from "@/components/ui/toaster"
import { ProductView } from "@/components/product-view"
import { PopularProducts } from "@/components/popular-products"
import { Comments } from "@/components/comments"
import { RefundRequests } from "@/components/refund-requests"
import { AreaChart } from "@/components/charts/area-chart"
import { BarChart } from "@/components/charts/bar-chart"

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="shadow-sm">
          <CardHeader className="p-4 border-b">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function DashboardGridPage() {
  // Define the widgets for the dashboard
  const widgets = [
    {
      id: "product-view",
      title: "Product View",
      content: <ProductView />,
      defaultSize: { w: 8, h: 6 },
      minSize: { w: 4, h: 4 },
    },
    {
      id: "popular-products",
      title: "Popular Products",
      content: <PopularProducts />,
      defaultSize: { w: 4, h: 8 },
      minSize: { w: 3, h: 6 },
    },
    {
      id: "comments",
      title: "Comments",
      content: <Comments />,
      defaultSize: { w: 4, h: 8 },
      minSize: { w: 3, h: 6 },
    },
    {
      id: "refund-requests",
      title: "Refund Requests",
      content: <RefundRequests />,
      defaultSize: { w: 4, h: 4 },
      minSize: { w: 3, h: 3 },
    },
    {
      id: "area-chart",
      title: "Revenue Trend",
      content: (
        <div className="h-[200px]">
          <AreaChart color="#22c55e" />
        </div>
      ),
      defaultSize: { w: 4, h: 4 },
      minSize: { w: 3, h: 3 },
    },
    {
      id: "bar-chart",
      title: "Weekly Sales",
      content: (
        <div className="h-[200px]">
          <BarChart />
        </div>
      ),
      defaultSize: { w: 4, h: 4 },
      minSize: { w: 3, h: 3 },
    },
  ]

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <AnimatedCard delay={0} className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Customizable Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Implemented with react-grid-layout, use-resize-observer, and react-hook-form
            </p>
          </div>
        </AnimatedCard>

        <Suspense fallback={<GridSkeleton />}>
          <DashboardGrid widgets={widgets} />
        </Suspense>
      </div>
      <Toaster />
    </DashboardShell>
  )
}
