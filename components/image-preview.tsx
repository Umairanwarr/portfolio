"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface ImagePreviewProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImagePreview({ src, alt, isOpen, onClose }: ImagePreviewProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  )
}