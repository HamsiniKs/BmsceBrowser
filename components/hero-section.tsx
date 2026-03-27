"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

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

      {/* Nav */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <span className="font-serif font-black text-[#8B1212] text-lg leading-none">B</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">BMSIT</p>
            <p className="text-white/70 text-xs leading-none mt-0.5">since 2002</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Features", "Faculty", "Alumni"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 text-sm font-medium hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="md:hidden text-white">
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Hero Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 py-8">
        <div
          className={`text-center max-w-3xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="font-serif font-900 text-6xl md:text-8xl text-white leading-tight text-balance mb-6">
            BMSIT&amp;M
          </h1>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Transforming student experience through data and design
          </p>
        </div>
      </div>
    </section>
  )
}
