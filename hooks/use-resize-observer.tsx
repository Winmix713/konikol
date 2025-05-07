"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Size {
  width: number | undefined
  height: number | undefined
}

export function useResizeObserver<T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T>, Size] {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return [ref, size]
}
