"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Customer {
  id: string
  name: string
  email: string
  status: string
  spent: string
  image: string
  joinDate: string
}

interface CustomersListProps {
  customers: Customer[]
}

export function CustomersList({ customers }: CustomersListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
        <h3 className="text-xl font-semibold tracking-tight">Customer List</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-[240px] pl-9 h-10 rounded-full"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-full">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Customers</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Spending</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>High Spenders</DropdownMenuItem>
              <DropdownMenuItem>Medium Spenders</DropdownMenuItem>
              <DropdownMenuItem>Low Spenders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="rounded-full">Add Customer</Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-5 gap-4 py-3 px-6 text-sm font-medium text-muted-foreground border-b">
          <div>Customer</div>
          <div>Email</div>
          <div>Status</div>
          <div>Spent</div>
          <div className="text-right">Actions</div>
        </div>

        {paginatedCustomers.length > 0 ? (
          paginatedCustomers.map((customer, i) => (
            <div
              key={customer.id}
              className="grid grid-cols-5 gap-4 py-4 px-6 text-sm border-b hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{customer.name}</div>
              </div>
              <div className="flex items-center">{customer.email}</div>
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    customer.status === "Active"
                      ? "border-green-500 text-green-500 bg-green-500/10"
                      : "border-gray-500 text-gray-500 bg-gray-500/10",
                  )}
                >
                  {customer.status}
                </Badge>
              </div>
              <div className="flex items-center font-medium">{customer.spent}</div>
              <div className="flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">No customers found matching your search.</div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</span> of{" "}
          <span className="font-medium">{filteredCustomers.length}</span> customers
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
