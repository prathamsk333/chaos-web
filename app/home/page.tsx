"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Zap, AlertTriangle, Sparkles, ArrowRight, Bomb, Skull } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChaosButton from "@/components/chaos-button"
import GlitchText from "@/components/glitch-text"
import MouseTrail from "@/components/mouse-trail"
import RandomPopup from "@/components/random-popup"
import FakeLoader from "@/components/fake-loader"
import CursedCursor from "@/components/cursed-cursor"
import { useAchievements } from "@/lib/use-achievements"

const randomPages = ["/random-1", "/random-2", "/random-3", "/random-4", "/captcha", "/dark-room", "/hacked"]

export default function Home() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [survivalTime, setSurvivalTime] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [isReverseScroll, setIsReverseScroll] = useState(false)
  const [chaosMode, setChaosMode] = useState(false)
  const [keySequence, setKeySequence] = useState<string[]>([])
  const { achievements, unlockAchievement } = useAchievements()

  // Random emojis
  const emojis = ["🤪", "🎉", "🚀", "🔥", "👽", "🤖", "🦄", "🍕", "💥", "🌈"]
  const [randomEmojis, setRandomEmojis] = useState<string[]>([])

  // Fake loading bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return Math.max(90, prev - Math.random() * 10)
        return prev + Math.random() * 5
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Survival timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSurvivalTime((prev) => {
        const newTime = prev + 1
        if (newTime === 30) unlockAchievement("survive30")
        if (newTime === 60) unlockAchievement("survive60")
        return newTime
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [unlockAchievement])

  // Random emoji generator
  useEffect(() => {
    const interval = setInterval(() => {
      const newEmojis = Array.from({ length: 5 }, () => emojis[Math.floor(Math.random() * emojis.length)])
      setRandomEmojis(newEmojis)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Random scroll direction
  useEffect(() => {
    const interval = setInterval(() => {
      setIsReverseScroll((prev) => (Math.random() > 0.7 ? !prev : prev))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Handle scroll direction
  useEffect(() => {
    if (!isReverseScroll) return

    const handleWheel = (e: WheelEvent) => {
      window.scrollBy(0, -e.deltaY)
      e.preventDefault()
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [isReverseScroll])

  // Random popups
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const messages = [
          "Are you sure you want to continue?",
          "Your computer has been infected with FUN!",
          "ERROR 404: Sanity not found",
          "Congratulations! You've won absolutely nothing!",
          "This website will self-destruct in 10 seconds... just kidding!",
          "Warning: Excessive exposure to chaos may cause uncontrollable laughter",
          "Fun fact: This popup exists solely to annoy you",
          "Breaking news: You're still here for some reason",
        ]
        setPopupContent(messages[Math.floor(Math.random() * messages.length)])
        setShowPopup(true)
        unlockAchievement("popup")
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [unlockAchievement])

  // Secret chaos mode key sequence detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        setKeySequence((prev) => {
          const updated = [...prev, "c"]
          if (updated.length > 3) updated.shift()
          return updated
        })
      } else {
        setKeySequence([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Check for chaos mode activation
  useEffect(() => {
    if (keySequence.join("") === "ccc") {
      setChaosMode(true)
      unlockAchievement("chaosMode")
      setPopupContent("🔥 CHAOS MODE ACTIVATED! 🔥 Things are about to get WILD!")
      setShowPopup(true)

      // Auto-disable after 15 seconds
      setTimeout(() => {
        setChaosMode(false)
        setPopupContent("Chaos mode deactivated. That was... intense.")
        setShowPopup(true)
      }, 15000)
    }
  }, [keySequence, unlockAchievement])

  const handleChaosClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1
      if (newCount === 5) unlockAchievement("click5")
      if (newCount === 10) unlockAchievement("click10")
      return newCount
    })

    if (clickCount === 9) {
      setPopupContent(
        "You've clicked 10 times! Why? What did you expect? A prize? Here's your prize: 🏆 It's imaginary!",
      )
      setShowPopup(true)
    }

    // 50% chance to redirect to a random page
    if (Math.random() > 0.5) {
      const randomPage = randomPages[Math.floor(Math.random() * randomPages.length)]
      router.push(randomPage)
    }
  }

  return (
    <main
      className={`min-h-screen overflow-hidden relative ${
        chaosMode
          ? "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-500 via-yellow-500 to-purple-500 animate-spin-slow"
          : "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
      }`}
      style={{
        cursor: Math.random() > 0.5 ? "crosshair" : "pointer",
      }}
    >
      <MouseTrail chaosMode={chaosMode} />
      <CursedCursor active={chaosMode} />



      {/* Secret chaos mode instructions */}
      <div className="fixed bottom-5 left-5 opacity-60 hover:opacity-60 z-50 transition-opacity text-xs text-white">
        <p>Psst! Press 'C' three times for a surprise...</p>
      </div>

      {/* Random floating emojis */}
      {randomEmojis.map((emoji, i) => (
        <div
          key={i}
          className={`absolute text-4xl ${chaosMode ? "animate-bounce-fast" : "animate-float"}`}
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg) scale(${chaosMode ? 1.5 : 1})`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className={`container mx-auto px-4 py-10 ${chaosMode ? "animate-shake" : ""}`}>
        <header className="mb-8 text-center">
          <GlitchText className="text-6xl font-extrabold text-white mb-4" intensity={chaosMode ? "high" : "normal"}>
            Welcome to the CHAOS ZONE!
          </GlitchText>
          <p className="text-xl text-white animate-pulse">
            How long can you survive? <span className="font-bold">{survivalTime} seconds</span>
          </p>
          {chaosMode && <div className="mt-2 text-yellow-300 font-bold animate-bounce">🔥 CHAOS MODE ACTIVE 🔥</div>}
        </header>

        <div className="mb-8">
          <p className="text-white mb-2">Loading your sanity...</p>
          <FakeLoader value={progress} chaosMode={chaosMode} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            className={`bg-white/20 backdrop-blur-sm p-6 rounded-lg border-2 border-yellow-300 shadow-neon ${chaosMode ? "animate-bounce-slow" : "animate-shake"}`}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2" /> Warning!
            </h2>
            <p className="text-white">
              This website is completely <span className="font-bold text-yellow-300">CHAOTIC</span>! Buttons might move,
              pages might change, and your cursor might do weird things.
              {randomEmojis[0]} {randomEmojis[1]}
            </p>
            <div className="mt-4 flex justify-center">
              <ChaosButton onClick={handleChaosClick} chaosMode={chaosMode}>
                Click Me (If You Dare)
              </ChaosButton>
            </div>
          </div>

          <div
            className={`bg-black/30 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-400 shadow-neon ${chaosMode ? "animate-shake" : "animate-pulse-slow"}`}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Sparkles className="mr-2" /> Achievements
            </h2>
            <ul className="text-white space-y-2">
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("survive30") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("survive30") ? "✓" : "○"}
                </span>
                Survive for 30 seconds
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("survive60") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("survive60") ? "✓" : "○"}
                </span>
                Survive for 1 minute
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("click5") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("click5") ? "✓" : "○"}
                </span>
                Click 5 chaotic buttons
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("click10") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("click10") ? "✓" : "○"}
                </span>
                Click 10 chaotic buttons
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("popup") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("popup") ? "✓" : "○"}
                </span>
                Trigger a random popup
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("chaosMode") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("chaosMode") ? "✓" : "○"}
                </span>
                Discover chaos mode
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("darkRoom") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("darkRoom") ? "✓" : "○"}
                </span>
                Escape the dark room
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${achievements.includes("captcha") ? "text-green-400" : "text-gray-400"}`}>
                  {achievements.includes("captcha") ? "✓" : "○"}
                </span>
                Solve the impossible captcha
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg border-2 border-white/30 shadow-lg transform hover:scale-105 transition-all ${chaosMode ? "animate-bounce-random" : ""}`}
              style={{
                animationDelay: `${i * 0.2}s`,
                transform: `rotate(${Math.random() * 3 - 1.5}deg)`,
              }}
            >
              <div className="absolute -right-4 -top-4 bg-yellow-400 text-black font-bold px-4 py-1 rotate-12 shadow-md">
                WOW!
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                <Zap className="mr-2" /> Chaotic Feature #{i}
              </h3>
              <p className="text-white/80">
                This box contains absolutely {i === 2 ? "something" : "nothing"} important! Maybe it will{" "}
                {i === 1 ? "explode" : "implode"} if you stare at it too long.
              </p>
              <ChaosButton
                variant={i === 2 ? "destructive" : "default"}
                className="mt-4"
                onClick={handleChaosClick}
                chaosMode={chaosMode}
              >
                {i === 1 ? "Don't Click" : i === 2 ? "Seriously, Don't" : "OK Fine, Click Me"}
              </ChaosButton>
            </div>
          ))}
        </div>

        <div
          className={`bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-8 rounded-lg border-4 border-white shadow-xl mb-12 ${chaosMode ? "animate-shake" : "animate-bounce-slow"}`}
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-center flex items-center justify-center">
            <Bomb className="mr-2" /> CHAOS CHALLENGE
          </h2>
          <p className="text-white text-center text-xl mb-6">
            Can you find all the hidden features without losing your mind?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/screaming-button">
              <Button
                variant="outline"
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-white hover:bg-white/40 text-white"
              >
                Screaming Button <Skull className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dark-room">
              <Button
                variant="outline"
                className="w-full bg-black/50 backdrop-blur-sm border-2 border-white hover:bg-black/70 text-white"
              >
                Dark Room Challenge
              </Button>
            </Link>
            <Link href="/captcha">
              <Button
                variant="outline"
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-white hover:bg-white/40 text-white"
              >
                Impossible CAPTCHA
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Link href={randomPages[Math.floor(Math.random() * randomPages.length)]}>
              <Button
                variant="outline"
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-white hover:bg-white/40 text-white"
              >
                Take me somewhere random <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <ChaosButton className="w-full" onClick={handleChaosClick} chaosMode={chaosMode}>
              I'm feeling chaotic
            </ChaosButton>
          </div>
        </div>
      </div>

      {/* Random popup */}
      {showPopup && <RandomPopup content={popupContent} onClose={() => setShowPopup(false)} chaosMode={chaosMode} />}
    </main>
  )
}

