"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Volume2, VolumeX } from "lucide-react"

export default function ScreamingButton() {
  const [position, setPosition] = useState({ x: 200, y: 0 })
  const [clickCount, setClickCount] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [buttonSize, setButtonSize] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/scream.mp3")
    audioRef.current.volume = volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1)

    // Play scream sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    // Increase volume with each click (max 1.0)
    setVolume((prev) => Math.min(prev + 0.1, 1.0))

    // Increase button size
    setButtonSize((prev) => Math.min(prev + 0.2, 2.5))

    // Move button to random position after 3 clicks
    if (clickCount >= 2 && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const buttonWidth = 200 * buttonSize
      const buttonHeight = 60 * buttonSize

      const maxX = containerWidth - buttonWidth
      const maxY = containerHeight - buttonHeight

      setPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      })
    }
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-r from-red-500 to-orange-500 overflow-hidden flex flex-col"
    >
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="bg-white/20 border-white text-white hover:bg-white/30">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chaos
          </Button>
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/20 border-white text-white hover:bg-white/30"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center mb-40">
          <h1 className="text-4xl font-bold text-white mb-8">The Screaming Button</h1>
          <p className="text-white mb-4">
            Warning: This button screams when clicked. Each click makes it louder and more unpredictable.
          </p>
          <p className="text-white text-sm mb-8">
            Current volume: {Math.round(volume * 100)}% | Clicks: {clickCount}
          </p>
        </div>
      </div>

      <div
        className="absolute transition-all duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${buttonSize})`,
          transformOrigin: "center",
        }}
      >
        <Button
          className={`bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-lg shadow-lg ${
            clickCount >= 10 ? "animate-bounce-fast" : clickCount >= 5 ? "animate-shake" : ""
          }`}
          onClick={handleButtonClick}
        >
          {clickCount === 0
            ? "Click Me"
            : clickCount < 3
              ? "AAAH!"
              : clickCount < 6
                ? "AAAAAAHHH!!"
                : clickCount < 10
                  ? "MAKE IT STOP!!!"
                  : "AAAAAAAAAAAAHHHHH!!!!"}
        </Button>
      </div>

      {clickCount >= 15 && (
        <div className="absolute inset-0 bg-red-600/50 flex items-center justify-center z-20 animate-pulse">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">CONGRATULATIONS!</h2>
            <p className="mb-4">
              You've successfully tortured a button until it lost its mind. Are you happy with yourself? IS THIS WHAT
              YOU WANTED?!
            </p>
            <Link href="/">
              <Button>Escape the Screams</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

