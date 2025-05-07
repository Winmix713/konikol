"use client"

import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"
import { forwardRef } from "react"

interface AnimatedCardProps extends CardProps {
  delay?: number
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, delay = 0, className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        whileHover={{ scale: 1.01 }}
        className={className}
      >
        <Card ref={ref} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  },
)

AnimatedCard.displayName = "AnimatedCard"
