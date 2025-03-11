"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skull } from "lucide-react"
import GlitchText from "@/components/glitch-text"

export default function HackedPage() {
  const [countdown, setCountdown] = useState(5)
  const [showJoke, setShowJoke] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowJoke(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {!showJoke ? (
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 animate-pulse">
            <Skull className="h-24 w-24 text-red-500 mx-auto" />
          </div>

          <GlitchText className="text-5xl font-bold text-red-500 mb-6" intensity="high">
            YOU'VE BEEN HACKED!
          </GlitchText>

          <div className="space-y-4 mb-8">
            <p className="text-red-500 text-xl animate-glitch">All your files are being encrypted...</p>
            <p className="text-red-500 text-xl animate-glitch">Your passwords are being stolen...</p>
            <p className="text-red-500 text-xl animate-glitch">Your browser history is being uploaded...</p>
          </div>

          <div className="text-white text-2xl font-mono mb-8 animate-pulse">Destruction in: {countdown} seconds</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <Button variant="destructive" className="animate-shake" disabled>
              Pay Ransom
            </Button>
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-950 animate-shake" disabled>
              Format Computer
            </Button>
          </div>

          <div className="mt-12 text-xs text-gray-600 animate-pulse">Initializing system destruction...</div>
        </div>
      ) : (
        <div className="max-w-md w-full bg-white rounded-lg p-8 text-center animate-bounce-slow">
          <h2 className="text-3xl font-bold mb-6">Just Kidding!</h2>
          <p className="text-lg mb-6">
            But you should probably go outside and touch some grass. You've been on this chaotic website for way too
            long!
          </p>
          <p className="text-sm text-gray-500 mb-8">Your computer is fine. Probably.</p>
          <Link href="/home">
            <Button>Back to Chaos</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

