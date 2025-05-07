"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CircleUser,
  FileText,
  Home,
  Package,
  Search,
  ShoppingBag,
  Bell,
  MessageSquare,
  ChevronDown,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 flex flex-col w-[340px] p-5 bg-background border-r transition-transform duration-300 max-xl:w-[296px] max-lg:w-[240px] max-md:z-40 max-md:-translate-x-full">
        <Link href="/" className="block w-12 h-12 mb-5">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Logo" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </Link>

        <button className="absolute top-5 right-5 max-md:flex hidden items-center justify-center h-12 w-12 rounded-full">
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col gap-1 grow overflow-auto -mx-5 px-5">
          <NavItem href="/" icon={Home} isActive={pathname === "/"}>
            Dashboard
          </NavItem>

          <ExpandableNavItem
            title="Products"
            icon={Package}
            isActive={pathname.startsWith("/products")}
            items={[
              { href: "/products", label: "Overview" },
              { href: "/products/drafts", label: "Drafts", badge: "2" },
              { href: "/products/released", label: "Released" },
              { href: "/products/comments", label: "Comments" },
              { href: "/products/scheduled", label: "Scheduled", badge: "8", badgeColor: "bg-secondary-04" },
            ]}
          />

          <ExpandableNavItem
            title="Customers"
            icon={CircleUser}
            isActive={pathname.startsWith("/customers")}
            items={[
              { href: "/customers", label: "Overview" },
              { href: "/customers/customer-list", label: "Customer list" },
              { href: "/customers-enhanced", label: "Enhanced Overview" },
            ]}
          />

          <NavItem href="/shop" icon={ShoppingBag} isActive={pathname === "/shop"}>
            Shop
          </NavItem>

          <ExpandableNavItem
            title="Income"
            icon={BarChart3}
            isActive={pathname.startsWith("/income")}
            items={[
              { href: "/income/earning", label: "Earning" },
              { href: "/income/refunds", label: "Refunds", badge: "3" },
              { href: "/income/payouts", label: "Payouts" },
              { href: "/income/statements", label: "Statements" },
            ]}
          />

          <NavItem href="/promote" icon={FileText} isActive={pathname === "/promote"}>
            Promote
          </NavItem>
        </div>

        {/* Theme toggle */}
        <div className="mt-auto pt-6 max-md:pt-4 flex justify-between items-center">
          <ThemeToggle />
          <div className="text-sm text-muted-foreground">v1.0.0</div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-[340px] w-full max-xl:pl-[296px] max-lg:pl-[240px] max-md:pl-0">
        {/* Header */}
        <header className="fixed top-0 right-0 left-[340px] z-20 bg-background border-b h-[88px] max-xl:left-[296px] max-lg:left-[240px] max-md:left-0">
          <div className="flex items-center h-full px-6">
            <div className="mr-3 gap-3 hidden max-md:flex">
              <Link href="/" className="block w-12 h-12">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Logo" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="icon" className="flex-col gap-[4.5px]">
                <div className="w-4.5 h-[1.5px] rounded-full bg-muted-foreground"></div>
                <div className="w-4.5 h-[1.5px] rounded-full bg-muted-foreground"></div>
              </Button>
            </div>

            <div className="mr-auto text-2xl font-semibold max-md:hidden">Dashboard</div>

            <div className="flex items-center gap-3">
              <div className="relative w-[316px] max-lg:hidden">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  className="w-full h-12 pl-10 pr-3 rounded-3xl bg-muted border-transparent"
                  type="text"
                  placeholder="Search anything..."
                />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full px-6 max-md:hidden">Create</Button>
              </motion.div>

              <Button variant="ghost" size="icon" className="rounded-full max-lg:flex max-md:hidden">
                <Search className="h-6 w-6" />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-6 w-6" />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageSquare className="h-6 w-6" />
              </Button>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="pt-[88px] pb-5">
          <div className="px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  children: React.ReactNode
}

function NavItem({ href, icon: Icon, isActive, children }: NavItemProps) {
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
      <Link
        href={href}
        className={cn(
          "group relative flex items-center shrink-0 gap-3 h-12 px-3 text-sm font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl shadow-md">
            <div className="absolute inset-0.5 bg-background rounded-[0.6875rem]"></div>
          </div>
        )}
        <Icon
          className={cn(
            "relative z-2 h-6 w-6",
            isActive ? "fill-primary" : "fill-muted-foreground group-hover:fill-foreground",
          )}
        />
        <div className="relative z-2 mr-3">{children}</div>
      </Link>
    </motion.div>
  )
}

interface ExpandableNavItemProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  items: Array<{
    href: string
    label: string
    badge?: string
    badgeColor?: string
  }>
}

function ExpandableNavItem({ title, icon: Icon, isActive, items }: ExpandableNavItemProps) {
  return (
    <div className="relative">
      <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
        <button
          className={cn(
            "group relative flex items-center gap-3 w-full h-12 px-3 text-sm font-medium transition-colors",
            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon
            className={cn(
              "relative z-2 h-6 w-6",
              isActive ? "fill-primary" : "fill-muted-foreground group-hover:fill-foreground",
            )}
          />
          <div className="relative z-2">{title}</div>
          <ChevronDown
            className={cn(
              "relative z-2 ml-auto h-6 w-6 transition-all",
              isActive ? "fill-primary" : "fill-muted-foreground group-hover:fill-foreground",
            )}
          />
        </button>
      </motion.div>

      {isActive && (
        <div className="relative flex flex-col pl-9 before:absolute before:top-0 before:left-[1.4375rem] before:bottom-12 before:w-[1.5px] before:bg-border">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="absolute top-0 -left-[0.8125rem] bottom-[calc(50%-0.75px)] w-[0.8125rem] border-l border-b border-border rounded-bl-[10px]"></div>
              <Link
                href={item.href}
                className="group relative flex items-center shrink-0 gap-3 h-11 px-3 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
              >
                <div className="relative z-2 mr-3">{item.label}</div>
                {item.badge && (
                  <div
                    className={cn(
                      "relative z-2 flex justify-center items-center w-6 h-6 ml-auto rounded-lg text-xs font-medium",
                      item.badgeColor || "bg-secondary-01 text-shade-01",
                    )}
                  >
                    {item.badge}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
