"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  LogOut,
  Settings,
  HelpCircle,
  Search,
  Monitor,
  FileText,
  Image,
  Music,
  Mail,
  Globe,
  MessageSquare,
  Clock,
  Play,
  Power,
} from "lucide-react"

interface StartMenuProps {
  onClose: () => void
}

// Update the Start Menu to match the classic Windows XP style
export function StartMenu({ onClose }: StartMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems = [
    {
      name: "Internet Explorer",
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      description: "Connect to the Internet",
    },
    { name: "E-mail", icon: <Mail className="w-8 h-8 text-blue-500" />, description: "Outlook Express" },
    {
      name: "Windows Media Player",
      icon: <Music className="w-8 h-8 text-blue-500" />,
      description: "Play digital media",
    },
    {
      name: "Windows Messenger",
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      description: "Chat with friends online",
    },
    {
      name: "Tour Windows XP",
      icon: <HelpCircle className="w-8 h-8 text-blue-500" />,
      description: "Take a tour of Windows XP",
    },
    { name: "My Documents", icon: <FileText className="w-8 h-8 text-blue-500" />, description: "My Documents" },
    {
      name: "My Recent Documents",
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      description: "Access recently opened documents",
    },
    { name: "My Pictures", icon: <Image className="w-8 h-8 text-blue-500" />, description: "My Pictures" },
    { name: "My Music", icon: <Music className="w-8 h-8 text-blue-500" />, description: "My Music" },
    { name: "My Computer", icon: <Monitor className="w-8 h-8 text-blue-500" />, description: "View computer contents" },
    {
      name: "Control Panel",
      icon: <Settings className="w-8 h-8 text-blue-500" />,
      description: "Change computer settings",
    },
    {
      name: "Help and Support",
      icon: <HelpCircle className="w-8 h-8 text-blue-500" />,
      description: "Get help with Windows XP",
    },
    { name: "Search", icon: <Search className="w-8 h-8 text-blue-500" />, description: "Search for files or folders" },
    { name: "Run...", icon: <Play className="w-8 h-8 text-blue-500" />, description: "Run a program" },
  ]

  // Close the menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50" onClick={handleBackdropClick}>
      <div className="absolute bottom-[30px] left-0 w-[320px] bg-white rounded-tr-lg overflow-hidden shadow-xl border-2 border-[#0058e0]">
        {/* User info section */}
        <div className="h-[60px] bg-gradient-to-r from-[#2a5ade] to-[#5b9add] flex items-center p-2">
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-700" />
          </div>
          <div className="ml-2 text-white font-bold">Umair Anwar</div>
        </div>

        {/* Menu content */}
        <div className="flex">
          {/* Left column - menu items */}
          <div className="w-3/5 bg-white p-2">
            <div className="border-b border-gray-300 pb-2 mb-2">
              <div className="text-xs font-bold text-gray-500 mb-1">Programs</div>
              {menuItems.slice(0, 6).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center p-1 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
                  onMouseEnter={() => setHoveredItem(item.name)}
                >
                  <div className="w-8 h-8 mr-2">{item.icon}</div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>

            <div>
              {menuItems.slice(6).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center p-1 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
                  onMouseEnter={() => setHoveredItem(item.name)}
                >
                  <div className="w-8 h-8 mr-2">{item.icon}</div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - recently used programs */}
          <div className="w-2/5 bg-[#d3e5fa] p-2">
            <div className="text-xs font-bold text-gray-500 mb-2">Recently Used Programs</div>

            {hoveredItem && (
              <div className="mt-4 p-2">
                <div className="text-sm font-bold">{hoveredItem}</div>
                <div className="text-xs text-gray-600">
                  {menuItems.find((item) => item.name === hoveredItem)?.description}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-[40px] bg-[#c3c3c3] flex items-center justify-end p-2">
          <button
            className="flex items-center bg-[#e8f1fc] hover:bg-[#d0e5ff] px-2 py-1 rounded text-sm"
            onClick={onClose}
          >
            <LogOut className="w-4 h-4 mr-1" />
            <span>Log Off</span>
          </button>
          <button
            className="flex items-center bg-[#e8f1fc] hover:bg-[#d0e5ff] px-2 py-1 rounded text-sm ml-2"
            onClick={onClose}
          >
            <Power className="w-4 h-4 mr-1" />
            <span>Turn Off Computer</span>
          </button>
        </div>
      </div>
    </div>
  )
}

