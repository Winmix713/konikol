"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { motion } from "framer-motion"
import { Save, RotateCcw, Maximize, Minimize } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Create a responsive grid layout
const ResponsiveGridLayout = WidthProvider(Responsive)

// Define the widget type
interface Widget {
  id: string
  title: string
  content: React.ReactNode
  defaultSize: { w: number; h: number }
  minSize?: { w: number; h: number }
}

interface DashboardGridProps {
  widgets: Widget[]
}

export function DashboardGrid({ widgets }: DashboardGridProps) {
  // Define the initial layouts
  const generateLayouts = () => {
    const lgLayout = widgets.map((widget, index) => ({
      i: widget.id,
      x: (index % 3) * 4,
      y: Math.floor(index / 3) * 4,
      w: widget.defaultSize.w,
      h: widget.defaultSize.h,
      minW: widget.minSize?.w || 2,
      minH: widget.minSize?.h || 2,
    }))

    const mdLayout = widgets.map((widget, index) => ({
      i: widget.id,
      x: (index % 2) * 6,
      y: Math.floor(index / 2) * 4,
      w: Math.min(widget.defaultSize.w, 6),
      h: widget.defaultSize.h,
      minW: widget.minSize?.w || 2,
      minH: widget.minSize?.h || 2,
    }))

    const smLayout = widgets.map((widget, index) => ({
      i: widget.id,
      x: 0,
      y: index * 4,
      w: 12,
      h: widget.defaultSize.h,
      minW: widget.minSize?.w || 2,
      minH: widget.minSize?.h || 2,
    }))

    return {
      lg: lgLayout,
      md: mdLayout,
      sm: smLayout,
    }
  }

  const [layouts, setLayouts] = useState(generateLayouts())
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg")
  const [expandedWidgets, setExpandedWidgets] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after component mounts to avoid SSR issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle layout changes
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts)
  }

  // Handle breakpoint changes
  const handleBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint)
  }

  // Reset layouts to default
  const resetLayouts = () => {
    setLayouts(generateLayouts())
    setExpandedWidgets([])
    toast({
      title: "Layout reset",
      description: "Dashboard layout has been reset to default.",
    })
  }

  // Save layout
  const saveLayout = () => {
    // In a real app, this would save to localStorage or a database
    localStorage.setItem("dashboardLayouts", JSON.stringify(layouts))
    toast({
      title: "Layout saved",
      description: "Your dashboard layout has been saved.",
    })
  }

  // Toggle widget expansion
  const toggleWidgetExpansion = (widgetId: string) => {
    if (expandedWidgets.includes(widgetId)) {
      setExpandedWidgets(expandedWidgets.filter((id) => id !== widgetId))
    } else {
      setExpandedWidgets([...expandedWidgets, widgetId])
    }
  }

  // Check if a widget is expanded
  const isWidgetExpanded = (widgetId: string) => {
    return expandedWidgets.includes(widgetId)
  }

  // Don't render on server
  if (!mounted) return null

  return (
    <div className="w-full">
      <div className="flex justify-end gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={resetLayouts} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset Layout
        </Button>
        <Button size="sm" onClick={saveLayout} className="gap-2">
          <Save className="h-4 w-4" />
          Save Layout
        </Button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={60}
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={handleBreakpointChange}
        isDraggable
        isResizable
        margin={[16, 16]}
      >
        {widgets.map((widget) => {
          const isExpanded = isWidgetExpanded(widget.id)

          return (
            <div key={widget.id} className={cn("h-full", isExpanded ? "z-50" : "")}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden shadow-sm border">
                  <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 bg-muted/30">
                    <CardTitle className="text-base font-medium">{widget.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => toggleWidgetExpansion(widget.id)}
                    >
                      {isExpanded ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 overflow-auto">{widget.content}</CardContent>
                </Card>
              </motion.div>
            </div>
          )
        })}
      </ResponsiveGridLayout>
    </div>
  )
}
