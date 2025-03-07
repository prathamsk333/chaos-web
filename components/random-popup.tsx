"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RandomPopupProps {
  content: string
  onClose: () => void
  chaosMode?: boolean
}

export default function RandomPopup({ content, onClose, chaosMode = false }: RandomPopupProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
    })

    if (chaosMode) {
      setRotation(Math.random() * 10 - 5)
    }
  }, [chaosMode])

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Higher chance to move the popup when in chaos mode
    if (Math.random() < (chaosMode ? 0.6 : 0.3)) {
      setPosition({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      })

      if (chaosMode) {
        setRotation(Math.random() * 20 - 10)
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleCloseClick}
    >
      <div
        className={`absolute bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow-2xl border-2 border-white max-w-md w-full transition-all duration-300 ease-in-out ${
          chaosMode ? "animate-shake" : "animate-bounce-slow"
        }`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        onClick={handlePopupClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Important Message!</h3>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleCloseClick}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-white mb-6">{content}</div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={handleCloseClick}>
            Close
          </Button>
          <Button className="bg-white text-purple-600 hover:bg-white/90" onClick={handlePopupClick}>
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}

