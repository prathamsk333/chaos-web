"use client"

import { useState, useEffect, useCallback } from "react"

type Achievement = "survive30" | "survive60" | "click5" | "click10" | "popup" | "chaosMode" | "darkRoom" | "captcha"

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Load achievements from localStorage on mount
  useEffect(() => {
    const savedAchievements = localStorage.getItem("chaos-achievements")
    if (savedAchievements) {
      try {
        setAchievements(JSON.parse(savedAchievements))
      } catch (e) {
        console.error("Failed to parse achievements", e)
      }
    }
  }, [])

  // Save achievements to localStorage when they change
  useEffect(() => {
    if (achievements.length > 0) {
      localStorage.setItem("chaos-achievements", JSON.stringify(achievements))
    }
  }, [achievements])

  const unlockAchievement = useCallback((achievement: Achievement) => {
    setAchievements((prev) => {
      if (prev.includes(achievement)) return prev
      return [...prev, achievement]
    })
  }, [])

  return { achievements, unlockAchievement }
}

