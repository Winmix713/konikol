import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const products = [
  {
    name: "Crypter - NFT UI Kit",
    price: "$3,250.00",
    status: "Active",
    image: "/placeholder.svg?height=64&width=64&text=NFT",
  },
  {
    name: "Bento Pro 2.0 Illustrations",
    price: "$7,890.00",
    status: "Active",
    image: "/placeholder.svg?height=64&width=64&text=BP",
  },
  {
    name: "Fleet - travel shopping kit",
    price: "$1,500.00",
    status: "Offline",
    image: "/placeholder.svg?height=64&width=64&text=F",
  },
  {
    name: "SimpleSocial UI Design Kit",
    price: "$9,999.00",
    status: "Active",
    image: "/placeholder.svg?height=64&width=64&text=SS",
  },
  {
    name: "SimpleSocial UI Design Kit",
    price: "$4,750.00",
    status: "Active",
    image: "/placeholder.svg?height=64&width=64&text=SS",
  },
]

export function PopularProducts() {
  return (
    <Card className="mb-6">
      <div className="flex items-center h-12 px-3 border-b">
        <div className="mr-auto text-xl font-semibold">Popular products</div>
      </div>

      <div className="pt-3">
        <div className="flex flex-col gap-1">
          {products.map((product, i) => (
            <Link key={i} href="/shop/details" className="group relative flex items-center p-3 cursor-pointer">
              <div className="absolute inset-0 opacity-0 bg-muted/50 group-hover:opacity-100 transition-opacity rounded-md"></div>
              <div className="relative z-2 shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              </div>
              <div className="relative z-2 grow max-w-[226px] px-5 line-clamp-2 text-base font-medium">
                {product.name}
              </div>
              <div className="relative z-2 flex flex-col items-end shrink-0 ml-auto text-right">
                <span className="mb-1 text-base font-medium">{product.price}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "px-2 py-1 font-normal",
                    product.status === "Active" ? "border-green-500 text-green-500" : "border-gray-500 text-gray-500",
                  )}
                >
                  {product.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-6 px-3 pb-3">
          <Button variant="outline" className="w-full rounded-3xl">
            All products
          </Button>
        </div>
      </div>
    </Card>
  )
}
