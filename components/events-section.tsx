"use client"

import { useState, useMemo } from "react"
import { Calendar, X, MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Category = "all" | "tech" | "cultural" | "sports"

const YEAR = 2025
const MONTH = 3 // April (0-indexed)

const events = [
  {
    id: 1, title: "HackNova 2025", category: "tech" as const,
    date: new Date(2025, 3, 12), dateLabel: "Apr 12", time: "9:00 AM",
    venue: "Main Auditorium", participants: 320,
    description: "48-hour hackathon — build, ship, win.",
    angle: 0, radius: 220,
  },
  {
    id: 2, title: "Tarang Cultural Fest", category: "cultural" as const,
    date: new Date(2025, 3, 18), dateLabel: "Apr 18", time: "6:00 PM",
    venue: "Open Air Theatre", participants: 1200,
    description: "Annual cultural extravaganza with music, dance & drama.",
    angle: 72, radius: 220,
  },
  {
    id: 3, title: "BMSIT Premier League", category: "sports" as const,
    date: new Date(2025, 3, 25), dateLabel: "Apr 25", time: "8:00 AM",
    venue: "Sports Ground", participants: 200,
    description: "Inter-department cricket championship.",
    angle: 144, radius: 220,
  },
  {
    id: 4, title: "AI Workshop Series", category: "tech" as const,
    date: new Date(2025, 4, 2), dateLabel: "May 2", time: "2:00 PM",
    venue: "CSE Lab Block", participants: 90,
    description: "Deep dive into LLMs, RAG & AI agents.",
    angle: 216, radius: 220,
  },
  {
    id: 5, title: "Rangoli & Art Expo", category: "cultural" as const,
    date: new Date(2025, 4, 8), dateLabel: "May 8", time: "10:00 AM",
    venue: "Engineering Block", participants: 150,
    description: "Celebrate creativity through visual arts.",
    angle: 288, radius: 220,
  },
  {
    id: 6, title: "Robotics Challenge", category: "tech" as const,
    date: new Date(2025, 4, 15), dateLabel: "May 15", time: "11:00 AM",
    venue: "ECE Workshop", participants: 60,
    description: "Build autonomous bots and compete.",
    angle: 36, radius: 305,
  },
  {
    id: 7, title: "Basketball Tourney", category: "sports" as const,
    date: new Date(2025, 4, 20), dateLabel: "May 20", time: "5:00 PM",
    venue: "Sports Complex", participants: 80,
    description: "5v5 knockout basketball tournament.",
    angle: 108, radius: 305,
  },
  {
    id: 8, title: "Debate Championship", category: "cultural" as const,
    date: new Date(2025, 4, 22), dateLabel: "May 22", time: "3:00 PM",
    venue: "Seminar Hall", participants: 45,
    description: "Parliamentary debate — sharpen your rhetoric.",
    angle: 180, radius: 305,
  },
]

const categoryConfig = {
  tech: {
    color: "#96C0CE",
    dot: "bg-lightblue",
    badge: "bg-lightblue/20 text-midnight border border-lightblue/40",
    filter: "bg-lightblue text-midnight",
    filterInactive: "border-lightblue/30 text-midnight/60 hover:border-lightblue/60",
  },
  cultural: {
    color: "#7F0303",
    dot: "bg-maroon",
    badge: "bg-maroon/10 text-maroon border border-maroon/30",
    filter: "bg-maroon text-alabaster",
    filterInactive: "border-maroon/30 text-midnight/60 hover:border-maroon/50",
  },
  sports: {
    color: "#D8BA98",
    dot: "bg-tan-dark",
    badge: "bg-tan/40 text-midnight border border-tan/60",
    filter: "bg-tan-dark text-midnight",
    filterInactive: "border-tan/40 text-midnight/60 hover:border-tan",
  },
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// Computed once at module load — not inside render — to avoid SSR/client hydration mismatch
const TODAY = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { firstDay, daysInMonth }
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [calYear, setCalYear] = useState(YEAR)
  const [calMonth, setCalMonth] = useState(MONTH)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const { firstDay, daysInMonth } = getMonthDays(calYear, calMonth)

  // Build a map: day number -> events on that day
  const eventsByDay = useMemo(() => {
    const map: Record<number, typeof events> = {}
    events.forEach(ev => {
      if (ev.date.getFullYear() === calYear && ev.date.getMonth() === calMonth) {
        const d = ev.date.getDate()
        if (!map[d]) map[d] = []
        map[d].push(ev)
      }
    })
    return map
  }, [calYear, calMonth])

  // Events to show in the list (filtered by date + category)
  const displayedEvents = useMemo(() => {
    let list = selectedDate
      ? events.filter(ev => sameDay(ev.date, selectedDate))
      : events
    if (activeCategory !== "all") list = list.filter(e => e.category === activeCategory)
    return list
  }, [selectedDate, activeCategory])

  // Orbit centre + radii — larger for better visibility
  const cx = 350, cy = 350
  const orbitVisible = (e: (typeof events)[0]) =>
    (activeCategory === "all" || activeCategory === e.category) &&
    (!selectedDate || sameDay(e.date, selectedDate))

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  const calendarDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <section id="events" className="bg-alabaster py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-maroon font-semibold text-xs uppercase tracking-widest mb-2">Campus Life</p>
          <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance">
            Upcoming Events
          </h2>
        </div>

        {/* Two-column layout: Orbit+List | Calendar Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-8 items-start">

          {/* ── Left: Orbit + Event List stacked ── */}
          <div className="space-y-8">

            {/* Orbit Visualization */}
            <div className="relative w-full aspect-square max-w-[680px] mx-auto">
              <svg viewBox="0 0 700 700" className="w-full h-full">
                {/* Outer orbit ring */}
                <circle cx={cx} cy={cy} r={305} fill="none" stroke="#D8BA98" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.5" />
                {/* Inner orbit ring */}
                <circle cx={cx} cy={cy} r={220} fill="none" stroke="#D8BA98" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.8" />
                {/* Subtle inner glow */}
                <circle cx={cx} cy={cy} r={100} fill="none" stroke="#96C0CE" strokeWidth="0.5" opacity="0.2" />

                {/* Center hub */}
                <circle cx={cx} cy={cy} r={58} fill="#0F414A" />
                <circle cx={cx} cy={cy} r={55} fill="none" stroke="#96C0CE" strokeWidth="2" opacity="0.5" />
                <circle cx={cx} cy={cy} r={48} fill="none" stroke="#96C0CE" strokeWidth="0.5" opacity="0.3" />
                <text x={cx} y={cy - 8} textAnchor="middle" fill="#EFE8DF" fontSize="13" fontWeight="bold" fontFamily="Georgia, serif">BMSIT</text>
                <text x={cx} y={cy + 8} textAnchor="middle" fill="#96C0CE" fontSize="9" letterSpacing="2">EVENTS</text>

                {events.map(event => {
                  const rad = (event.angle * Math.PI) / 180
                  const ex = Math.round((cx + event.radius * Math.cos(rad)) * 1000) / 1000
                  const ey = Math.round((cy + event.radius * Math.sin(rad)) * 1000) / 1000
                  const cfg = categoryConfig[event.category]
                  const isVisible = orbitVisible(event)
                  const isHovered = hoveredId === event.id
                  const isSelected = selectedEvent?.id === event.id
                  const nodeR = isHovered || isSelected ? 30 : 22

                  return (
                    <g
                      key={`orbit-node-${event.id}`}
                      style={{ cursor: "pointer", opacity: isVisible ? 1 : 0.1, transition: "opacity 0.3s" }}
                      onClick={() => setSelectedEvent(isSelected ? null : event)}
                      onMouseEnter={() => setHoveredId(event.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Connection line from centre */}
                      <line
                        x1={cx} y1={cy} x2={ex} y2={ey}
                        stroke={cfg.color} strokeWidth="0.5" opacity={isHovered || isSelected ? 0.5 : 0.15}
                        strokeDasharray="4 6"
                      />
                      {/* Outer glow pulse ring */}
                      <circle cx={ex} cy={ey} r={nodeR + 12}
                        fill={cfg.color} opacity={isHovered || isSelected ? 0.18 : 0.05}
                        style={{ transition: "all 0.2s" }}
                      />
                      {/* Main node circle */}
                      <circle cx={ex} cy={ey} r={nodeR}
                        fill={cfg.color}
                        stroke={isSelected ? "#EFE8DF" : isHovered ? "#EFE8DF" : "none"}
                        strokeWidth="2.5"
                        style={{ transition: "all 0.2s" }}
                      />
                      {/* Date label inside node */}
                      <text x={ex} y={ey + 4} textAnchor="middle"
                        fill={event.category === "sports" ? "#0F414A" : "#EFE8DF"}
                        fontSize={isHovered || isSelected ? "9" : "8"}
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                        style={{ transition: "font-size 0.2s" }}
                      >
                        {event.dateLabel}
                      </text>
                      {/* Event title below node */}
                      <text x={ex} y={ey + nodeR + 14} textAnchor="middle"
                        fill="#0F414A" fontSize="9" fontWeight="600"
                        className="pointer-events-none select-none"
                      >
                        {event.title.length > 16 ? event.title.slice(0, 14) + "…" : event.title}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* HTML hover popup card — positioned over SVG */}
              {hoveredId && (() => {
                const event = events.find(e => e.id === hoveredId)
                if (!event) return null
                const rad = (event.angle * Math.PI) / 180
                // Convert SVG coords (0-700) to percentage for the overlay
                const pxPct = ((cx + event.radius * Math.cos(rad)) / 700) * 100
                const pyPct = ((cy + event.radius * Math.sin(rad)) / 700) * 100
                const cfg = categoryConfig[event.category]
                // Flip card left/right and up/down depending on quadrant
                const flipX = pxPct > 60
                const flipY = pyPct > 60
                return (
                  <div
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: `${pxPct}%`,
                      top: `${pyPct}%`,
                      transform: `translate(${flipX ? "-110%" : "10%"}, ${flipY ? "-110%" : "10%"})`,
                    }}
                  >
                    <div className="bg-alabaster border border-tan/80 rounded-xl shadow-xl p-4 w-52">
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 capitalize ${cfg.badge}`}>
                        {event.category}
                      </span>
                      <p className="font-serif font-bold text-sm text-midnight leading-snug mb-2">{event.title}</p>
                      <p className="text-midnight/60 text-xs leading-relaxed mb-2">{event.description}</p>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-midnight/70">
                          <span className="font-medium text-lightblue-dark">Date:</span>
                          <span>{event.dateLabel}</span>
                          <span className="text-midnight/40">·</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-midnight/70">
                          <span className="font-medium text-lightblue-dark">Venue:</span>
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-midnight/70">
                          <span className="font-medium text-lightblue-dark">Expected:</span>
                          <span>{event.participants} attendees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            <p className="text-center text-midnight/40 text-xs -mt-4">
              Hover to preview · Click to open full details
            </p>
            {/* ── Event Detail / List (below orbit) ── */}
            <div className="min-h-[200px]">
              {selectedDate && (
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-midnight text-sm">
                    Events on {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}
                    <span className="ml-2 text-maroon font-bold">{displayedEvents.length}</span>
                  </h3>
                  <button onClick={() => setSelectedDate(null)} className="text-midnight/40 hover:text-midnight text-xs underline">
                    Clear
                  </button>
                </div>
              )}

              {selectedEvent ? (
                /* Detail card */
                <div className="bg-tan/20 rounded-2xl p-5 border border-tan/60 relative">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 text-midnight/40 hover:text-midnight"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 capitalize ${categoryConfig[selectedEvent.category].badge}`}>
                    {selectedEvent.category}
                  </span>
                  <h3 className="font-serif font-black text-2xl text-midnight mb-2">{selectedEvent.title}</h3>
                  <p className="text-midnight/60 text-sm leading-relaxed mb-5">{selectedEvent.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-lightblue-dark flex-shrink-0" />
                      <span className="text-midnight/70 text-sm">{selectedEvent.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-lightblue-dark flex-shrink-0" />
                      <span className="text-midnight/70 text-sm">{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-lightblue-dark flex-shrink-0" />
                      <span className="text-midnight/70 text-sm">{selectedEvent.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-lightblue-dark flex-shrink-0" />
                      <span className="text-midnight/70 text-sm">{selectedEvent.participants} expected</span>
                    </div>
                  </div>
                  <Button className="w-full bg-maroon hover:bg-maroon-light text-alabaster font-semibold">
                    Register Now
                  </Button>
                </div>
              ) : (
                /* Event list */
                <div className="grid sm:grid-cols-2 gap-2">
                  {displayedEvents.length === 0 ? (
                    <div className="text-center py-12 col-span-2">
                      <p className="text-midnight/40 font-medium mb-1">No events on this day</p>
                      <p className="text-midnight/30 text-xs">Try another date or clear the filter</p>
                    </div>
                  ) : (
                    displayedEvents.map(event => {
                      const cfg = categoryConfig[event.category]
                      return (
                        <button
                          key={`list-${event.id}`}
                          onClick={() => setSelectedEvent(event)}
                          className="w-full text-left rounded-xl p-3.5 border border-tan/50 bg-tan/10 hover:bg-tan/25 hover:border-tan transition-all group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                              <span className="text-midnight text-sm font-medium truncate">{event.title}</span>
                            </div>
                            <span className="text-midnight/40 text-xs flex-shrink-0">{event.dateLabel}</span>
                          </div>
                          <div className="mt-1 ml-4.5 flex items-center gap-3">
                            <span className="text-midnight/50 text-xs">{event.time}</span>
                            <span className="text-midnight/50 text-xs truncate">{event.venue}</span>
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          </div>{/* end left column */}

          {/* ── Right: Calendar + Filters Sidebar ── */}
          <div className="space-y-4">
            {/* Calendar card */}
            <div className="bg-midnight rounded-2xl p-5 border border-midnight-light/40">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-1 rounded-lg text-lightblue hover:bg-midnight-light/40 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-alabaster text-sm font-semibold">
                  {MONTHS[calMonth]} {calYear}
                </span>
                <button onClick={nextMonth} className="p-1 rounded-lg text-lightblue hover:bg-midnight-light/40 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                  <div key={`day-hdr-${d}`} className="text-center text-lightblue/60 text-[10px] font-semibold py-1">
                    {d[0]}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {calendarDays.map((day, idx) => {
                  if (!day) return <div key={`cal-empty-${idx}`} />

                  const thisDate = new Date(calYear, calMonth, day)
                  const isToday = sameDay(thisDate, TODAY)
                  const isSelected = selectedDate && sameDay(thisDate, selectedDate)
                  const eventsOnDay = eventsByDay[day] || []
                  const hasEvents = eventsOnDay.length > 0

                  // Category colors for dots
                  const dotColors = Array.from(new Set(eventsOnDay.map(e => e.category)))

                  return (
                    <button
                      key={`cal-day-${calYear}-${calMonth}-${day}`}
                      onClick={() => setSelectedDate(isSelected ? null : thisDate)}
                      onMouseEnter={() => setHoveredDate(thisDate)}
                      onMouseLeave={() => setHoveredDate(null)}
                      className={`relative flex flex-col items-center justify-center rounded-lg py-1 transition-all group ${
                        isSelected
                          ? "bg-maroon"
                          : isToday
                          ? "bg-lightblue/20 ring-1 ring-lightblue/60"
                          : "hover:bg-midnight-light/50"
                      }`}
                    >
                      <span className={`text-[11px] font-medium leading-none ${
                        isSelected ? "text-alabaster" : isToday ? "text-lightblue" : "text-tan/90"
                      }`}>
                        {day}
                      </span>
                      {/* Event dots */}
                      {hasEvents && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dotColors.slice(0, 3).map(cat => (
                            <div
                              key={`dot-${day}-${cat}`}
                              className="w-1 h-1 rounded-full"
                              style={{ background: categoryConfig[cat].color }}
                            />
                          ))}
                        </div>
                      )}
                      {/* Tooltip on hover */}
                      {hoveredDate && sameDay(hoveredDate, thisDate) && eventsOnDay.length > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-10 pointer-events-none">
                          <div className="bg-midnight-light text-alabaster text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap border border-lightblue/20 shadow-lg">
                            {eventsOnDay.length} event{eventsOnDay.length > 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category filters */}
            <div className="bg-tan/20 rounded-2xl p-4 border border-tan/50">
              <p className="text-midnight/50 text-[10px] font-semibold uppercase tracking-widest mb-3">Filter by Category</p>
              <div className="space-y-2">
                {(["all", "tech", "cultural", "sports"] as const).map(cat => {
                  const active = activeCategory === cat
                  const cfg = cat !== "all" ? categoryConfig[cat] : null
                  return (
                    <button
                      key={`filter-${cat}`}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left text-sm font-medium px-3 py-2 rounded-lg border transition-all capitalize flex items-center gap-2 ${
                        active
                          ? cat === "all"
                            ? "bg-midnight text-alabaster border-midnight"
                            : `${cfg!.filter} border-transparent`
                          : cat === "all"
                          ? "border-midnight/20 text-midnight/60 hover:border-midnight/40"
                          : `border-transparent text-midnight/60 ${cfg!.filterInactive}`
                      }`}
                    >
                      {cat !== "all" && (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: categoryConfig[cat as Exclude<Category, "all">].color }}
                        />
                      )}
                      {cat === "all" ? "All Events" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upcoming highlights */}
            <div className="bg-tan/20 rounded-2xl p-4 border border-tan/50">
              <p className="text-midnight/50 text-[10px] font-semibold uppercase tracking-widest mb-3">Next Up</p>
              <div className="space-y-2">
                {events.slice(0, 3).map(ev => (
                  <button
                    key={`next-${ev.id}`}
                    onClick={() => setSelectedEvent(ev)}
                    className="w-full text-left flex items-center gap-2.5 group"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: categoryConfig[ev.category].color }}
                    />
                    <div className="min-w-0">
                      <p className="text-midnight text-xs font-medium truncate group-hover:text-maroon transition-colors">{ev.title}</p>
                      <p className="text-midnight/40 text-[10px]">{ev.dateLabel} · {ev.time}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
