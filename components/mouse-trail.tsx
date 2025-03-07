"use client"

import { useState, useEffect } from "react"

interface TrailDot {
  x: number
  y: number
  life: number
  id: number
}

interface MouseTrailProps {
  chaosMode?: boolean
}

export default function MouseTrail({ chaosMode = false }: MouseTrailProps) {
  const [trail, setTrail] = useState<TrailDot[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const addDot = () => {
      setTrail((prev) => [
        ...prev,
        {
          x: mousePos.x,
          y: mousePos.y,
          life: chaosMode ? 30 : 20,
          id: nextId,
        },
      ])
      setNextId((prev) => prev + 1)
    }

    const interval = setInterval(addDot, chaosMode ? 30 : 50)

    return () => clearInterval(interval)
  }, [mousePos, nextId, chaosMode])

  useEffect(() => {
    const updateTrail = () => {
      setTrail((prev) => prev.map((dot) => ({ ...dot, life: dot.life - 1 })).filter((dot) => dot.life > 0))
    }

    const interval = setInterval(updateTrail, 50)

    return () => clearInterval(interval)
  }, [])

  const emojis = chaosMode
    ? ["🤪", "🎉", "🚀", "🔥", "👽", "🤖", "🦄", "🍕", "💥", "🌈", "💩", "👻", "🤡", "👾", "🧠", "👁️"]
    : ["🤪", "🎉", "🚀", "🔥", "👽", "🤖", "🦄", "🍕", "💥", "🌈"]

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((dot) => (
        <div
          key={dot.id}
          className={`absolute text-2xl transform -translate-x-1/2 -translate-y-1/2 select-none ${
            chaosMode ? "animate-spin-slow" : ""
          }`}
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            opacity: dot.life / (chaosMode ? 30 : 20),
            transform: `translate(-50%, -50%) scale(${0.5 + dot.life / (chaosMode ? 30 : 20)})`,
          }}
        >
          {emojis[dot.id % emojis.length]}
        </div>
      ))}
    </div>
  )
}

