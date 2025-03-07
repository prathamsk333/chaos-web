"use client"

import { Progress } from "@/components/ui/progress"

interface FakeLoaderProps {
  value: number
  chaosMode?: boolean
}

export default function FakeLoader({ value, chaosMode = false }: FakeLoaderProps) {
  return (
    <div className="w-full">
      <Progress
        value={value}
        className={`h-3 bg-white/30 ${chaosMode ? "animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-gradient-x" : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"}`}
      />
      <div className="flex justify-between mt-1 text-xs text-white/70">
        <span>0%</span>
        <span>{Math.round(value)}%</span>
        <span>100%</span>
      </div>
    </div>
  )
}

