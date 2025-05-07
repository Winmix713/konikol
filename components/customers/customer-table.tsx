"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table/data-table"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

// Define the Customer type
export type Customer = {
  id: string
  name: string
  email: string
  status: "Active" | "Inactive"
  spent: string
  image: string
  joinDate: string
}

export function CustomerTable({ data }: { data: Customer[] }) {
  const [customers, setCustomers] = useState<Customer[]>(data)

  // Define the columns for the table
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const customer = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{customer.name}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              status === "Active"
                ? "border-green-500 text-green-500 bg-green-500/10"
                : "border-gray-500 text-gray-500 bg-gray-500/10",
            )}
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "spent",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Spent
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = row.getValue("spent") as string
        return <div className="font-medium">{amount}</div>
      },
    },
    {
      accessorKey: "joinDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Join Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("joinDate") as string
        return <div>{format(new Date(date), "MMM d, yyyy")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original

        const handleDelete = () => {
          // Filter out the customer with the matching ID
          setCustomers(customers.filter((c) => c.id !== customer.id))

          // Show success toast
          toast({
            title: "Customer deleted",
            description: `${customer.name} has been removed from the customer list.`,
          })
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.email)}>
                Copy email
              </DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit customer</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return <DataTable columns={columns} data={customers} searchKey="name" searchPlaceholder="Search customers..." />
}
