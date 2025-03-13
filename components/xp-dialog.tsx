"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

interface XPDialogProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function XPDialog({ title, isOpen, onClose, children, className }: XPDialogProps) {
  if (!isOpen) return null

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect()
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      })
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    
    setIsDragging(true)
    const rect = dialogRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), window.innerWidth - (dialogRef.current?.offsetWidth || 0))
      const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), window.innerHeight - (dialogRef.current?.offsetHeight || 0))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0" onClick={onClose} />
      <div
        ref={dialogRef}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        className={cn(
          "bg-[#ece9d8] rounded-lg shadow-xl border-2 border-[#0058e0] overflow-hidden",
          title.includes("About") || title.includes("Contact") ? "w-[400px] max-w-[90vw]" : "w-[600px] max-w-[90vw]",
          isDragging && "cursor-grabbing",
          className
        )}
      >
        {/* Title Bar */}
        <div 
          className="bg-gradient-to-r from-[#2a5ade] to-[#5b9add] p-0.5 flex justify-between items-center cursor-grab"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-0.5 px-1">
            <img src="/icons/txt.png" alt="txt" className="w-4 h-4" />
            <span className="text-sm font-semibold text-white truncate">{title}</span>
          </div>
          <div className="flex gap-0.5 px-0.5">
            <button
              className="w-5 h-4 bg-[#3d7df7] text-white text-xs flex items-center justify-center rounded-sm hover:bg-[#2d6de7] border border-white"
            >
              _
            </button>
            <button
              className="w-5 h-4 bg-[#3d7df7] text-white text-xs flex items-center justify-center rounded-sm hover:bg-[#2d6de7] border border-white"
            >
              □
            </button>
            <button
              className="w-5 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-sm hover:bg-red-600 border border-white"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 bg-white">{children}</div>
      </div>
    </div>
  )
}