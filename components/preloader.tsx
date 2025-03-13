"use client"

import { useEffect, useState } from "react"

export function Preloader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      <img src="/preloader.gif" alt="Loading..." className="w-96 h-96" />
    </div>
  )
}