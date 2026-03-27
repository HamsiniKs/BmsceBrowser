"use client"

import { useState } from "react"
import {
  GraduationCap, BarChart3, Calendar, BookOpen,
  Users, Library, Home, Bus, Bell, Cpu,
  TrendingUp, Map
} from "lucide-react"

const tiles = [
  {
    id: "admissions",
    label: "Admissions",
    icon: GraduationCap,
    description: "Apply, track status, upload documents",
    size: "large",
    bg: "bg-maroon",
    textColor: "text-alabaster",
    accent: "text-tan",
  },
  {
    id: "placements",
    label: "Placements",
    icon: BarChart3,
    description: "Analytics, recruiter map, offers",
    size: "large",
    bg: "bg-midnight-light",
    textColor: "text-alabaster",
    accent: "text-lightblue",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    description: "Orbit view, categories, register",
    size: "medium",
    bg: "bg-lightblue",
    textColor: "text-midnight",
    accent: "text-midnight-light",
  },
  {
    id: "seat-finder",
    label: "Seat Finder",
    icon: Map,
    description: "Library & canteen live seats",
    size: "medium",
    bg: "bg-tan",
    textColor: "text-midnight",
    accent: "text-maroon",
  },
  {
    id: "courses",
    label: "Courses",
    icon: BookOpen,
    description: "Browse programs & curriculum",
    size: "small",
    bg: "bg-midnight",
    textColor: "text-alabaster",
    accent: "text-lightblue",
  },
  {
    id: "clubs",
    label: "Clubs",
    icon: Users,
    description: "Join student organizations",
    size: "small",
    bg: "bg-alabaster",
    textColor: "text-midnight",
    accent: "text-maroon",
  },
  {
    id: "library",
    label: "Library",
    icon: Library,
    description: "Catalog, renewals, e-resources",
    size: "small",
    bg: "bg-midnight",
    textColor: "text-alabaster",
    accent: "text-tan",
  },
  {
    id: "hostel",
    label: "Hostel",
    icon: Home,
    description: "Room booking & management",
    size: "small",
    bg: "bg-lightblue",
    textColor: "text-midnight",
    accent: "text-midnight-light",
  },
  {
    id: "transport",
    label: "Transport",
    icon: Bus,
    description: "Bus routes & live tracking",
    size: "small",
    bg: "bg-tan",
    textColor: "text-midnight",
    accent: "text-maroon",
  },
  {
    id: "announcements",
    label: "Announcements",
    icon: Bell,
    description: "Campus notices & alerts",
    size: "medium",
    bg: "bg-maroon",
    textColor: "text-alabaster",
    accent: "text-tan",
  },
]

export function BentoGrid() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="dashboard" className="bg-alabaster px-6 md:px-12 py-20">
      {/* Section header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Platform</p>
            <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance leading-tight">
              Everything in<br />one place.
            </h2>
          </div>
          <p className="hidden md:block text-midnight/50 text-sm max-w-xs text-right leading-relaxed">
            Navigate every aspect of campus life from a single, unified dashboard.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
          {/* Admissions — spans 2 col × 2 row */}
          <BentoTile tile={tiles[0]} className="col-span-2 row-span-2" hovered={hovered} setHovered={setHovered} />
          {/* Placements — spans 2 col × 2 row */}
          <BentoTile tile={tiles[1]} className="col-span-2 row-span-2" hovered={hovered} setHovered={setHovered} extraContent={<PlacementsPreview />} />
          {/* Events — spans 2 col × 1 row */}
          <BentoTile tile={tiles[2]} className="col-span-2 row-span-1" hovered={hovered} setHovered={setHovered} />
          {/* Seat Finder — spans 2 col × 1 row */}
          <BentoTile tile={tiles[3]} className="col-span-2 row-span-1" hovered={hovered} setHovered={setHovered} />
          {/* Smaller tiles */}
          {tiles.slice(4, 7).map((tile) => (
            <BentoTile key={tile.id} tile={tile} className="col-span-1 row-span-1" hovered={hovered} setHovered={setHovered} />
          ))}
          {/* Announcements — spans 1 col × 1 row */}
          <BentoTile tile={tiles[9]} className="col-span-1 row-span-1" hovered={hovered} setHovered={setHovered} />
          {tiles.slice(7, 9).map((tile) => (
            <BentoTile key={tile.id} tile={tile} className="col-span-1 row-span-1" hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlacementsPreview() {
  const bars = [65, 82, 74, 90, 88, 95]
  return (
    <div className="flex items-end gap-1.5 mt-3 h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-alabaster/30 rounded-sm"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

function BentoTile({
  tile,
  className,
  hovered,
  setHovered,
  extraContent,
}: {
  tile: (typeof tiles)[0]
  className?: string
  hovered: string | null
  setHovered: (id: string | null) => void
  extraContent?: React.ReactNode
}) {
  const Icon = tile.icon
  const isHovered = hovered === tile.id

  return (
    <div
      className={`${className} ${tile.bg} rounded-2xl p-5 flex flex-col justify-between cursor-pointer select-none overflow-hidden relative group transition-all duration-300 ease-out ${
        isHovered ? "scale-[1.03] shadow-2xl z-10" : "scale-100 shadow-md"
      }`}
      onMouseEnter={() => setHovered(tile.id)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "10px 10px",
        }}
      />

      {/* Glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.06)" }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <Icon className={`w-6 h-6 ${tile.accent} mb-3`} strokeWidth={1.5} />
          <p className={`font-serif font-bold text-xl leading-tight ${tile.textColor}`}>{tile.label}</p>
          <p className={`text-xs mt-1 leading-relaxed ${tile.textColor} opacity-70`}>{tile.description}</p>
        </div>

        {extraContent && <div className={tile.textColor}>{extraContent}</div>}

        <div className={`flex items-center justify-between mt-2 ${tile.textColor} opacity-60`}>
          <span className="text-xs font-medium">Explore</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  )
}
