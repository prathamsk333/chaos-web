"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Cat } from "lucide-react"
import GlitchText from "@/components/glitch-text"

export default function RandomPage2() {
  const [rotation, setRotation] = useState(0)

  const handleImageClick = () => {
    setRotation((prev) => prev + 45)
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-green-400 to-teal-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chaos
            </Button>
          </Link>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 border-2 border-green-300 shadow-lg">
          <GlitchText className="text-4xl font-bold text-white mb-6 text-center">NONSENSICAL CONTENT</GlitchText>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div
              className="relative transition-all duration-500 ease-in-out cursor-pointer"
              style={{ transform: `rotate(${rotation}deg)` }}
              onClick={handleImageClick}
            >
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="A cat"
                width={300}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full transform rotate-12">
                Click me!
              </div>
            </div>

            <div className="flex-1 text-white">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <Cat className="mr-2" /> This is a Toaster
              </h2>
              <p className="mb-4 text-lg">
                Despite what your eyes might tell you, this is definitely a toaster. Don't believe me? Try clicking on
                it and see what happens!
              </p>
              <p className="text-white/70 italic">
                Fun fact: Toasters were invented in 1893 and have been confusing people with their cat-like appearance
                ever since.
              </p>

              <div className="mt-6 p-4 bg-black/20 rounded-lg">
                <h3 className="font-bold mb-2">Toaster Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Makes purring sounds when heating up</li>
                  <li>Occasionally knocks things off counters</li>
                  <li>Requires petting to function properly</li>
                  <li>Dislikes water (this part is actually true)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="bg-white/30 border-white text-white hover:bg-white/50"
              onClick={() => setRotation((prev) => prev + 180)}
            >
              Flip the "Toaster"
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

