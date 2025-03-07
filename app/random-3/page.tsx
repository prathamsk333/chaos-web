"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import ChaosButton from "@/components/chaos-button"
import GlitchText from "@/components/glitch-text"

export default function RandomPage3() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempts((prev) => prev + 1)

    if (password.toLowerCase() === "banana123") {
      setMessage("Correct! But did you really need a password?")
      setShowSecret(true)
    } else if (attempts >= 2) {
      setMessage("Just kidding! The password is 'banana123'. So obvious!")
      setShowSecret(true)
    } else {
      setMessage("Wrong password! Try again... or don't. It doesn't really matter.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chaos
            </Button>
          </Link>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 border-2 border-purple-300 shadow-lg">
          <GlitchText className="text-4xl font-bold text-white mb-6 text-center">TOP SECRET AREA</GlitchText>

          {!showSecret ? (
            <>
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-white text-4xl">🔒</span>
                </div>
                <p className="text-white text-xl mb-2">This area is password protected!</p>
                <p className="text-white/70 italic">(Hint: It's a fruit which is liked by you! sorry a monkey and followed by some numbers)</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter the super secret password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/30 border-purple-300 text-white placeholder:text-white/70"
                  />
                </div>

                {message && <div className="bg-black/30 text-white p-3 rounded-md">{message}</div>}

                <div className="flex justify-center">
                  <ChaosButton type="submit">Submit Password</ChaosButton>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">Congratulations! You've discovered the secret!</h2>

              <p className="text-white mb-6">
                The secret is... there is no secret! You've just wasted precious seconds of your life trying to access
                nothing. Isn't chaos wonderful?
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => setShowSecret(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Go Back
                </Button>

                <ChaosButton onClick={() => router.push("/")}>More Chaos!</ChaosButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

