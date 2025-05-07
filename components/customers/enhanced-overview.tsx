"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Users, Wallet, ArrowUp, ArrowDown, Send, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EnhancedBalanceChart } from "./enhanced-balance-chart"
import { format, parseISO } from "date-fns"
import { hu } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"

interface Customer {
  id: string
  name: string
  email: string
  image: string
  joinDate: string
  status: string
  spent: string
}

interface EnhancedOverviewProps {
  customers: Customer[]
  customerCount: number
  customerGrowth: number
  balance: string
  balanceGrowth: number
  newCustomersToday: number
  isLoading?: boolean
}

export function EnhancedOverview({
  customers,
  customerCount,
  customerGrowth,
  balance,
  balanceGrowth,
  newCustomersToday,
  isLoading = false,
}: EnhancedOverviewProps) {
  const [timeframe, setTimeframe] = useState("Last 7 days")
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to our platform! We're excited to have you join our community. Feel free to explore our products and services, and don't hesitate to reach out if you have any questions.",
  )
  const [timeframeOpen, setTimeframeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("customers")

  const timeframeOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date", "All time"]

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("hu-HU").format(num)
  }

  const formatDate = (dateString: string, formatStr = "MMM d, yyyy") => {
    try {
      return format(parseISO(dateString), formatStr, { locale: hu })
    } catch (error) {
      return dateString
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-card border-b">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold tracking-tight">Customers Overview</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">About customer overview</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="start" className="max-w-xs">
                <p>View and manage your customer data, track growth, and send welcome messages to new customers.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Dialog open={timeframeOpen} onOpenChange={setTimeframeOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1 h-10 px-4 rounded-full w-full sm:w-auto">
              {timeframe}
              <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] w-[calc(100%-2rem)] mx-auto">
            <DialogHeader>
              <DialogTitle>Select Time Period</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {timeframeOptions.map((option) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant={timeframe === option ? "default" : "ghost"}
                    className="justify-start w-full"
                    onClick={() => {
                      setTimeframe(option)
                      setTimeframeOpen(false)
                    }}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="customers" value={activeTab} onValueChange={setActiveTab} className="w-full">
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="customers" className="mt-6 space-y-6">
                <div className="px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <motion.div
                      className="flex flex-col"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2">
                        <h4 className="text-2xl font-bold">{formatNumber(customerCount)}</h4>
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
                    </motion.div>

                    <Dialog open={welcomeDialogOpen} onOpenChange={setWelcomeDialogOpen}>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button size="sm" className="gap-2 w-full sm:w-auto">
                            <Send className="h-4 w-4" />
                            <span className="whitespace-nowrap">Send Welcome Message</span>
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] mx-auto">
                        <DialogHeader>
                          <DialogTitle>Send Welcome Message</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <Label htmlFor="message">Message to new customers</Label>
                              <Badge variant="outline" className="font-normal w-fit">
                                {newCustomersToday} recipients
                              </Badge>
                            </div>
                            <Textarea
                              id="message"
                              value={welcomeMessage}
                              onChange={(e) => setWelcomeMessage(e.target.value)}
                              rows={6}
                              className="resize-none"
                            />
                          </div>
                          <motion.div
                            className="bg-muted/50 p-4 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h4 className="text-sm font-medium mb-2">Preview</h4>
                            <div className="text-sm text-muted-foreground whitespace-pre-wrap">{welcomeMessage}</div>
                          </motion.div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setWelcomeDialogOpen(false)}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </Button>
                          <Button onClick={() => setWelcomeDialogOpen(false)} className="w-full sm:w-auto">
                            Send to {newCustomersToday} Customers
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="mb-2">
                    <div className="text-base font-medium">{newCustomersToday} new customers today!</div>
                    <div className="text-sm text-muted-foreground">Send a welcome message to all new customers.</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />

                  <div className="flex overflow-auto px-6 pb-6 scrollbar-hide">
                    <div className="flex gap-4 min-w-max">
                      {customers.map((customer, index) => (
                        <motion.div
                          key={customer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <TooltipProvider delayDuration={300}>
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
                                    {formatDate(customer.joinDate, "MMM d")}
                                  </span>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="p-3 space-y-1">
                                <div className="text-sm font-medium">{customer.name}</div>
                                <div className="text-xs text-muted-foreground">{customer.email}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "px-2 py-0.5 text-xs font-normal",
                                      customer.status === "Active"
                                        ? "border-green-500 text-green-500 bg-green-500/10"
                                        : "border-gray-500 text-gray-500 bg-gray-500/10",
                                    )}
                                  >
                                    {customer.status}
                                  </Badge>
                                  <span className="text-xs font-medium">{customer.spent}</span>
                                </div>
                                <div className="text-xs text-muted-foreground pt-1">
                                  Joined {formatDate(customer.joinDate, "yyyy. MMMM d.")}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: customers.length * 0.1 }}
                      >
                        <Link
                          href="/customers"
                          className="flex flex-col items-center justify-center p-2 min-w-[100px] rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <motion.div
                            className="flex items-center justify-center h-16 w-16 mb-2 rounded-full border border-border bg-background hover:border-primary transition-colors group"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </motion.div>
                          <span className="text-sm font-medium">View All</span>
                          <span className="text-xs text-muted-foreground">Customers</span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="balance" className="mt-6 space-y-6">
                <div className="px-6">
                  <div className="flex items-start justify-between mb-6 flex-col sm:flex-row gap-3">
                    <motion.div
                      className="flex flex-col"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2">
                        <h4 className="text-2xl font-bold">{balance}</h4>
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
                    </motion.div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" className="h-8 px-3 rounded-full flex-1 sm:flex-none">
                                Daily
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>View daily balance changes</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 rounded-full bg-muted/50 flex-1 sm:flex-none"
                              >
                                Weekly
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>View weekly balance changes</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm" className="h-8 px-3 rounded-full flex-1 sm:flex-none">
                                Monthly
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>View monthly balance changes</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <motion.div
                    className="h-[300px] w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <EnhancedBalanceChart />
                  </motion.div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Data updated <span className="font-medium">{formatDate(new Date().toISOString(), "H:mm")}</span>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="outline" size="sm" className="gap-2 rounded-full w-full sm:w-auto">
            <ChevronDown className="h-4 w-4" />
            Export Data
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-card border-b">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full sm:w-32 rounded-full" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 pt-6">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="px-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-full sm:w-40" />
          </div>
          <div className="space-y-2 mb-6">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="px-6 pb-6 overflow-x-auto">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 min-w-[100px]">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-full sm:w-32 rounded-full" />
      </CardFooter>
    </Card>
  )
}
