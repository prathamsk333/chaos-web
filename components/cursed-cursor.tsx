"use client"

import { useState, useEffect } from "react"

interface CursedCursorProps {
  active: boolean
}

export default function CursedCursor({ active }: CursedCursorProps) {
  const [randomClicks, setRandomClicks] = useState<{ x: number; y: number; id: number }[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    if (!active) return

    // Random clicks
    const clickInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight

        setRandomClicks((prev) => [...prev, { x, y, id: nextId }])
        setNextId((prev) => prev + 1)

        // Remove click after animation
        setTimeout(() => {
          setRandomClicks((prev) => prev.filter((click) => click.id !== nextId))
        }, 1000)
      }
    }, 2000)

    return () => {
      clearInterval(clickInterval)
    }
  }, [active, nextId])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {randomClicks.map((click) => (
        <div
          key={click.id}
          className="absolute w-8 h-8 animate-ping-once"
          style={{
            left: `${click.x}px`,
            top: `${click.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/30 animate-ping" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">Click!</div>
        </div>
      ))}
    </div>
  )
}

