"use client"

import { useState, useEffect } from "react"

export function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}:${formattedMinutes} ${ampm}`
  }

  return <div className="text-xs font-medium">{formatTime(time)}</div>
}

