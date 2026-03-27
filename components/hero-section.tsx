"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-midnight flex flex-col">
      {/* Halftone texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #EFE8DF 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />

      {/* Torn paper edge bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,64 L0,32 Q30,18 60,28 Q90,38 120,22 Q150,8 180,20 Q210,32 240,16 Q270,2 300,18 Q330,34 360,14 Q390,0 420,16 Q450,32 480,10 Q510,0 540,20 Q570,38 600,12 Q630,0 660,18 Q690,36 720,14 Q750,2 780,20 Q810,38 840,18 Q870,2 900,16 Q930,32 960,12 Q990,0 1020,22 Q1050,40 1080,16 Q1110,2 1140,20 Q1170,38 1200,14 Q1230,0 1260,22 Q1290,38 1320,18 Q1350,2 1380,22 Q1410,38 1440,24 L1440,64 Z"
            fill="#EFE8DF"
          />
        </svg>
      </div>

      {/* Nav */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-maroon flex items-center justify-center">
            <span className="font-serif font-black text-alabaster text-lg leading-none">B</span>
          </div>
          <div>
            <p className="text-alabaster font-bold text-sm leading-none">BMSIT&M</p>
            <p className="text-lightblue text-xs leading-none mt-0.5">Est. 2002</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Admissions", "Placements", "Events", "Alumni", "Campus"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lightblue text-sm font-medium hover:text-alabaster transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-lightblue/40 text-lightblue hover:bg-lightblue/10 hover:text-alabaster"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-maroon hover:bg-maroon-light text-alabaster border-none"
          >
            Apply Now
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 pt-8 pb-24">
        {/* Collage floating elements */}
        <div
          className={`absolute top-16 left-8 md:left-16 w-28 h-36 md:w-40 md:h-52 rounded-2xl overflow-hidden border-2 border-tan/30 shadow-2xl rotate-[-8deg] transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SsMVdIBivZZ3iwe7QLYxuEP1zt7YAO.png"
            alt="Retro TV collage"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-maroon/20" />
        </div>

        <div
          className={`absolute top-8 right-8 md:right-20 w-24 h-32 md:w-36 md:h-44 rounded-2xl overflow-hidden border-2 border-lightblue/30 shadow-2xl rotate-[6deg] transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mMS1puWXv1B9G1LCQat4v8RkTkMstA.png"
            alt="Keyboard typing collage"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-lightblue/15" />
        </div>

        <div
          className={`absolute bottom-24 left-4 md:left-24 w-20 h-28 md:w-32 md:h-40 rounded-xl overflow-hidden border-2 border-tan/20 shadow-xl rotate-[5deg] transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EYaRn6XsXCCPSvlvshDVmnqvubRGad.png"
            alt="News TV collage"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-midnight/30" />
        </div>

        {/* Color block accent shapes */}
        <div className="absolute top-20 right-32 w-14 h-14 bg-lightblue/20 rounded-full blur-sm" />
        <div className="absolute bottom-32 right-16 w-8 h-8 bg-maroon/40 rotate-45" />
        <div className="absolute top-40 left-1/2 -translate-x-32 w-6 h-20 bg-tan/20 rotate-12 rounded-full" />

        {/* Main headline */}
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-2 bg-lightblue/10 border border-lightblue/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-lightblue animate-pulse" />
            <span className="text-lightblue text-xs font-medium tracking-wide uppercase">Now Accepting Applications 2025–26</span>
          </div>

          <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl text-alabaster leading-[0.92] tracking-tight text-balance mb-6">
            Reimagining
            <br />
            <span className="text-lightblue italic">Campus</span>
            <br />
            Experience
          </h1>

          <p className="text-tan text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 text-pretty">
            Admissions, placements, and student life — all in one platform. Built for the modern scholar at BMS Institute of Technology &amp; Management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-maroon hover:bg-maroon-light text-alabaster font-semibold px-8 h-12 group"
            >
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-lightblue/40 text-lightblue hover:bg-lightblue/10 hover:text-alabaster h-12 px-8 group"
            >
              <Play className="mr-2 w-4 h-4" />
              Explore Campus
            </Button>
          </div>
        </div>

        {/* Stat strip */}
        <div
          className={`mt-16 flex items-center gap-8 md:gap-16 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "800ms" }}
        >
          {[
            { value: "5,000+", label: "Students" },
            { value: "98%", label: "Placement Rate" },
            { value: "200+", label: "Recruiters" },
            { value: "NBA", label: "Accredited" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-serif font-black text-2xl md:text-3xl text-alabaster">{stat.value}</p>
              <p className="text-tan text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-tan/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
