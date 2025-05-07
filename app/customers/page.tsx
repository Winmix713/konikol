import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { OverviewCard } from "@/components/customers/overview-card"
import { CustomersList } from "@/components/customers/customers-list"
import { Skeleton } from "@/components/ui/skeleton"

// This would typically come from an API or database
const customers = [
  {
    id: "cust_001",
    name: "Gladyce Blick",
    email: "gladyce@example.com",
    image: "/placeholder.svg?height=64&width=64&text=GB",
    joinDate: "2023-05-15T10:30:00Z",
    status: "Active",
    spent: "$3,250.00",
  },
  {
    id: "cust_002",
    name: "Elbert Abshire",
    email: "elbert@example.com",
    image: "/placeholder.svg?height=64&width=64&text=EA",
    joinDate: "2023-06-22T14:45:00Z",
    status: "Active",
    spent: "$7,890.00",
  },
  {
    id: "cust_003",
    name: "Joyce Wunsch",
    email: "joyce@example.com",
    image: "/placeholder.svg?height=64&width=64&text=JW",
    joinDate: "2023-07-10T09:15:00Z",
    status: "Inactive",
    spent: "$1,500.00",
  },
  {
    id: "cust_004",
    name: "John Doe",
    email: "john@example.com",
    image: "/placeholder.svg?height=64&width=64&text=JD",
    joinDate: "2023-08-05T16:20:00Z",
    status: "Active",
    spent: "$9,999.00",
  },
  {
    id: "cust_005",
    name: "Anna Smith",
    email: "anna@example.com",
    image: "/placeholder.svg?height=64&width=64&text=AS",
    joinDate: "2023-09-18T11:10:00Z",
    status: "Active",
    spent: "$4,750.00",
  },
  {
    id: "cust_006",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "/placeholder.svg?height=64&width=64&text=MJ",
    joinDate: "2023-10-02T13:40:00Z",
    status: "Active",
    spent: "$6,120.00",
  },
  {
    id: "cust_007",
    name: "Sarah Williams",
    email: "sarah@example.com",
    image: "/placeholder.svg?height=64&width=64&text=SW",
    joinDate: "2023-11-14T08:55:00Z",
    status: "Active",
    spent: "$2,890.00",
  },
]

function OverviewSkeleton() {
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 bg-card border-b">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-40" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-4 overflow-hidden py-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 min-w-[100px]">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CustomersPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<OverviewSkeleton />}>
          <OverviewCard
            customers={customers}
            customerCount={1293}
            customerGrowth={-36.8}
            balance="$256k"
            balanceGrowth={36.8}
            newCustomersToday={857}
          />
        </Suspense>

        <Suspense fallback={<div className="rounded-lg border p-8 text-center">Loading customers...</div>}>
          <CustomersList customers={customers} />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
