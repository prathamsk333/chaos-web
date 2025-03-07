"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, RefreshCw, Check } from "lucide-react"
import { useAchievements } from "@/lib/use-achievements"

type CaptchaType = "select" | "type" | "click" | "math" | "reverse"

export default function CaptchaPage() {
  const router = useRouter()
  const [captchaType, setCaptchaType] = useState<CaptchaType>("select")
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [gridItems, setGridItems] = useState<number[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [targetNumber, setTargetNumber] = useState(0)
  const [mathProblem, setMathProblem] = useState({ a: 0, b: 0, op: "+" })
  const [showSuccess, setShowSuccess] = useState(false)
  const { unlockAchievement } = useAchievements()

  // Initialize or change captcha
  useEffect(() => {
    generateNewCaptcha()
  }, [captchaType])

  const generateNewCaptcha = () => {
    setInputValue("")
    setMessage("")
    setSelectedItems([])

    // Generate grid for selection captcha
    if (captchaType === "select") {
      setGridItems(Array.from({ length: 9 }, (_, i) => i))
    }

    // Generate target number for click captcha
    if (captchaType === "click") {
      setTargetNumber(Math.floor(Math.random() * 9) + 1)
      // Shuffle grid
      const newGrid = Array.from({ length: 9 }, (_, i) => i + 1)
      setGridItems(newGrid.sort(() => Math.random() - 0.5))
    }

    // Generate math problem
    if (captchaType === "math") {
      const a = Math.floor(Math.random() * 10) + 1
      const b = Math.floor(Math.random() * 10) + 1
      const operations = ["+", "-", "*"]
      const op = operations[Math.floor(Math.random() * operations.length)]
      setMathProblem({ a, b, op })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempts((prev) => prev + 1)

    // Always generate a new captcha
    const nextCaptchaTypes: CaptchaType[] = ["select", "type", "click", "math", "reverse"]
    const currentIndex = nextCaptchaTypes.indexOf(captchaType)
    const nextIndex = (currentIndex + 1) % nextCaptchaTypes.length

    // Check if the current captcha was solved correctly
    let solved = false

    switch (captchaType) {
      case "select":
        // All items should be selected for this impossible captcha
        solved = selectedItems.length === gridItems.length
        setMessage(solved ? "Correct! But there's more..." : "You must select ALL tacos!")
        break

      case "type":
        // The text should be reversed
        const reversed = "i am not a robot".split("").reverse().join("")
        solved = inputValue.toLowerCase() === reversed
        setMessage(solved ? "Correct! But there's more..." : "That's not right. Try again!")
        break

      case "click":
        // The target number should be clicked, but we'll shuffle it again
        solved = selectedItems.includes(targetNumber)
        setMessage(solved ? "Correct! But there's more..." : `You need to click the ${targetNumber}!`)
        break

      case "math":
        // Check math problem
        let correctAnswer
        switch (mathProblem.op) {
          case "+":
            correctAnswer = mathProblem.a + mathProblem.b
            break
          case "-":
            correctAnswer = mathProblem.a - mathProblem.b
            break
          case "*":
            correctAnswer = mathProblem.a * mathProblem.b
            break
          default:
            correctAnswer = 0
        }
        solved = Number.parseInt(inputValue) === correctAnswer
        setMessage(solved ? "Correct! But there's more..." : "Wrong answer! Try again.")
        break

      case "reverse":
        // Any input is fine for the last one
        solved = inputValue.length > 0
        break
    }

    if (solved) {
      if (captchaType === "reverse") {
        // Final captcha solved!
        setShowSuccess(true)
        unlockAchievement("captcha")
        setTimeout(() => {
          router.push("/")
        }, 5000)
      } else {
        // Move to next captcha
        setCaptchaType(nextCaptchaTypes[nextIndex])
      }
    } else {
      // Regenerate the same type of captcha
      generateNewCaptcha()
    }
  }

  const handleItemClick = (item: number) => {
    if (captchaType === "select") {
      setSelectedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
    } else if (captchaType === "click") {
      setSelectedItems([item])
    }
  }

  const renderCaptchaContent = () => {
    switch (captchaType) {
      case "select":
        return (
          <>
            <h3 className="text-lg font-medium mb-2">Select all images with tacos</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {gridItems.map((item) => (
                <div
                  key={item}
                  className={`aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer border-2 ${
                    selectedItems.includes(item) ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="text-2xl">🌮</span>
                </div>
              ))}
            </div>
          </>
        )

      case "type":
        return (
          <>
            <h3 className="text-lg font-medium mb-2">Prove you're not a robot by typing "I am not a robot" backward</h3>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mb-4"
              placeholder="Type here..."
            />
          </>
        )

      case "click":
        return (
          <>
            <h3 className="text-lg font-medium mb-2">Click the {targetNumber}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {gridItems.map((item) => (
                <div
                  key={item}
                  className={`aspect-square bg-gray-200 rounded-md flex items-center justify-center cursor-pointer border-2 ${
                    selectedItems.includes(item) ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="text-xl font-bold">{item}</span>
                </div>
              ))}
            </div>
          </>
        )

      case "math":
        return (
          <>
            <h3 className="text-lg font-medium mb-2">
              Solve this math problem: {mathProblem.a} {mathProblem.op} {mathProblem.b} = ?
            </h3>
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mb-4"
              placeholder="Enter answer..."
            />
          </>
        )

      case "reverse":
        return (
          <>
            <h3 className="text-lg font-medium mb-2">
              Final challenge: Type anything backward while standing on one foot
            </h3>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mb-4"
              placeholder="We can't verify this, but we trust you..."
            />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      {!showSuccess ? (
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Impossible CAPTCHA</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Attempt #{attempts + 1}</span>
              <Button variant="ghost" size="icon" onClick={generateNewCaptcha} className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderCaptchaContent()}

            {message && (
              <div
                className={`p-2 rounded-md mb-4 text-center ${
                  message.includes("Correct") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="robot" />
              <label htmlFor="robot" className="text-sm">
                I am not a robot (but we know you're lying)
              </label>
            </div>

            <div className="flex justify-between">
              <Link href="/">
                <Button variant="outline" type="button">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Give Up
                </Button>
              </Link>

              <Button type="submit">Verify</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-bounce-slow">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">Congratulations, Human-ish!</h2>

          <p className="text-center mb-6">
            You've somehow managed to solve our impossible CAPTCHA. Either you're the world's most persistent human, or
            you're the world's most advanced robot. Either way, we're impressed!
          </p>

          <p className="text-sm text-gray-500 text-center mb-4">Redirecting you back to chaos in a few seconds...</p>

          <div className="flex justify-center">
            <Link href="/">
              <Button>Return to Chaos Now</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

