"use client"

import { useState } from "react"
import { Calendar, X, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

type Category = "all" | "tech" | "cultural" | "sports"

const events = [
  {
    id: 1, title: "HackNova 2025", category: "tech" as const,
    date: "Apr 12", time: "9:00 AM", venue: "Main Auditorium",
    participants: 320, description: "48-hour hackathon — build, ship, win.",
    angle: 0, radius: 180,
  },
  {
    id: 2, title: "Tarang Cultural Fest", category: "cultural" as const,
    date: "Apr 18", time: "6:00 PM", venue: "Open Air Theatre",
    participants: 1200, description: "Annual cultural extravaganza with music, dance & drama.",
    angle: 72, radius: 180,
  },
  {
    id: 3, title: "BMSIT Premier League", category: "sports" as const,
    date: "Apr 25", time: "8:00 AM", venue: "Sports Ground",
    participants: 200, description: "Inter-department cricket championship.",
    angle: 144, radius: 180,
  },
  {
    id: 4, title: "AI Workshop Series", category: "tech" as const,
    date: "May 2", time: "2:00 PM", venue: "CSE Lab Block",
    participants: 90, description: "Deep dive into LLMs, RAG & AI agents.",
    angle: 216, radius: 180,
  },
  {
    id: 5, title: "Rangoli & Art Expo", category: "cultural" as const,
    date: "May 8", time: "10:00 AM", venue: "Engineering Block",
    participants: 150, description: "Celebrate creativity through visual arts.",
    angle: 288, radius: 180,
  },
  {
    id: 6, title: "Robotics Challenge", category: "tech" as const,
    date: "May 15", time: "11:00 AM", venue: "ECE Workshop",
    participants: 60, description: "Build autonomous bots and compete.",
    angle: 36, radius: 250,
  },
  {
    id: 7, title: "Basketball Tourney", category: "sports" as const,
    date: "May 20", time: "5:00 PM", venue: "Sports Complex",
    participants: 80, description: "5v5 knockout basketball tournament.",
    angle: 108, radius: 250,
  },
  {
    id: 8, title: "Debate Championship", category: "cultural" as const,
    date: "May 22", time: "3:00 PM", venue: "Seminar Hall",
    participants: 45, description: "Parliamentary debate — sharpen your rhetoric.",
    angle: 180, radius: 250,
  },
]

const categoryConfig = {
  tech: { color: "#96C0CE", bg: "bg-lightblue", textBg: "bg-lightblue/20", textColor: "text-lightblue", border: "border-lightblue/30" },
  cultural: { color: "#7F0303", bg: "bg-maroon", textBg: "bg-maroon/20", textColor: "text-maroon-light", border: "border-maroon/30" },
  sports: { color: "#D8BA98", bg: "bg-tan", textBg: "bg-tan/20", textColor: "text-tan-dark", border: "border-tan/30" },
}

export function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filtered = activeCategory === "all" ? events : events.filter(e => e.category === activeCategory)

  const cx = 300
  const cy = 300

  return (
    <section id="events" className="bg-midnight py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Campus Life</p>
            <h2 className="font-serif font-black text-4xl md:text-5xl text-alabaster text-balance">
              Upcoming Events
            </h2>
          </div>
          {/* Category filter */}
          <div className="flex gap-2">
            {(["all", "tech", "cultural", "sports"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-maroon border-maroon text-alabaster"
                    : "border-lightblue/20 text-tan hover:border-lightblue/40 hover:text-alabaster"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Orbit visualization */}
          <div className="relative flex-shrink-0 w-[340px] h-[340px] md:w-[600px] md:h-[600px]">
            <svg
              viewBox="0 0 600 600"
              className="w-full h-full"
            >
              {/* Orbit rings */}
              <circle cx={cx} cy={cy} r={180} fill="none" stroke="#1a6070" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />
              <circle cx={cx} cy={cy} r={250} fill="none" stroke="#1a6070" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" />

              {/* Center dot */}
              <circle cx={cx} cy={cy} r={32} fill="#1a6070" />
              <text x={cx} y={cy - 4} textAnchor="middle" fill="#EFE8DF" fontSize="9" fontWeight="bold">BMSIT</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fill="#96C0CE" fontSize="7">EVENTS</text>

              {events.map(event => {
                const rad = (event.angle * Math.PI) / 180
                const ex = cx + event.radius * Math.cos(rad)
                const ey = cy + event.radius * Math.sin(rad)
                const cfg = categoryConfig[event.category]
                const isVisible = activeCategory === "all" || activeCategory === event.category
                const isHovered = hoveredId === event.id

                return (
                  <g
                    key={event.id}
                    style={{ cursor: "pointer", opacity: isVisible ? 1 : 0.15, transition: "opacity 0.3s" }}
                    onClick={() => setSelectedEvent(event)}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Glow */}
                    {isHovered && (
                      <circle cx={ex} cy={ey} r={28} fill={cfg.color} opacity={0.15} />
                    )}
                    {/* Node */}
                    <circle
                      cx={ex} cy={ey} r={isHovered ? 20 : 16}
                      fill={cfg.color}
                      style={{ transition: "r 0.2s" }}
                    />
                    {/* Label */}
                    <text
                      x={ex} y={ey + 30}
                      textAnchor="middle" fill="#EFE8DF" fontSize="8"
                      className="pointer-events-none"
                    >
                      {event.title.split(" ")[0]}
                    </text>
                    {/* Date badge */}
                    <text
                      x={ex} y={ey + 4}
                      textAnchor="middle" fill="#0F414A" fontSize="7" fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {event.date}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Event detail panel */}
          {selectedEvent ? (
            <div className="flex-1 bg-midnight-light/30 rounded-2xl p-6 border border-lightblue/10 relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-tan/60 hover:text-alabaster"
              >
                <X className="w-4 h-4" />
              </button>
              <span
                className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-4 capitalize ${categoryConfig[selectedEvent.category].textBg} ${categoryConfig[selectedEvent.category].textColor}`}
              >
                {selectedEvent.category}
              </span>
              <h3 className="font-serif font-black text-2xl text-alabaster mb-2">{selectedEvent.title}</h3>
              <p className="text-tan/80 text-sm leading-relaxed mb-6">{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-lightblue" />
                  <span className="text-tan text-sm">{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-lightblue" />
                  <span className="text-tan text-sm">{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-lightblue" />
                  <span className="text-tan text-sm">{selectedEvent.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-lightblue" />
                  <span className="text-tan text-sm">{selectedEvent.participants} expected</span>
                </div>
              </div>
              <Button className="w-full bg-maroon hover:bg-maroon-light text-alabaster">
                Register Now
              </Button>
            </div>
          ) : (
            <div className="flex-1 space-y-3">
              <p className="text-tan/60 text-sm mb-4">Click any event node to view details</p>
              {events.slice(0, 5).map(event => {
                const cfg = categoryConfig[event.category]
                const isVisible = activeCategory === "all" || activeCategory === event.category
                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left rounded-xl p-3 border transition-all ${
                      isVisible ? `${cfg.border} bg-midnight-light/20 hover:bg-midnight-light/40` : "border-midnight-light/20 opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                        <span className="text-alabaster text-sm font-medium">{event.title}</span>
                      </div>
                      <span className="text-tan/60 text-xs">{event.date}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
