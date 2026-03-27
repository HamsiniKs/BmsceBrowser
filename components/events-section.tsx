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
            <p className="text-maroon text-sm uppercase mb-2">Campus Life</p>
            <h2 className="text-4xl text-alabaster">Upcoming Events</h2>
          </div>

          <div className="flex gap-2">
            {(["all", "tech", "cultural", "sports"] as const).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">

          {/* SVG */}
          <div className="relative w-[600px] h-[600px]">
            <svg viewBox="0 0 600 600" className="w-full h-full">

              <circle cx={cx} cy={cy} r={180} fill="none" stroke="#1a6070" />
              <circle cx={cx} cy={cy} r={250} fill="none" stroke="#1a6070" />

              {filtered.map(event => {
                const rad = (event.angle * Math.PI) / 180

                // ✅ FIXED (rounded values)
                const ex = Number((cx + event.radius * Math.cos(rad)).toFixed(2))
                const ey = Number((cy + event.radius * Math.sin(rad)).toFixed(2))

                const isHovered = hoveredId === event.id
                const cfg = categoryConfig[event.category]

                return (
                  <g
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <circle
                      cx={ex}
                      cy={ey}
                      r={isHovered ? 20 : 16}
                      fill={cfg.color}
                    />

                    <text x={ex} y={ey + 30} textAnchor="middle">
                      {event.title.split(" ")[0]}
                    </text>

                    <text x={ex} y={ey + 5} textAnchor="middle">
                      {event.date}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Details */}
          <div>
            {selectedEvent && (
              <div>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.description}</p>
                <p>{selectedEvent.date} | {selectedEvent.time}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}