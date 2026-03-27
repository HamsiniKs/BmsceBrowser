"use client"

import { useState } from "react"
import { Zap, Wind, Volume2, Sun, Clock, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SeatStatus = "available" | "occupied" | "reserved" | "selected"

interface Seat {
  id: string
  row: number
  col: number
  status: SeatStatus
  charging: boolean
  window: boolean
  ac: boolean
  noiseLevel: "low" | "medium" | "high"
}

function generateSeats(): Seat[] {
  const seats: Seat[] = []
  const rows = 6
  const cols = 10
  const statusPool: SeatStatus[] = ["available", "available", "available", "occupied", "occupied", "reserved"]
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      seats.push({
        id: `${String.fromCharCode(65 + r)}${c + 1}`,
        row: r,
        col: c,
        status: statusPool[Math.floor(Math.random() * statusPool.length)],
        charging: Math.random() > 0.6,
        window: c === 0 || c === cols - 1,
        ac: r < 3,
        noiseLevel: r < 2 ? "low" : r < 4 ? "medium" : "high",
      })
    }
  }
  return seats
}

const initialSeats = generateSeats()

const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"]

export function SeatFinder() {
  const [seats, setSeats] = useState(initialSeats)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [timeSlot, setTimeSlot] = useState(timeSlots[0])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null)

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "occupied" || seat.status === "reserved") return
    setSeats(prev =>
      prev.map(s => {
        if (s.id === seat.id) {
          if (s.status === "selected") {
            setSelectedSeats(sel => sel.filter(id => id !== s.id))
            return { ...s, status: "available" }
          } else {
            setSelectedSeats(sel => [...sel, s.id])
            return { ...s, status: "selected" }
          }
        }
        return s
      })
    )
  }

  const findBestSeat = () => {
    const query = searchQuery.toLowerCase()
    const match = seats.find(s =>
      s.status === "available" &&
      (query.includes("window") ? s.window : true) &&
      (query.includes("charg") ? s.charging : true) &&
      (query.includes("quiet") || query.includes("low") ? s.noiseLevel === "low" : true) &&
      (query.includes("ac") ? s.ac : true)
    )
    if (match) {
      setSeats(prev =>
        prev.map(s => {
          if (s.id === match.id) {
            setSelectedSeats(sel => [...sel, s.id])
            return { ...s, status: "selected" }
          }
          return s
        })
      )
    }
  }

  const statusColor = (s: SeatStatus, heatmap: boolean, row: number) => {
    if (heatmap) {
      const heat = row < 2 ? "bg-maroon/80" : row < 4 ? "bg-tan" : "bg-lightblue/50"
      return heat
    }
    switch (s) {
      case "available": return "bg-lightblue/40 border-lightblue/60 hover:bg-lightblue/70 cursor-pointer"
      case "occupied": return "bg-maroon/60 border-maroon/40 cursor-not-allowed"
      case "reserved": return "bg-tan/60 border-tan/40 cursor-not-allowed"
      case "selected": return "bg-lightblue border-lightblue ring-2 ring-lightblue/40 cursor-pointer"
    }
  }

  const available = seats.filter(s => s.status === "available").length
  const occupied = seats.filter(s => s.status === "occupied").length

  return (
    <section id="seat-finder" className="bg-alabaster py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Smart Campus</p>
          <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance">
            Seat Finder
          </h2>
          <p className="text-midnight/50 text-sm mt-2">Library — Block A, Level 2</p>
        </div>

        {/* Live status bar */}
        <div className="flex flex-wrap items-center gap-6 bg-midnight rounded-xl px-5 py-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lightblue animate-pulse" />
            <span className="text-lightblue text-sm font-medium">{available} Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-maroon" />
            <span className="text-tan text-sm">{occupied} Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tan" />
            <span className="text-tan text-sm">{seats.filter(s => s.status === "reserved").length} Reserved</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Clock className="w-4 h-4 text-lightblue" />
            <span className="text-lightblue text-sm">Peak: 11am–2pm</span>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 flex-1 min-w-48">
            <Search className="w-4 h-4 text-midnight/40 flex-shrink-0" />
            <Input
              placeholder="Try: window seat, charging, quiet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-tan bg-white text-midnight placeholder:text-midnight/40 focus:border-midnight"
            />
          </div>
          <Button
            onClick={findBestSeat}
            className="bg-midnight hover:bg-midnight-light text-alabaster flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Find Best Seat
          </Button>
          <Button
            variant={showHeatmap ? "default" : "outline"}
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={showHeatmap
              ? "bg-maroon text-alabaster border-maroon"
              : "border-tan text-midnight hover:bg-tan/20"
            }
          >
            Heatmap
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Seat map */}
          <div className="md:col-span-2 bg-midnight rounded-2xl p-5">
            {/* Screen/Entrance indicator */}
            <div className="bg-midnight-light/60 rounded-lg h-8 flex items-center justify-center mb-4">
              <span className="text-tan/60 text-xs tracking-widest uppercase">Entrance / Study Zone A</span>
            </div>

            {/* Seat grid */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[400px]">
                {Array.from({ length: 6 }, (_, r) => (
                  <div key={r} className="flex gap-1.5 mb-1.5 items-center">
                    <span className="text-tan/40 text-xs w-4 flex-shrink-0">{String.fromCharCode(65 + r)}</span>
                    <div className="flex gap-1.5 flex-1">
                      {seats.filter(s => s.row === r).map(seat => (
                        <div key={seat.id} className="relative flex-1" style={{ maxWidth: 38 }}>
                          <button
                            className={`w-full aspect-square rounded-md border transition-all text-[9px] font-bold flex items-center justify-center ${statusColor(seat.status, showHeatmap, r)}`}
                            onClick={() => toggleSeat(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                          >
                            {!showHeatmap && (
                              <span className={seat.status === "available" || seat.status === "selected" ? "text-midnight" : "text-alabaster/50"}>
                                {seat.col + 1}
                              </span>
                            )}
                          </button>
                          {seat.charging && !showHeatmap && (
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-tan rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-midnight-light/40">
              {[
                { color: "bg-lightblue/40 border border-lightblue/60", label: "Available" },
                { color: "bg-maroon/60 border border-maroon/40", label: "Occupied" },
                { color: "bg-tan/60 border border-tan/40", label: "Reserved" },
                { color: "bg-lightblue border border-lightblue", label: "Selected" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-sm ${item.color}`} />
                  <span className="text-tan/70 text-xs">{item.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-tan" />
                <span className="text-tan/70 text-xs">Charging</span>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Hovered seat details */}
            {hoveredSeat && (
              <div className="bg-midnight rounded-2xl p-4 border border-lightblue/20">
                <p className="text-lightblue font-bold text-sm mb-3">Seat {hoveredSeat.id}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Zap, label: "Charging", val: hoveredSeat.charging, color: hoveredSeat.charging ? "text-tan" : "text-tan/30" },
                    { icon: Sun, label: "Window", val: hoveredSeat.window, color: hoveredSeat.window ? "text-lightblue" : "text-tan/30" },
                    { icon: Wind, label: "AC", val: hoveredSeat.ac, color: hoveredSeat.ac ? "text-lightblue" : "text-tan/30" },
                    { icon: Volume2, label: hoveredSeat.noiseLevel, val: true, color: hoveredSeat.noiseLevel === "low" ? "text-lightblue" : hoveredSeat.noiseLevel === "medium" ? "text-tan" : "text-maroon-light" },
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                        <span className={`text-xs capitalize ${item.color}`}>{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Time slot selector */}
            <div className="bg-midnight rounded-2xl p-4">
              <p className="text-tan text-xs font-medium mb-3 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-lightblue" />
                Select Time Slot
              </p>
              <div className="flex flex-col gap-1.5">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`text-xs py-2 px-3 rounded-lg text-left transition-all ${
                      timeSlot === slot
                        ? "bg-maroon text-alabaster"
                        : "bg-midnight-light/30 text-tan hover:bg-midnight-light/60"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected seats & reserve */}
            <div className="bg-midnight rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-tan text-xs font-medium">Selected Seats</p>
                <span className="text-lightblue text-xs font-bold">{selectedSeats.length}</span>
              </div>
              {selectedSeats.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSeats.map(id => (
                      <span key={id} className="bg-lightblue/20 text-lightblue text-xs px-2 py-0.5 rounded-full font-mono">{id}</span>
                    ))}
                  </div>
                  <div className="text-xs text-tan/60">{timeSlot}</div>
                  <Button className="w-full bg-maroon hover:bg-maroon-light text-alabaster mt-1">
                    Reserve Seats
                  </Button>
                </>
              ) : (
                <p className="text-tan/40 text-xs">No seats selected yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
