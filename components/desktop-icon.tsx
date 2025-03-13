"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface DesktopIconProps {
  name: string
  icon: string
  onClick: () => void
}

export function DesktopIcon({ name, icon, onClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    if (['Recycle Bin', 'My Documents', 'Internet Explorer'].includes(name)) return;
    setSelected(true);
    setTimeout(() => {
      onClick();
      setSelected(false);
    }, 300);
  }

  return (
    <div className="flex flex-col items-center justify-center p-1 cursor-pointer w-[70px]" onClick={handleClick}>
      <div
        className={cn(
          "w-16 h-16 flex items-center justify-center",
          selected && "bg-[#316ac5]/40 outline outline-1 outline-white",
        )}
      >
        {/* Use placeholder images that look like the Windows XP icons */}
        <img
          src={icon || "/placeholder.svg?height=32&width=32"}
          alt={name}
          className="w-10 h-10"
          onError={(e) => {
            // Fallback for icons that might not load
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=32&width=32"
          }}
        />
      </div>
      <div
        className={cn(
          "mt-1 text-center text-xs font-normal px-1 max-w-[70px] text-white",
          selected && "bg-[#316ac5]/40",
        )}
      >
        <span className="drop-shadow-[1px_1px_1px_rgba(255,255,255,0.7)] text-stroke text-stroke-[1px] text-stroke-gray-500 text-white/80">{name}</span>
      </div>
    </div>
  )
}

