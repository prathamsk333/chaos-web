"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Key } from "lucide-react"
import { useAchievements } from "@/lib/use-achievements"

export default function DarkRoom() {
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [foundKey, setFoundKey] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { unlockAchievement } = useAchievements()

  // Hidden password locations
  const passwordHints = [
    { x: 75, y: 25, hint: "L" },
    { x: 20, y: 80, hint: "I" },
    { x: 85, y: 65, hint: "G" },
    { x: 30, y: 15, hint: "H" },
    { x: 50, y: 90, hint: "T" },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.toLowerCase() === "light") {
      setMessage("You found the light! Congratulations!")
      setShowSuccess(true)
      unlockAchievement("darkRoom")

      // Redirect after 5 seconds
      setTimeout(() => {
        router.push("/home")
      }, 5000)
    } else {
      setMessage("That's not the password. Keep searching in the darkness...")
    }
  }

  const isNearPasswordHint = (hint: { x: number; y: number }) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - hint.x, 2) + Math.pow(mousePosition.y - hint.y, 2))
    return distance < 10
  }

  const isNearKey = () => {
    const keyPosition = { x: 60, y: 40 }
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - keyPosition.x, 2) + Math.pow(mousePosition.y - keyPosition.y, 2),
    )
    return distance < 15
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {!showSuccess ? (
        <>
          {/* Torch effect */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 40px 20px rgba(255,255,200,0.3)",
            }}
          />

          {/* Password hints */}
          {passwordHints.map((hint, index) => (
            <div
              key={index}
              className={`absolute text-2xl font-bold transition-opacity duration-300 ${
                isNearPasswordHint(hint) ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${hint.x}%`,
                top: `${hint.y}%`,
                color: "#ffcc00",
                textShadow: "0 0 5px rgba(255,204,0,0.8)",
              }}
            >
              {hint.hint}
            </div>
          ))}

          {/* Key */}
          {!foundKey && (
            <div
              className={`absolute transition-opacity duration-300 cursor-pointer ${
                isNearKey() ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: "80%",
                top: "40%",
                color: "#ffcc00",
              }}
              onClick={() => setFoundKey(true)}
            >
              <Key className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
          )}

          {/* Password form */}
          <div className="z-10 bg-black/80 p-6 rounded-lg border border-gray-800 max-w-md w-full mx-4">
            <h2 className="text-xl text-white mb-4 text-center">
              {foundKey
                ? "You found the key! Now enter the password..."
                : "Find the key and the password in the darkness..."}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter the password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
                disabled={!foundKey}
              />

              {message && <div className="bg-gray-900 text-white p-3 rounded-md text-center">{message}</div>}

              <div className="flex justify-center">
                <Button type="submit" disabled={!foundKey} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Submit
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Link href="/home">
                <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Give Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-gray-500 text-sm">Move your cursor to light the way...</div>
        </>
      ) : (
        <div className="z-10 bg-yellow-400 p-8 rounded-lg max-w-md w-full mx-4 animate-pulse-slow">
          <h2 className="text-3xl font-bold text-black mb-4 text-center">YOU FOUND THE LIGHT! 🎉</h2>
          <p className="text-black text-center mb-6">
            Congratulations! You've successfully navigated the darkness and found the password. Your eyes must be really
            good... or you just got lucky. Either way, you win nothing!
          </p>
          <p className="text-black text-center text-sm mb-4">Redirecting you back to chaos in a few seconds...</p>
          <div className="flex justify-center">
            <Link href="/home">
              <Button className="bg-black hover:bg-gray-800 text-white">Return to Chaos Now</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

