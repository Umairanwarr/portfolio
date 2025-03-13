"use client"

import type React from "react"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Folder,
  Grid,
  Plus,
  Globe,
  Share2,
  File,
  Computer,
  Network,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { XPDialog } from "./xp-dialog"
import { ImagePreview } from "./image-preview"

interface ExplorerWindowProps {
  title: string
  path: string
  onClose: () => void
  isActive: boolean
  onActivate: () => void
}

interface FolderItem {
  name: string
  type: "folder" | "file"
  icon?: React.ReactNode
}

export function ExplorerWindow({ title, path, onClose, isActive, onActivate }: ExplorerWindowProps) {
  const [currentPath, setCurrentPath] = useState(path)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showAboutDialog, setShowAboutDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [showFirstBusDialog, setShowFirstBusDialog] = useState(false)
  const [showRetailVistaDialog, setShowRetailVistaDialog] = useState(false)
  const [showLondonConsultantsDialog, setShowLondonConsultantsDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  // Simulate folder structure
  const folderContents: { [key: string]: FolderItem[] } = {
    "C:\\": [
      { name: "About.txt", type: "file", icon: <img src="/icons/txt.png" alt="txt" className="w-12 h-12" /> },
      { name: "Contact.txt", type: "file", icon: <img src="/icons/txt.png" alt="Folder" className="w-12 h-12" /> },
      { name: "Work", type: "folder", icon: <img src="/icons/folder.png" alt="Folder" className="w-12 h-12" /> },
    ],
    "C:\\Work": [
      { name: "FirstBus: Easy Transport for Students.txt", type: "file", icon: <img src="/icons/txt.png" alt="txt" className="w-12 h-12" /> },
      { name: "RetailVista - AI Powered Shoplifting Detetction System.txt", type: "file", icon: <img src="/icons/txt.png" alt="Folder" className="w-12 h-12" /> },
      { name: "London-Consultants.txt", type: "file", icon: <img src="/icons/txt.png" alt="txt" className="w-12 h-12" /> },
      
    ],
    
  }

  const currentContents = folderContents[currentPath] || []

  const navigateToFolder = (folderName: string) => {
    const newPath = currentPath === "C:\\" ? `${currentPath}${folderName}` : `${currentPath}\\${folderName}`
    setCurrentPath(newPath)
  }

  const navigateBack = () => {
    const lastBackslash = currentPath.lastIndexOf("\\")
    if (lastBackslash > 0) {
      const newPath = currentPath.substring(0, lastBackslash)
      if (newPath === "C:") {
        setCurrentPath("C:\\")
      } else {
        setCurrentPath(newPath)
      }
    }
  }

  return (
    <div className="flex flex-col bg-white w-full h-full overflow-hidden" onClick={() => !isActive && onActivate()}>
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-gray-400 text-sm">
        <div className="space-x-4">
          <button className="hover:underline">File</button>
          <button className="hover:underline">Edit</button>
          <button className="hover:underline">View</button>
          <button className="hover:underline">Favorites</button>
          <button className="hover:underline">Tools</button>
          <button className="hover:underline">Help</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-gray-400 gap-2">
        <button onClick={navigateBack} className="flex items-center px-2 py-1 hover:bg-blue-100 rounded">
          <img src="/icons/back.png" alt="Back" className="w-4 h-4 mr-1" />
          Back
        </button>
        <button className="flex items-center px-2 py-1 hover:bg-blue-100 rounded">
          <img src="/icons/back.png" alt="Forward" className="w-4 h-4 mr-1 rotate-180" />
          
        </button>
       
        <button className="flex items-center px-2 py-1 hover:bg-blue-100 rounded">
          <img src="/icons/search.png" alt="Search" className="w-4 h-4 mr-1" />
          Search
        </button>
        <button className="flex items-center px-2 py-1 hover:bg-blue-100 rounded">
          <img src="/icons/folder.png" alt="Folder" className="w-4 h-4" />
          Folders
        </button>
        
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-gray-400">
        <span className="text-sm mr-2">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-1 text-sm">{currentPath}</div>
        <button className="px-2 py-1 ml-2 border border-gray-400 text-sm">Go</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#ece9d8] border-r border-gray-400 flex-shrink-0 overflow-y-auto">
          <div className="p-2">
            <div className="bg-white border border-gray-300 rounded p-2 mb-2">
              <h3 className="font-bold text-blue-800 mb-2">File and Folder Tasks</h3>
              <div className="space-y-2">
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Plus className="w-4 h-4 mr-1" />
                  Make a new folder
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Globe className="w-4 h-4 mr-1" />
                  Publish this folder
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share this folder
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded p-2">
              <h3 className="font-bold text-blue-800 mb-2">Other Places</h3>
              <div className="space-y-2">
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <File className="w-4 h-4 mr-1" />
                  Documents
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Folder className="w-4 h-4 mr-1" />
                  My Documents
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Folder className="w-4 h-4 mr-1" />
                  Shared Documents
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Computer className="w-4 h-4 mr-1" />
                  My Computer
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:underline">
                  <Network className="w-4 h-4 mr-1" />
                  My Network Places
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
            {currentContents.map((item) => (
              <button
                key={item.name}
                className={cn(
                  "flex flex-col items-center p-4 rounded hover:bg-blue-50",
                  selectedItem === item.name && "bg-blue-100",
                )}
                onClick={() => {
                  setSelectedItem(item.name)
                  if (item.type === "folder") {
                    navigateToFolder(item.name)
                  } else if (item.name === "About.txt") {
                    setShowAboutDialog(true)
                  } else if (item.name === "Contact.txt") {
                    setShowContactDialog(true)
                  } else if (item.name === "FirstBus: Easy Transport for Students.txt") {
                    setShowFirstBusDialog(true)
                  } else if (item.name === "RetailVista - AI Powered Shoplifting Detetction System.txt") {
                    setShowRetailVistaDialog(true)
                  } else if (item.name === "London-Consultants.txt") {
                    setShowLondonConsultantsDialog(true)
                  }
                }}
              >
                {item.icon}
                <span className="text-sm mt-2 text-center">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* About Dialog */}
      <XPDialog
        title="About - Notepad"
        isOpen={showAboutDialog}
        onClose={() => setShowAboutDialog(false)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">UMAIR ANWAR</h2>
          <p>COMBINING DESIGN EXPERTISE WITH FULL STACK DEVELOPMENT.</p>
          <p>SPECIALIZED IN CRAFTING EXPERIENCE-DRIVEN WEBSITES THAT STAND OUT THROUGH BOLD DESIGN, SEAMLESS MOTION, AND INNOVATIVE FUNCTIONALITY.</p>
          <p>CURRENTLY WORKING AS A FREELANCER ON OCCASSION.</p>
        </div>
      </XPDialog>

      {/* Contact Dialog */}
      <XPDialog
        title="Contact - Notepad"
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Get in Touch</h2>
          <p>Email: umairanwrr@gmail.com</p>
          <br />
         
          <a href="https://www.linkedin.com/in/umair-anwar-365986317" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Linkedin</a>
        </div>
      </XPDialog>

      {/* Project Dialogs */}
      <XPDialog
        title="FirstBus - Notepad"
        isOpen={showFirstBusDialog}
        onClose={() => setShowFirstBusDialog(false)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">FirstBus: Easy Transport for Students</h2>
          <p>This Flutter app, powered by Firebase, helps students track their school bus in real-time. It shows the live location of the bus, helps students find the nearest stop, and sends notifications when the bus is arriving. The app also includes a chat feature for students and drivers to communicate.</p>
          <p>Tech Used:</p>
          <ul className="list-disc pl-5">
            <li>Flutter</li>
            <li>Dart</li>
            <li>Firebase</li>
          </ul>
          <br />
          <a href="https://drive.google.com/file/d/1bWunvvWKwG31CA5MXthiZuMrSTCx1VYA/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Download APK</a>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-h-[400px] overflow-y-auto">
            <img src="/projects/bus1.png" alt="FirstBus Screenshot 1" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/bus1.png", alt: "FirstBus Screenshot 1" })} />
            <img src="/projects/bus2.png" alt="FirstBus Screenshot 2" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/bus2.png", alt: "FirstBus Screenshot 2" })} />
            <img src="/projects/bus3.png" alt="FirstBus Screenshot 3" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/bus3.png", alt: "FirstBus Screenshot 3" })} />
            <img src="/projects/bus4.png" alt="FirstBus Screenshot 4" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/bus4.png", alt: "FirstBus Screenshot 4" })} />
          </div>
        </div>
      </XPDialog>

      <XPDialog
        title="RetailVista - Notepad"
        isOpen={showRetailVistaDialog}
        onClose={() => setShowRetailVistaDialog(false)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">RetailVista - AI Powered Shoplifting Detection System</h2>
          <p>Smart shoplifting detection and AR navigation system is built using React and Django. It helps store owners detect suspicious activity in real-time and guide customers to find products easily using AR maps. The system integrates AI-powered surveillance to prevent theft and an augmented reality (AR) feature to improve the shopping experience.</p>
          <p>Tech Used:</p>
          <ul className="list-disc pl-5">
          <li>React JS</li>
          <li>Django</li>
            <li>Computer Vision</li>
            <li>Machine Learning</li>
            <li>Real-time Analytics</li>
          </ul>
          <br />
          <p>Under Development</p>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-h-[400px] overflow-y-auto">
            <img src="/projects/retail1.png" alt="RetailVista Screenshot 1" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/retail1.png", alt: "RetailVista Screenshot 1" })} />
            <img src="/projects/retail2.png" alt="RetailVista Screenshot 2" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/retail2.png", alt: "RetailVista Screenshot 2" })} />
            <img src="/projects/retail3.png" alt="RetailVista Screenshot 3" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/retail3.png", alt: "RetailVista Screenshot 3" })} />
        
          </div>
        </div>
      </XPDialog>

      <XPDialog
        title="London-Consultants - Notepad"
        isOpen={showLondonConsultantsDialog}
        onClose={() => setShowLondonConsultantsDialog(false)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">London-Consultants</h2>
          <p>Simple and user-friendly visa consultation website built with Laravel. It allows users to explore visa services for different countries and book an appointment if they need consultation. The platform is designed to provide clear information and an easy booking process.</p>
          <p>Tech Used:</p>
          <ul className="list-disc pl-5">
            <li>Laravel</li>
            <li>PHP</li>
          </ul>
          <br />
          <a href="https://london-consultants.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Visit Website</a>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-h-[400px] overflow-y-auto">
            <img src="/projects/london1.png" alt="London-Consultants Screenshot 1" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/london1.png", alt: "London-Consultants Screenshot 1" })} />
            <img src="/projects/london2.png" alt="London-Consultants Screenshot 2" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/london2.png", alt: "London-Consultants Screenshot 2" })} />
            <img src="/projects/london3.png" alt="London-Consultants Screenshot 3" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/london3.png", alt: "London-Consultants Screenshot 3" })} />
            <img src="/projects/london4.png" alt="London-Consultants Screenshot 4" className="w-full h-auto rounded-lg shadow-md cursor-pointer" onClick={() => setSelectedImage({ src: "/projects/london4.png", alt: "London-Consultants Screenshot 4" })} />
          </div>
        </div>
      </XPDialog>

      {/* Image Preview */}
      <ImagePreview
        src={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}

