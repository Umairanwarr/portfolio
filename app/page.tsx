"use client"

import { useState, useRef, useEffect } from "react"
import { Clock } from "@/components/clock"
import { DesktopIcon } from "@/components/desktop-icon"
import { StartMenu } from "@/components/start-menu"
import { DraggableWindow } from "@/components/draggable-window"
import { ExplorerWindow } from "@/components/explorer-window"
import { cn } from "@/lib/utils"

export default function WindowsXPDesktop() {
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [activeWindows, setActiveWindows] = useState<{
    [key: string]: {
      id: string
      title: string
      isActive: boolean
      position: { x: number; y: number }
      size: { width: number; height: number }
    }
  }>({})
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const windowIdCounter = useRef(0)

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen)
  }

  const openWindow = (name: string) => {
    const id = `window-${name}-${windowIdCounter.current++}`

    // Set all other windows as inactive
    const updatedWindows = { ...activeWindows }
    Object.keys(updatedWindows).forEach((key) => {
      updatedWindows[key].isActive = false
    })

    // Add the new window with responsive positioning
    const windowWidth = name === "My Computer" ? 800 : 500
    const windowHeight = name === "My Computer" ? 600 : 400

    // Calculate position based on current viewport
    const maxX = typeof window !== "undefined" ? Math.max(0, window.innerWidth - windowWidth) : 500
    const maxY = typeof window !== "undefined" ? Math.max(0, window.innerHeight - windowHeight) : 300

    updatedWindows[id] = {
      id,
      title: name,
      isActive: true,
      position: {
        x: Math.min(100 + Object.keys(activeWindows).length * 20, maxX),
        y: Math.min(100 + Object.keys(activeWindows).length * 20, maxY),
      },
      size: {
        width: windowWidth,
        height: windowHeight,
      },
    }

    setActiveWindows(updatedWindows)
    setActiveWindowId(id)
  }

  const closeWindow = (id: string) => {
    const updatedWindows = { ...activeWindows }
    delete updatedWindows[id]

    // Set the last window as active if there are any left
    const windowIds = Object.keys(updatedWindows)
    if (windowIds.length > 0) {
      const lastWindowId = windowIds[windowIds.length - 1]
      updatedWindows[lastWindowId].isActive = true
      setActiveWindowId(lastWindowId)
    } else {
      setActiveWindowId(null)
    }

    setActiveWindows(updatedWindows)
  }

  const activateWindow = (id: string) => {
    if (!activeWindows[id]) return

    const updatedWindows = { ...activeWindows }

    // Set all windows as inactive
    Object.keys(updatedWindows).forEach((key) => {
      updatedWindows[key].isActive = false
    })

    // Set the clicked window as active
    updatedWindows[id].isActive = true

    setActiveWindows(updatedWindows)
    setActiveWindowId(id)
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    if (!activeWindows[id]) return

    const updatedWindows = { ...activeWindows }
    updatedWindows[id].position = position
    setActiveWindows(updatedWindows)
  }

  // Close start menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      if (startMenuOpen) {
        setStartMenuOpen(false)
      }
    }

    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [startMenuOpen])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#3a6ea5] select-none">
      {/* Windows XP wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Desktop Icons */}
        <div className="grid grid-cols-1 gap-6 p-4 w-[120px]">
          <DesktopIcon name="My Documents" icon="/icons/my-documents.png" onClick={() => openWindow("My Documents")} />
          <DesktopIcon name="My Computer" icon="/icons/my-computer.png" onClick={() => openWindow("My Computer")} />
          <DesktopIcon
            name="Internet Explorer"
            icon="/icons/internet-explorer.png"
            onClick={() => openWindow("Internet Explorer")}
          />
          <DesktopIcon name="Recycle Bin" icon="/icons/recycle-bin.png" onClick={() => openWindow("Recycle Bin")} />
          
        </div>

        {/* Active Windows */}
        {Object.values(activeWindows).map((window) => (
          <DraggableWindow
            key={window.id}
            id={window.id}
            title={window.title}
            isActive={window.isActive}
            position={window.position}
            size={window.size}
            onClose={() => closeWindow(window.id)}
            onActivate={() => activateWindow(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
          >
            {window.title === "My Computer" ? (
              <ExplorerWindow
                title={window.title}
                path="C:\"
                onClose={() => closeWindow(window.id)}
                isActive={window.isActive}
                onActivate={() => activateWindow(window.id)}
              />
            ) : (
              <div className="p-4 bg-[#ece9d8] h-full">
                <p>This is the {window.title} window content.</p>
              </div>
            )}
          </DraggableWindow>
        ))}

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#245edc] flex items-center pl-0 pr-1 border-t border-[#0058e0] z-50">
          {/* Start Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleStartMenu()
            }}
            className={cn(
              "h-[28px] px-2 rounded-sm flex items-center gap-1 font-bold text-white",
              startMenuOpen
                ? "bg-[#3a6ea5] shadow-inner"
                : "bg-gradient-to-b from-[#3c993c] to-[#2d7d2d] hover:from-[#4ca356] hover:to-[#3d8d3d]",
            )}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img src="/icons/xp.png" alt="XP" className="w-4 h-4" />
            </div>
            <span>start</span>
          </button>

          {/* Open Windows in Taskbar */}
          <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto">
            {Object.values(activeWindows).map((window) => (
              <button
                key={window.id}
                className={cn(
                  "h-[24px] px-2 rounded-sm flex items-center gap-1 text-sm min-w-[120px] max-w-[200px] truncate drop-shadow-[1px_1px_1px_rgba(255,255,255,0.7)] text-stroke text-stroke-[1px] text-stroke-gray-500 text-white/80",
                  window.isActive ? "bg-[#3d7df7] shadow-inner" : "bg-[#3a6ea5] hover:bg-[#4a7eb5]",
                )}
                onClick={() => activateWindow(window.id)}
              >
                <img src={window.title === "My Computer" ? "/icons/my-computer.png" : window.title === "My Documents" ? "/icons/my-documents.png" : window.title === "Internet Explorer" ? "/icons/internet-explorer.png" : window.title === "Recycle Bin" ? "/icons/recycle-bin.png" : "/placeholder.svg"} alt={window.title} className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{window.title}</span>
              </button>
            ))}
          </div>

          {/* System Tray */}
          <div className="h-[24px] bg-[#0f7bec] rounded-sm flex items-center px-2 text-white">
            <Clock />
          </div>
        </div>

        {/* Start Menu */}
        {startMenuOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <StartMenu onClose={() => setStartMenuOpen(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

