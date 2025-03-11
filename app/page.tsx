"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Lock, Mail, Calendar, AlertCircle, X, RefreshCw, Volume2, VolumeX } from "lucide-react"
import GlitchText from "@/components/glitch-text"
import RandomPopup from "@/components/random-popup"

// Password requirements that change randomly
const passwordRequirements = [
  "Must be exactly 17 characters long",
  "Must include at least one hieroglyph (𓀀, 𓂀) and a Roman numeral (I, V, X)",
  "Must contain a prime number of vowels",
  "Must include the name of a Greek god",
  "Must have exactly 3 special characters in ascending ASCII order",
  "Must spell something funny when read backward",
  "Must include a chess notation (e.g., Nf3, e4)",
  "Must contain a valid hexadecimal color code",
  "Must include a chemical element symbol",
  "Must have a Fibonacci sequence of at least 3 numbers",
  "Must contain a valid emoji sequence",
  "Must include a line from Shakespeare",
  "Must contain a valid IP address",
  "Must include a programming language name",
  "Must have a palindrome of at least 5 characters",
]

// Unhelpful error messages
const errorMessages = [
  "Hmm... not quite, but nice try!",
  "Almost there! Just kidding, not even close.",
  "Invalid username? Maybe. Maybe not. Who's to say?",
  "Your password is like your sense of humor - needs work.",
  "Our servers don't like that input. They're very judgmental.",
  "That's a creative approach! Unfortunately, creativity isn't allowed here.",
  "The login hamsters are confused by your input.",
  "According to our records, you don't exist. Existential crisis incoming!",
  "Our AI analyzed your login attempt and is now questioning its existence.",
  "Your password is in another castle.",
  "Error 404: Success not found.",
  "The system has determined you're too awesome to log in. Try being less cool.",
  "Your login attempt has been filed under 'Nice Effort, Though'.",
  "Our servers are currently taking a coffee break. Try again never.",
]

// Impossible CAPTCHA challenges
const captchaChallenges = [
  "Select all pictures with oxygen in them",
  "Prove you're human by solving this 7x7 Sudoku",
  "Click on all images that contain the concept of happiness",
  "Identify all squares with visible dark matter",
  "Select all images of animals thinking about quantum physics",
  "Find the square root of this image",
  "Identify all pictures taken on a Tuesday",
  "Select all images containing exactly 17 atoms",
  "Click on all pictures that smell like cinnamon",
  "Identify all images that will exist in the future",
]

// Form field types that can randomly appear
type FieldType =
  | "username"
  | "password"
  | "email"
  | "confirmEmail"
  | "favoriteColor"
  | "petName"
  | "mothersMaidenName"
  | "firstCar"
  | "childhoodStreet"
  | "socialSecurityNumber"

