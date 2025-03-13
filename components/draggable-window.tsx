"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DraggableWindowProps {
  id: string
  title: string
  isActive: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  children: React.ReactNode
  onClose: () => void
  onActivate: () => void
  onPositionChange: (position: { x: number; y: number }) => void
  className?: string
}

export function DraggableWindow({
  id,
  title,
  isActive,
  position,
  size,
  children,
  onClose,
  onActivate,
  onPositionChange,
  className,
}: DraggableWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Make window responsive
  const [windowSize, setWindowSize] = useState(size)

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.9, size.width)
      const height = Math.min(window.innerHeight * 0.8, size.height)
      setWindowSize({ width, height })

      // Ensure window is within viewport
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect()
        const newX = Math.min(Math.max(0, position.x), window.innerWidth - rect.width)
        const newY = Math.min(Math.max(0, position.y), window.innerHeight - rect.height)
        if (newX !== position.x || newY !== position.y) {
          onPositionChange({ x: newX, y: newY })
        }
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [size, position, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) {
      onActivate()
    }

    if ((e.target as HTMLElement).closest(".window-content")) {
      return
    }

    setIsDragging(true)
    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), window.innerWidth - windowSize.width)
      const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), window.innerHeight - windowSize.height)

      onPositionChange({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, windowSize, onPositionChange])

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute rounded-t-lg overflow-hidden shadow-lg",
        isActive ? "z-40" : "z-30",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
        border: isActive ? "2px solid #0058e0" : "2px solid #7e9fc7",
      }}
      onClick={() => !isActive && onActivate()}
    >
      {/* Window Title Bar */}
      <div
        className={cn(
          "p-1 flex justify-between items-center",
          isActive
            ? "bg-gradient-to-r from-[#2a5ade] to-[#5b9add] text-white"
            : "bg-gradient-to-r from-[#7e9fc7] to-[#a5c6e7] text-gray-700",
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1">
          <img src={title === "My Computer" ? "/icons/my-computer.png" : title === "My Documents" ? "/icons/my-documents.png" : title === "Internet Explorer" ? "/icons/internet-explorer.png" : title === "Recycle Bin" ? "/icons/recycle-bin.png" : "/placeholder.svg"} alt={title} className="w-4 h-4" />
          <span className="text-sm font-semibold truncate">{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="w-6 h-5 bg-[#3d7df7] text-white text-xs flex items-center justify-center rounded-sm hover:bg-[#2d6de7] border border-white">
            _
          </button>
          <button className="w-6 h-5 bg-[#3d7df7] text-white text-xs flex items-center justify-center rounded-sm hover:bg-[#2d6de7] border border-white">
            □
          </button>
          <button className="w-6 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-sm hover:bg-red-600 border border-white"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="window-content bg-white h-[calc(100%-24px)]">{children}</div>
    </div>
  )
}

