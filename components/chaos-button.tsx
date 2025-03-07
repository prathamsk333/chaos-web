"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChaosButtonProps extends React.ComponentProps<typeof Button> {
  runAwayChance?: number
  chaosMode?: boolean
}

export default function ChaosButton({
  children,
  className,
  runAwayChance = 0.5,
  chaosMode = false,
  ...props
}: ChaosButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isShaking, setIsShaking] = useState(false)
  const [rotation, setRotation] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = () => {
    if (Math.random() < (chaosMode ? 0.8 : runAwayChance)) {
      const parentWidth = buttonRef.current?.parentElement?.clientWidth || 300
      const parentHeight = buttonRef.current?.parentElement?.clientHeight || 200
      const buttonWidth = buttonRef.current?.clientWidth || 100
      const buttonHeight = buttonRef.current?.clientHeight || 40

      const maxX = parentWidth - buttonWidth
      const maxY = parentHeight - buttonHeight

      setPosition({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
      })

      if (chaosMode) {
        setRotation(Math.random() * 360)
      }
    } else {
      setIsShaking(true)
    }
  }

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => {
        setIsShaking(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isShaking])

  return (
    <Button
      ref={buttonRef}
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        isShaking && "animate-shake",
        chaosMode && "animate-pulse",
        className,
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
      }}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Button>
  )
}

