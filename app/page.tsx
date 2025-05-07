import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { ProductView } from "@/components/product-view"
import { PopularProducts } from "@/components/popular-products"
import { Comments } from "@/components/comments"
import { RefundRequests } from "@/components/refund-requests"
import Link from "next/link"
import { Calendar, FileImageIcon as Photo, Download, CheckSquare } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Home() {
  return (
    <DashboardShell>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Overview />
          <ProductView />
          <div className="card overflow-hidden mb-6">
            <div className="flex items-center h-12 px-5 border-b">
              <div className="mr-auto text-xl font-semibold">Overview</div>
              <div className="flex items-center gap-1">
                <button className="inline-flex items-center justify-center h-12 w-12 rounded-full border text-muted-foreground rotate-180 disabled:opacity-50">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path d="M14.94 7.47l2.586 2.586a2.75 2.75 0 0 1 0 3.889L14.94 16.53a.75.75 0 1 1-1.061-1.061l2.586-2.586a1.26 1.26 0 0 0 .115-.133L6.41 12.75a.75.75 0 1 1 0-1.5h10.172a1.26 1.26 0 0 0-.116-.134L13.88 8.53A.75.75 0 0 1 14.94 7.47z"></path>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center h-12 w-12 rounded-full border text-muted-foreground">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path d="M14.94 7.47l2.586 2.586a2.75 2.75 0 0 1 0 3.889L14.94 16.53a.75.75 0 1 1-1.061-1.061l2.586-2.586a1.26 1.26 0 0 0 .115-.133L6.41 12.75a.75.75 0 1 1 0-1.5h10.172a1.26 1.26 0 0 0-.116-.134L13.88 8.53A.75.75 0 0 1 14.94 7.47z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="pt-3">
              <div className="relative p-5 pt-6">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[
                    { title: "Early access", icon: "calendar", color: "from-purple-300 to-purple-400" },
                    { title: "Access use guidelines", icon: "photo", color: "from-yellow-200 to-yellow-400" },
                    { title: "Exclusive downloads", icon: "download", color: "from-green-200 to-green-300" },
                    { title: "Life & work updates", icon: "check-square", color: "from-blue-200 to-blue-300" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href="/shop/details"
                      className="flex flex-col h-[236px] p-4.5 min-w-[206px] border rounded-3xl bg-muted/20 transition-all hover:bg-background hover:shadow-md"
                    >
                      <div
                        className={`flex justify-center items-center w-16 h-16 mb-auto rounded-full bg-gradient-to-b ${item.color}`}
                      >
                        {item.icon === "calendar" && <Calendar className="h-6 w-6" />}
                        {item.icon === "photo" && <Photo className="h-6 w-6" />}
                        {item.icon === "download" && <Download className="h-6 w-6" />}
                        {item.icon === "check-square" && <CheckSquare className="h-6 w-6" />}
                      </div>
                      <div className="mb-2 text-base font-medium">{item.title}</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={`/placeholder.svg?height=20&width=20&text=${i + 1}`} />
                          <AvatarFallback>{i + 1}</AvatarFallback>
                        </Avatar>
                        <div className="mr-auto text-xs text-muted-foreground">{(i + 3) * 2} mins read</div>
                        <div className="inline-flex items-center h-5 px-1.5 rounded border text-xs leading-none capitalize">
                          {i % 2 === 0 ? "new" : "hot"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-6">
            <div className="flex items-center h-12 px-5 border-b">
              <div className="mr-auto text-xl font-semibold">Get more customers</div>
            </div>
            <div className="pt-3">
              <div className="mb-6 px-5 text-sm text-muted-foreground">
                Fifty percent of new customers explore products because the author shares their work on social media.{" "}
                <br />
                Start earning now! 🔥
              </div>
              <div className="flex gap-3 px-5 pb-5">
                {["Twitter", "Facebook", "Instagram", "Threads"].map((platform, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="inline-flex items-center justify-center h-12 border rounded-3xl flex-1 text-muted-foreground hover:text-primary hover:border-primary"
                  >
                    {i === 0 && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M13.815 10.507l7.103-8.257h-1.683l-6.168 7.169L8.141 2.25H2.46l7.449 10.841L2.46 21.75h1.683l6.513-7.571 5.202 7.571h5.682l-7.725-11.243zm-2.305 2.68l-.755-1.079-6.005-8.59h2.585l4.847 6.932.755 1.079 6.3 9.011h-2.585l-5.14-7.353h-.001z"></path>
                      </svg>
                    )}
                    {i === 1 && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M12 1.54c-5.799 0-10.5 4.701-10.5 10.5 0 4.925 3.39 9.056 7.964 10.191v-6.983H7.298V12.04h2.165v-1.382c0-3.574 1.617-5.23 5.126-5.23.665 0 1.813.131 2.282.261v2.909a13.41 13.41 0 0 0-1.213-.039c-1.722 0-2.387.652-2.387 2.347v1.135h3.43l-.589 3.209h-2.84v7.214c5.199-.628 9.228-5.055 9.228-10.423 0-5.799-4.701-10.5-10.5-10.5z"></path>
                      </svg>
                    )}
                    {i === 2 && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M7.651 1.575c-1.117.052-1.88.231-2.547.493a5.15 5.15 0 0 0-1.858 1.214c-.582.584-.941 1.17-1.207 1.861-.259.668-.434 1.432-.483 2.55l-.055 4.328.072 4.329c.053 1.117.231 1.88.493 2.547a5.15 5.15 0 0 0 1.214 1.858c.584.582 1.169.94 1.862 1.207.667.258 1.432.434 2.549.483l4.328.055 4.33-.071c1.12-.053 1.879-.232 2.546-.493.69-.27 1.276-.63 1.858-1.215a5.14 5.14 0 0 0 1.207-1.862c.259-.667.434-1.432.483-2.548l.055-4.33-.071-4.328c-.053-1.12-.231-1.88-.493-2.548a5.16 5.16 0 0 0-1.214-1.858c-.584-.583-1.171-.941-1.862-1.207-.668-.259-1.432-.435-2.549-.483l-4.329-.056-4.328.072m.123 18.982c-1.024-.044-1.58-.214-1.95-.357a3.27 3.27 0 0 1-1.209-.783 3.23 3.23 0 0 1-.787-1.206c-.144-.37-.317-.925-.365-1.949l-.069-4.242.053-4.242c.044-1.023.215-1.579.357-1.95.189-.491.417-.84.783-1.209s.716-.596 1.206-.788c.37-.145.926-.316 1.949-.365l4.242-.069 4.244.053c1.023.044 1.579.214 1.949.357a3.25 3.25 0 0 1 1.209.783 3.24 3.24 0 0 1 .788 1.207c.145.369.316.924.364 1.948l.07 4.242-.053 4.242c-.045 1.024-.215 1.579-.357 1.951-.189.49-.417.84-.784 1.209a3.24 3.24 0 0 1-1.206.787c-.37.144-.925.317-1.948.365l-4.243.069c-2.804.006-3.136-.005-4.243-.053zm8.56-14.166a1.26 1.26 0 1 0 2.52-.004 1.26 1.26 0 0 0-2.52.004zm-9.725 5.622a5.39 5.39 0 0 0 5.402 5.381c2.977-.006 5.387-2.424 5.382-5.402s-2.425-5.387-5.402-5.381-5.387 2.425-5.381 5.402zm1.892-.004a3.5 3.5 0 0 1 7.001-.014 3.5 3.5 0 1 1-7.001.015"></path>
                      </svg>
                    )}
                    {i === 3 && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M17.02 11.234l-.275-.125c-.162-2.986-1.794-4.696-4.534-4.714h-.037c-1.639 0-3.002.7-3.841 1.973l1.507 1.033c.627-.951 1.61-1.153 2.335-1.153h.025c.902.006 1.583.268 2.023.78.321.373.536.887.641 1.537-.8-.136-1.665-.178-2.59-.124-2.605.15-4.28 1.669-4.168 3.781.057 1.071.591 1.992 1.502 2.594.771.509 1.763.758 2.795.701 1.363-.075 2.432-.595 3.177-1.545.566-.722.925-1.658 1.083-2.836.649.392 1.13.908 1.396 1.528.452 1.054.479 2.785-.934 4.197-1.238 1.237-2.726 1.772-4.975 1.789-2.495-.019-4.381-.818-5.608-2.378-1.149-1.46-1.742-3.569-1.765-6.269.022-2.699.616-4.809 1.765-6.269 1.227-1.559 3.113-2.359 5.608-2.378 2.512.019 4.432.823 5.706 2.39.625.769 1.096 1.735 1.406 2.861l1.766-.471c-.377-1.387-.968-2.582-1.774-3.573-1.633-2.009-4.021-3.038-7.098-3.06h-.012c-3.07.021-5.432 1.055-7.018 3.071-1.412 1.795-2.14 4.292-2.165 7.421V12v.007c.025 3.13.753 5.627 2.165 7.421 1.586 2.017 3.948 3.05 7.018 3.071h.012c2.73-.019 4.655-.733 6.24-2.317 2.074-2.072 2.011-4.669 1.328-6.264-.491-1.144-1.426-2.072-2.704-2.686l.001.001zm-4.714 4.432c-1.141.065-2.328-.448-2.386-1.546-.043-.814.579-1.722 2.457-1.831l.633-.019a8.93 8.93 0 0 1 1.9.193c-.216 2.701-1.485 3.141-2.603 3.202z"></path>
                      </svg>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <PopularProducts />
          <Comments />
          <RefundRequests />
        </div>
      </div>
    </DashboardShell>
  )
}
