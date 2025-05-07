import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { CustomerTable, type Customer } from "@/components/customers/customer-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"

// This would typically come from an API or database
const customers: Customer[] = [
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

function TableSkeleton() {
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 bg-card border-b">
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="border rounded-md">
          <div className="h-12 border-b px-4 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-[120px] mx-4" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 border-b px-4 flex items-center">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-[120px] mx-4" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CustomersTablePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <CardTitle className="text-2xl font-bold tracking-tight mb-2">Advanced Customer Table</CardTitle>
          <p className="text-sm text-muted-foreground">
            Implemented with @tanstack/react-table, react-hook-form, and toast notifications
          </p>
        </Card>

        <Suspense fallback={<TableSkeleton />}>
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerTable data={customers} />
            </CardContent>
          </Card>
        </Suspense>
      </div>
      <Toaster />
    </DashboardShell>
  )
}
