"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function TailwindV4Page() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6">
            <CardTitle className="text-2xl font-bold tracking-tight mb-2">Tailwind CSS v4 Funkciók</CardTitle>
            <p className="text-sm text-muted-foreground">A Tailwind CSS v4 alpha verzió új funkcióinak bemutatása</p>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Natív CSS Változók</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A Tailwind CSS v4 natív CSS változókat használ a színekhez és egyéb értékekhez, ami jobb teljesítményt
                és kisebb bundle méretet eredményez.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-4 rounded bg-[--primary] text-[--primary-foreground]">Primary</div>
                <div className="p-4 rounded bg-[--secondary] text-[--secondary-foreground]">Secondary</div>
                <div className="p-4 rounded bg-[--accent] text-[--accent-foreground]">Accent</div>
                <div className="p-4 rounded bg-[--muted] text-[--muted-foreground]">Muted</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Új "at" Szintaxis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A Tailwind CSS v4 új "at" szintaxist használ a variánsokhoz, ami egyszerűbbé és olvashatóbbá teszi a
                kódot.
              </p>
              <div className="space-y-2">
                <div className="@hover:bg-primary @hover:text-primary-foreground p-4 rounded border">
                  Hover ezen az elemen
                </div>
                <div className="@md:flex @md:items-center @md:gap-2 p-4 rounded border">
                  Flex elrendezés md breakpointnál
                </div>
                <div className="@dark:bg-primary @dark:text-primary-foreground p-4 rounded border">
                  Sötét témában más szín
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Új Komponensek</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge>Default Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-4 rounded border">
                    <h3 className="font-medium">Card 1</h3>
                    <p className="text-sm text-muted-foreground">Card description</p>
                  </div>
                  <div className="p-4 rounded border">
                    <h3 className="font-medium">Card 2</h3>
                    <p className="text-sm text-muted-foreground">Card description</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teljesítmény Fejlesztések</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A Tailwind CSS v4 a LightningCSS-t használja, ami jelentősen gyorsabb, mint a korábbi PostCSS alapú
                megoldás.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Akár 10-20x gyorsabb build idő</li>
                <li>Kisebb bundle méret</li>
                <li>Jobb browser támogatás</li>
                <li>Fejlettebb CSS minifikáció</li>
              </ul>
              <div className="flex gap-2">
                <Button variant="outline">Részletek</Button>
                <Button>Kipróbálás</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
