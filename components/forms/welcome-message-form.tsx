"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"

// Define the form schema with zod
const welcomeMessageSchema = z.object({
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" }),
})

type WelcomeMessageFormValues = z.infer<typeof welcomeMessageSchema>

interface WelcomeMessageFormProps {
  newCustomersCount: number
}

export function WelcomeMessageForm({ newCustomersCount }: WelcomeMessageFormProps) {
  const [open, setOpen] = useState(false)

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<WelcomeMessageFormValues>({
    resolver: zodResolver(welcomeMessageSchema),
    defaultValues: {
      message:
        "Welcome to our platform! We're excited to have you join our community. Feel free to explore our products and services, and don't hesitate to reach out if you have any questions.",
    },
  })

  // Handle form submission
  function onSubmit(data: WelcomeMessageFormValues) {
    // In a real app, this would send the message to the API
    console.log("Sending welcome message:", data)

    // Show success toast
    toast({
      title: "Welcome message sent!",
      description: `Your message has been sent to ${newCustomersCount} new customers.`,
    })

    // Close the dialog
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <FormLabel>Message to new customers</FormLabel>
                    <Badge variant="outline" className="font-normal w-fit">
                      {newCustomersCount} recipients
                    </Badge>
                  </div>
                  <FormControl>
                    <Textarea {...field} rows={6} className="resize-none" placeholder="Enter your welcome message" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div
              className="bg-muted/50 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm font-medium mb-2">Preview</h4>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap">{form.watch("message")}</div>
              <div className="text-xs text-muted-foreground mt-2">
                Character count: {form.watch("message").length}/500
              </div>
            </motion.div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Send to {newCustomersCount} Customers
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
