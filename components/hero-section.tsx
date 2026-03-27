"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col bg-center bg-cover"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4oNElzr4sTVZ78f2Une7Rtx5LtzwNX.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Navigation Ribbon */}
      <div className="relative z-20">
        <Navbar variant="transparent" />
      </div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 py-8">
        <div
          className={`text-center max-w-2xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="font-serif font-900 text-6xl md:text-8xl text-white leading-tight text-balance mb-6">
            BMSIT&amp;M
          </h1>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10">
            Transforming student experience through data and design
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[#8B1212] hover:bg-white/90 font-semibold px-8 h-12 group"
            >
              Explore Features
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 hover:border-white h-12 px-8"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
