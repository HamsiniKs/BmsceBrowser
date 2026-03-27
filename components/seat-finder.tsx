"use client"

import { useState, useEffect } from "react"
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

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
]

export function SeatFinder() {
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [timeSlot, setTimeSlot] = useState(timeSlots[0])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null)

  // ✅ Generate seats ONLY on client
  useEffect(() => {
    setSeats(generateSeats())
  }, [])

  // ✅ Prevent hydration mismatch
  if (seats.length === 0) return null

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
      return row < 2 ? "bg-maroon/80" : row < 4 ? "bg-tan" : "bg-lightblue/50"
    }

    switch (s) {
      case "available":
        return "bg-lightblue/40 border-lightblue/60 hover:bg-lightblue/70 cursor-pointer"
      case "occupied":
        return "bg-maroon/60 border-maroon/40 cursor-not-allowed"
      case "reserved":
        return "bg-tan/60 border-tan/40 cursor-not-allowed"
      case "selected":
        return "bg-lightblue border-lightblue ring-2 ring-lightblue/40 cursor-pointer"
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
          <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight">
            Seat Finder
          </h2>
          <p className="text-midnight/50 text-sm mt-2">Library — Block A, Level 2</p>
        </div>

        {/* Status */}
        <div className="flex flex-wrap items-center gap-6 bg-midnight rounded-xl px-5 py-3 mb-6">
          <span className="text-lightblue text-sm">{available} Available</span>
          <span className="text-tan text-sm">{occupied} Occupied</span>
          <span className="text-tan text-sm">
            {seats.filter(s => s.status === "reserved").length} Reserved
          </span>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="window, charging, quiet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={findBestSeat}>Find</Button>
        </div>

        {/* Seat Grid */}
        <div className="grid grid-cols-10 gap-2">
          {seats.map(seat => (
            <button
              key={seat.id}
              onClick={() => toggleSeat(seat)}
              className={`p-2 text-xs rounded ${statusColor(seat.status, showHeatmap, seat.row)}`}
            >
              {seat.id}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}