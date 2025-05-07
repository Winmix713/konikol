import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const comments = [
  {
    user: "Joyce",
    avatar: "/placeholder.svg?height=44&width=44&text=J",
    product: "Bento Pro 2.0",
    time: "09:00 AM",
    comment: "Great work! When HTML version will be available?",
    hasEmoji: true,
  },
  {
    user: "Gladyce",
    avatar: "/placeholder.svg?height=44&width=44&text=G",
    product: "Food Delivery App",
    time: "10:24 AM",
    comment: "Amazing. This says compatible with After Effects. Will After Effects files be added?",
    hasEmoji: false,
  },
  {
    user: "Elbert",
    avatar: "/placeholder.svg?height=44&width=44&text=E",
    product: "AstroClash",
    time: "11:33 AM",
    comment: "Hello, can we get the 3d source code of the characters?",
    hasEmoji: false,
  },
]

export function Comments() {
  return (
    <Card className="mb-6">
      <div className="flex items-center h-12 px-3 border-b">
        <div className="mr-auto text-xl font-semibold">Comments</div>
      </div>

      <div className="pt-3">
        <div className="flex flex-col gap-1">
          {comments.map((comment, i) => (
            <div key={i} className="group relative flex items-start px-3 py-5 transition-all">
              <div className="absolute inset-0 opacity-0 bg-muted/50 group-hover:opacity-100 transition-opacity rounded-md"></div>
              <div className="relative z-2 shrink-0">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="relative z-2 grow pl-5">
                <div className="mb-1 text-base font-medium">
                  {comment.user}
                  <span className="text-muted-foreground"> on </span>
                  <Link href="/shop/details" className="transition-colors hover:text-primary">
                    {comment.product}
                  </Link>
                </div>
                <div className="mb-3 text-xs text-muted-foreground">{comment.time}</div>
                <div className="text-base">{comment.comment}</div>
                {comment.hasEmoji && <div className="mt-1 text-xl">⚡</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 px-3 pb-3">
          <Button variant="outline" className="w-full rounded-3xl">
            All comments
          </Button>
        </div>
      </div>
    </Card>
  )
}
