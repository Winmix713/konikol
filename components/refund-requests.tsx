import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RefundRequests() {
  return (
    <Card className="mb-6">
      <div className="flex items-center h-12 px-3 border-b">
        <div className="mr-auto text-xl font-semibold">Refund requests</div>
      </div>

      <div className="pt-3">
        <div className="p-3 pt-0">
          <div className="flex items-center mb-8">
            <div className="flex justify-center items-center shrink-0 w-16 h-16 rounded-full bg-gradient-to-b from-orange-200 to-orange-300">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M19.935 7.589l.838 3.232c.146.434.227.899.227 1.383v3.513a4.25 4.25 0 0 1-4.25 4.25h-9.5A4.25 4.25 0 0 1 3 15.717v-3.513c0-.256.023-.506.066-.749H3.01v-1.318a3.75 3.75 0 0 1 2.742-3.612l8.308-2.32a4.75 4.75 0 0 1 5.875 3.383zM16.75 9.455h-9.5a2.75 2.75 0 0 0-2.75 2.75v3.513a2.75 2.75 0 0 0 2.75 2.75h9.5a2.75 2.75 0 0 0 2.75-2.75v-3.513a2.75 2.75 0 0 0-2.75-2.75zm-2.287-3.804l-8.308 2.32c-.326.091-.618.251-.863.462a4.22 4.22 0 0 1 1.958-.478h9.5c.659 0 1.283.15 1.84.418l-.107-.407a3.25 3.25 0 0 0-4.02-2.315z"></path>
              </svg>
            </div>
            <div className="grow pl-5 text-sm font-medium text-muted-foreground">
              You have{" "}
              <Link
                href="/income/refunds"
                className="text-[0.9375rem] leading-[1.5rem] font-semibold text-primary transition-colors hover:text-foreground"
              >
                52 open refund requests
              </Link>{" "}
              to action. This includes{" "}
              <Link
                href="/income/refunds"
                className="text-[0.9375rem] leading-[1.5rem] font-semibold text-primary transition-colors hover:text-foreground"
              >
                8 new requests.
              </Link>{" "}
              👀
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-3xl">
            View all
          </Button>
        </div>
      </div>
    </Card>
  )
}
