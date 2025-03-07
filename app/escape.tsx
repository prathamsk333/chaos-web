"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EscapePage() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Calm Zone</h1>

        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-500 text-4xl">😌</span>
          </div>
          <p className="text-gray-600 mb-2">You've escaped the chaos. Take a deep breath.</p>
          <p className="text-sm text-gray-500">Enjoying the peace for {seconds} seconds...</p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Sometimes we all need a break from the chaos. This page is intentionally calm and soothing.
          </p>

          <div className="pt-4">
            <Link href="/">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Chaos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

