"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  glitchInterval?: number
  intensity?: "normal" | "high"
}

export default function GlitchText({
  children,
  className,
  glitchInterval = 3000,
  intensity = "normal",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(
          () => {
            setIsGlitching(false)
          },
          intensity === "high" ? 800 : 500,
        )
      },
      intensity === "high" ? glitchInterval / 2 : glitchInterval,
    )

    return () => clearInterval(interval)
  }, [glitchInterval, intensity])

  return (
    <div className={cn("relative", isGlitching && "animate-glitch", className)}>
      <span className="relative z-10">{children}</span>

      {isGlitching && (
        <>
          <span
            className={`absolute top-0 left-0 z-0 text-red-500 ${
              intensity === "high" ? "animate-glitch-1-intense" : "animate-glitch-1"
            } opacity-70`}
          >
            {children}
          </span>
          <span
            className={`absolute top-0 left-0 z-0 text-blue-500 ${
              intensity === "high" ? "animate-glitch-2-intense" : "animate-glitch-2"
            } opacity-70`}
          >
            {children}
          </span>
          {intensity === "high" && (
            <span className="absolute top-0 left-0 z-0 text-green-500 animate-glitch-3 opacity-70">{children}</span>
          )}
        </>
      )}
    </div>
  )
}

