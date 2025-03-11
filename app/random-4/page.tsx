"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smile, Frown, Meh } from "lucide-react"
import GlitchText from "@/components/glitch-text"
import ChaosButton from "@/components/chaos-button"

export default function RandomPage4() {
  const [orientation, setOrientation] = useState<"normal" | "upsidedown" | "sideways">("normal")
  const [mood, setMood] = useState<"happy" | "sad" | "neutral">("neutral")

  useEffect(() => {
    const interval = setInterval(() => {
      const orientations: Array<"normal" | "upsidedown" | "sideways"> = ["normal", "upsidedown", "sideways"]
      setOrientation(orientations[Math.floor(Math.random() * orientations.length)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getOrientationStyle = () => {
    switch (orientation) {
      case "upsidedown":
        return { transform: "rotate(180deg)" }
      case "sideways":
        return { transform: "rotate(90deg)" }
      default:
        return {}
    }
  }

  const getMoodIcon = () => {
    switch (mood) {
      case "happy":
        return <Smile className="h-8 w-8 text-yellow-400" />
      case "sad":
        return <Frown className="h-8 w-8 text-blue-400" />
      default:
        return <Meh className="h-8 w-8 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full transition-transform duration-1000 ease-in-out" style={getOrientationStyle()}>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 border-2 border-yellow-300 shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <Link href="/home">
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Chaos
              </Button>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-white">Current mood:</span>
              {getMoodIcon()}
            </div>
          </div>

          <GlitchText className="text-4xl font-bold text-white mb-6 text-center">UPSIDE DOWN & SIDEWAYS</GlitchText>

          <div className="text-center mb-8">
            <p className="text-white text-xl mb-4">This page keeps changing orientation!</p>
            <p className="text-white/70">
              Current orientation: <span className="font-bold">{orientation}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ChaosButton onClick={() => setOrientation("normal")} className="bg-green-500 hover:bg-green-600">
              Normal
            </ChaosButton>

            <ChaosButton onClick={() => setOrientation("upsidedown")} className="bg-purple-500 hover:bg-purple-600">
              Upside Down
            </ChaosButton>

            <ChaosButton onClick={() => setOrientation("sideways")} className="bg-blue-500 hover:bg-blue-600">
              Sideways
            </ChaosButton>
          </div>

          <div className="bg-black/30 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4 text-center">How are you feeling?</h3>
            <p className="mb-4 text-center">The chaos can affect your mood. How are you feeling right now?</p>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="border-yellow-300 text-white hover:bg-yellow-500/30"
                onClick={() => setMood("happy")}
              >
                <Smile className="mr-2 h-4 w-4" />
                Happy
              </Button>

              <Button
                variant="outline"
                className="border-gray-300 text-white hover:bg-gray-500/30"
                onClick={() => setMood("neutral")}
              >
                <Meh className="mr-2 h-4 w-4" />
                Neutral
              </Button>

              <Button
                variant="outline"
                className="border-blue-300 text-white hover:bg-blue-500/30"
                onClick={() => setMood("sad")}
              >
                <Frown className="mr-2 h-4 w-4" />
                Sad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

