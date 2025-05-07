"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Users, Wallet, ArrowUp, ArrowDown, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BalanceChart } from "./balance-chart"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Customer {
  id: string
  name: string
  email: string
  image: string
  joinDate: string
}

interface CustomersOverviewProps {
  customers: Customer[]
  customerCount: number
  customerGrowth: number
  balance: string
  balanceGrowth: number
  newCustomersToday: number
  isLoading?: boolean
}

export function CustomersOverview({
  customers,
  customerCount,
  customerGrowth,
  balance,
  balanceGrowth,
  newCustomersToday,
  isLoading = false,
}: CustomersOverviewProps) {
  const [timeframe, setTimeframe] = useState("Last 7 days")
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to our platform! We're excited to have you join our community. Feel free to explore our products and services, and don't hesitate to reach out if you have any questions.",
  )

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (amount: string) => {
    return amount
  }

  return (
    <Card className="overflow-hidden border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-card border-b">
        <h3 className="text-xl font-semibold tracking-tight">Customers Overview</h3>
        <div className="relative">
          <Button variant="outline" className="flex items-center gap-1 h-10 px-4 rounded-full">
            {timeframe}
            <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="customers" className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-2 p-1 bg-muted/50 rounded-xl h-auto">
              <TabsTrigger
                value="customers"
                className="rounded-lg py-3 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Customers
              </TabsTrigger>
              <TabsTrigger
                value="balance"
                className="rounded-lg py-3 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Balance
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="customers" className="mt-6 space-y-6">
            <div className="px-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-2xl font-bold">{isLoading ? "—" : formatNumber(customerCount)}</h4>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
                        customerGrowth >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500",
                      )}
                    >
                      {customerGrowth >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(customerGrowth)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Total customers</p>
                </div>

                <Dialog open={welcomeDialogOpen} onOpenChange={setWelcomeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send Welcome Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Send Welcome Message</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message to {newCustomersToday} new customers</Label>
                        <Textarea
                          id="message"
                          value={welcomeMessage}
                          onChange={(e) => setWelcomeMessage(e.target.value)}
                          rows={6}
                          className="resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setWelcomeDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setWelcomeDialogOpen(false)}>Send Message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mb-2">
                <div className="text-base font-medium">{isLoading ? "—" : newCustomersToday} new customers today!</div>
                <div className="text-sm text-muted-foreground">Send a welcome message to all new customers.</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />

              <div className="flex overflow-auto px-6 pb-6 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                  {customers.map((customer) => (
                    <TooltipProvider key={customer.id} delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/customers/${customer.id}`}
                            className="flex flex-col items-center p-2 min-w-[100px] rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Avatar className="h-16 w-16 mb-2 border-2 border-background">
                              <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
                              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium truncate max-w-[100px]">{customer.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(customer.joinDate).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <div className="text-sm font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                          <div className="text-xs text-muted-foreground">
                            Joined {new Date(customer.joinDate).toLocaleDateString()}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}

                  <Link
                    href="/customers"
                    className="flex flex-col items-center justify-center p-2 min-w-[100px] rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center h-16 w-16 mb-2 rounded-full border border-border bg-background hover:border-primary transition-colors">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">View All</span>
                    <span className="text-xs text-muted-foreground">Customers</span>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="balance" className="mt-6 space-y-6">
            <div className="px-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-2xl font-bold">{isLoading ? "—" : formatCurrency(balance)}</h4>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
                        balanceGrowth >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500",
                      )}
                    >
                      {balanceGrowth >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(balanceGrowth)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Total balance</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="h-[300px] w-full">
                <BalanceChart />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