// Field labels for each type
const fieldLabels: Record<FieldType, string> = {
  username: "Username",
  password: "Password",
  email: "Email",
  confirmEmail: "Confirm Email",
  favoriteColor: "Favorite Color",
  petName: "First Pet's Name",
  mothersMaidenName: "Mother's Maiden Name",
  firstCar: "First Car Model",
  childhoodStreet: "Childhood Street",
  socialSecurityNumber: "Social Security Number (for security purposes only)",
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [currentRequirement, setCurrentRequirement] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaChallenge, setCaptchaChallenge] = useState(0)
  const [captchaSolved, setCaptchaSolved] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState("")
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [show2FA, setShow2FA] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [fieldTypes, setFieldTypes] = useState<FieldType[]>(["username", "password", "email"])
  const [fieldPositions, setFieldPositions] = useState<number[]>([0, 1, 2])
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const [showSurvey, setShowSurvey] = useState(false)
  const [playingMusic, setPlayingMusic] = useState(false)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Initialize audio
  useEffect(() => {
    const audio = new Audio("/elevator-music.mp3")
    audio.loop = true
    setAudioRef(audio)

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Change password requirement when typing password
  useEffect(() => {
    if (password.length > 0 && password.length % 3 === 0) {
      setCurrentRequirement(Math.floor(Math.random() * passwordRequirements.length))
    }
  }, [password])

  // Randomly change field types and positions
  useEffect(() => {
    const allFieldTypes: FieldType[] = [
      "username",
      "password",
      "email",
      "confirmEmail",
      "favoriteColor",
      "petName",
      "mothersMaidenName",
      "firstCar",
      "childhoodStreet",
    ]

    const handleInputChange = () => {
      // 30% chance to change a random field
      if (Math.random() < 0.3) {
        setFieldTypes((prev) => {
          const newTypes = [...prev]
          const randomIndex = Math.floor(Math.random() * newTypes.length)
          const randomType = allFieldTypes[Math.floor(Math.random() * allFieldTypes.length)]
          newTypes[randomIndex] = randomType
          return newTypes
        })
      }

      // 20% chance to shuffle positions
      if (Math.random() < 0.2) {
        setFieldPositions((prev) => {
          return [...prev].sort(() => Math.random() - 0.5)
        })
      }
    }

    // Add event listener for any input change
    document.addEventListener("input", handleInputChange)

    return () => {
      document.removeEventListener("input", handleInputChange)
    }
  }, [])

  // Random popups when typing
  useEffect(() => {
    const totalChars = (username + password + email + age).length

    if (totalChars > 0 && totalChars % 10 === 0) {
      const popups = [
        "Did you know? 87% of users prefer our competitor's login page!",
        "SPECIAL OFFER: Upgrade to Premium Login for only $9.99/month!",
        "Your computer may be infected with 37 viruses! Click here to scan now!",
        "Congratulations! You're our 1,000,000th visitor today!",
        "Hot singles in YOUR AREA want to help you log in!",
        "BREAKING NEWS: Login pages are going extinct! Act now!",
        "WARNING: Your login session will self-destruct in 10 seconds!",
        "Survey: How would you rate this login experience so far?",
        "Fun fact: Most users give up at this point!",
        "Your login attempt is being broadcast live to 3 million viewers!",
      ]

      setPopupContent(popups[Math.floor(Math.random() * popups.length)])
      setShowPopup(true)
    }

    // 5% chance to show survey
    if (totalChars > 20 && !showSurvey && Math.random() < 0.05) {
      setShowSurvey(true)
    }

    // 10% chance to start playing music
    if (totalChars > 15 && !playingMusic && Math.random() < 0.1) {
      if (audioRef) {
        audioRef.play()
        setPlayingMusic(true)
      }
    }
  }, [username, password, email, age, showSurvey, playingMusic, audioRef])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show random error message
    setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)])

    // 50% chance to show CAPTCHA
    if (Math.random() < 0.5 && !captchaSolved) {
      setShowCaptcha(true)
      setCaptchaChallenge(Math.floor(Math.random() * captchaChallenges.length))
      return
    }

    // 30% chance to show 2FA
    if (Math.random() < 0.3 && !show2FA) {
      setShow2FA(true)
      return
    }

    // 20% chance to show terminal
    if (Math.random() < 0.2) {
      setShowTerminal(true)
      simulateHacking()
      return
    }

    // Otherwise, pretend to submit
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)

      // 50% chance to "log in as someone else"
      if (Math.random() < 0.5) {
        setPopupContent(
          "Congratulations! You are now logged into someone else's account. Please respect their privacy while snooping around.",
        )
        setShowPopup(true)
      } else {
        // Reset form with a snarky message
        setUsername("")
        setPassword("")
        setEmail("")
        setAge("")
        setErrorMessage("Now do it again, but better.")
      }
    }, 3000)
  }

  const handleCaptchaClick = () => {
    // Make the CAPTCHA disappear before they can solve it
    setTimeout(() => {
      setShowCaptcha(false)
      setCaptchaSolved(true)
      setErrorMessage("CAPTCHA verification failed successfully!")
    }, 300)
  }

  const handleButtonMouseOver = () => {
    // Move the button away when hovering
    if (formRef.current) {
      const formWidth = formRef.current.clientWidth
      const formHeight = formRef.current.clientHeight

      setButtonPosition({
        x: (Math.random() - 0.5) * formWidth * 0.5,
        y: (Math.random() - 0.5) * formHeight * 0.2,
      })
    }
  }

  const simulateHacking = () => {
    const hackingLines = [
      "Initializing login sequence...",
      "Bypassing security protocols...",
      "Injecting SQL queries...",
      "Cracking password hash...",
      "Bypassing firewall...",
      "Accessing mainframe...",
      "Downloading user data...",
      "Encrypting connection...",
      "Spoofing IP address...",
      "Rerouting through proxy servers...",
      "Executing binary payload...",
      "Compiling kernel modules...",
      "Deploying neural network...",
      "Mining cryptocurrency in background...",
      "Launching cyber missiles...",
      "Enhancing pixels...",
      "Reversing polarity...",
      "Hacking the Gibson...",
      "Login failed. Try again with better hacking skills.",
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < hackingLines.length) {
        setTerminalText((prev) => prev + hackingLines[i] + "\n")
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setShowTerminal(false)
          setTerminalText("")
          setErrorMessage("Hacking attempt detected! Security alerted. Just kidding, we don't have security.")
        }, 1000)
      }
    }, 300)
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAge(value)

    // Check if age is between 10 and 30
    const ageNum = Number.parseInt(value)
    if (ageNum >= 10 && ageNum <= 30) {
      setErrorMessage(`User with age ${ageNum} already exists. Try being born at a different time.`)
    }
  }

  const handleGuestLogin = () => {
    setPopupContent("Guest login successful! You now have access to absolutely nothing. Enjoy your stay!")
    setShowPopup(true)

    setTimeout(() => {
      router.push("/home")
    }, 3000)
  }

  const toggleMusic = () => {
    if (audioRef) {
      if (playingMusic) {
        audioRef.pause()
      } else {
        audioRef.play()
      }
      setPlayingMusic(!playingMusic)
    }
  }

  // Render fields in their current order
  const renderFields = () => {
    return fieldPositions.map((position, index) => {
      const fieldType = fieldTypes[position]

      switch (fieldType) {
        case "username":
          return (
            <div key={`field-${index}`} className="mb-4">
              <label className="block text-sm font-medium mb-1 flex items-center">
                <User className="mr-2 h-4 w-4" /> {fieldLabels[fieldType]}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                placeholder="Enter your username"
              />
            </div>
          )

        case "password":
          return (
            <div key={`field-${index}`} className="mb-4">
              <label className="block text-sm font-medium mb-1 flex items-center">
                <Lock className="mr-2 h-4 w-4" /> {fieldLabels[fieldType]}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="Enter your password"
              />
              <div className="mt-1 text-xs text-red-500 flex items-center">
                <AlertCircle className="mr-1 h-3 w-3" /> Weak password
              </div>
              <div className="mt-1 text-xs">Current requirement: {passwordRequirements[currentRequirement]}</div>
            </div>
          )

        case "email":
          return (
            <div key={`field-${index}`} className="mb-4">
              <label className="block text-sm font-medium mb-1 flex items-center">
                <Mail className="mr-2 h-4 w-4" /> {fieldLabels[fieldType]}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="Enter your email"
              />
            </div>
          )

        default:
          return (
            <div key={`field-${index}`} className="mb-4">
              <label className="block text-sm font-medium mb-1">{fieldLabels[fieldType]}</label>
              <Input
                type="text"
                className="w-full"
                placeholder={`Enter your ${fieldLabels[fieldType].toLowerCase()}`}
              />
            </div>
          )
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="bg-white/20 border-white text-white hover:bg-white/30">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chaos
          </Button>
        </Link>
      </div>

      {playingMusic && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/20 border-white text-white hover:bg-white/30"
            onClick={toggleMusic}
          >
            {playingMusic ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
        <div className="text-center mb-6">
          <GlitchText className="text-2xl font-bold">Chaos Login</GlitchText>
          <p className="text-gray-500 text-sm mt-1">Where logging in is an adventure!</p>
        </div>

        {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">{errorMessage}</div>}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {renderFields()}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Age
            </label>
            <Input
              type="number"
              value={age}
              onChange={handleAgeChange}
              className="w-full"
              placeholder="Enter your age"
              min="0"
              max="150"
            />
          </div>

          {showCaptcha && (
            <div className="mb-4 p-4 border border-gray-200 rounded-md">
              <div className="text-sm font-medium mb-2">{captchaChallenges[captchaChallenge]}</div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200"
                  >
                    <Image src={`/placeholder.svg?height=80&width=80`} alt="CAPTCHA image" width={80} height={80} />
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <Checkbox id="captcha" onClick={handleCaptchaClick} />
                <label htmlFor="captcha" className="ml-2 text-sm">
                  I'm not a robot (probably)
                </label>
              </div>
            </div>
          )}

          {show2FA && (
            <div className="mb-4 p-4 border border-gray-200 rounded-md">
              <div className="text-sm font-medium mb-2">Two-Factor Authentication Required</div>
              <p className="text-xs text-gray-500 mb-3">
                We've sent a verification code to a fax machine in {Math.random() > 0.5 ? "Antarctica" : "North Korea"}.
                Please enter the code below.
              </p>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full mb-2"
                placeholder="Enter 200-digit verification code"
              />
              <div className="text-xs text-gray-500">
                Alternatively, solve this riddle: The more you take, the more you leave behind. What am I?
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={handleGuestLogin}>
              Login as Guest
            </Button>

            <div
              className="relative"
              style={{
                transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <Button type="submit" onMouseEnter={handleButtonMouseOver} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </form>

        {showTerminal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black w-full max-w-2xl rounded-md p-4 border border-green-500">
              <div className="flex justify-between items-center mb-2">
                <div className="text-green-500 font-mono text-sm">Terminal - Hacking in progress</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-transparent"
                  onClick={() => setShowTerminal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-black text-green-500 font-mono text-xs h-64 overflow-y-auto p-2 whitespace-pre-line">
                {terminalText}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        )}

        {showSurvey && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Quick Survey</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowSurvey(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <p className="mb-2 font-medium">How would you rate this login experience?</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setShowSurvey(false)
                        setPopupContent(`Thank you for your ${rating}/5 rating! We'll completely ignore it.`)
                        setShowPopup(true)
                      }}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-2 font-medium">Would you recommend this login page to your enemies?</p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowSurvey(false)
                      setPopupContent("We've automatically signed up all your contacts for our newsletter!")
                      setShowPopup(true)
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowSurvey(false)
                      setPopupContent("We've automatically signed up all your contacts for our newsletter anyway!")
                      setShowPopup(true)
                    }}
                  >
                    No
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => setShowSurvey(false)}>
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Random popup */}
      {showPopup && <RandomPopup content={popupContent} onClose={() => setShowPopup(false)} />}
    </div>
  )
}

