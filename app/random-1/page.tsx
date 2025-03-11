"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"
import GlitchText from "@/components/glitch-text"
import ChaosButton from "@/components/chaos-button"

export default function RandomPage1() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      // Reset instead of actually redirecting
      setCountdown(10)
    }
  }, [countdown, router])

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-500 to-orange-500 p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-black/30 backdrop-blur-md rounded-lg p-8 border-2 border-yellow-300 shadow-neon">
        <div className="flex justify-between items-center mb-8">
          <Link href="/home">
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chaos
            </Button>
          </Link>

          <div className="animate-pulse bg-red-600 text-white px-4 py-2 rounded-full flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>WARNING!</span>
          </div>
        </div>

        <GlitchText className="text-4xl font-bold text-white mb-6 text-center">
          SELF-DESTRUCT SEQUENCE INITIATED
        </GlitchText>

        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white text-5xl font-bold animate-pulse-fast">
            {countdown}
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-white text-xl mb-4">This page will self-destruct in {countdown} seconds!</p>
          <p className="text-white/70">(Not really, but it's more fun to pretend)</p>
        </div>

        <div className="flex justify-center space-x-4">
          <ChaosButton onClick={() => setCountdown(10)}>Reset Timer</ChaosButton>

          <ChaosButton variant="destructive" onClick={() => setCountdown(3)}>
            Speed Up!
          </ChaosButton>
        </div>
      </div>
    </main>
  )
}

