"use client"

import { useState } from "react"
import { Bell, BookOpen, Calendar, Sparkles, Search, Download, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const timetable = [
  { time: "09:00", subject: "Data Structures", room: "CS-201", type: "lecture" },
  { time: "10:00", subject: "Linear Algebra", room: "MA-102", type: "lecture" },
  { time: "11:00", subject: "DBMS Lab", room: "CS-Lab-3", type: "lab" },
  { time: "12:00", subject: "Lunch Break", room: "—", type: "break" },
  { time: "14:00", subject: "Computer Networks", room: "CS-301", type: "lecture" },
  { time: "15:00", subject: "OS Concepts", room: "CS-202", type: "lecture" },
  { time: "16:00", subject: "Mini Project", room: "CS-Lab-1", type: "lab" },
]

const announcements = [
  { id: 1, title: "Semester Exam Schedule Released", date: "Mar 25", priority: "high", read: false },
  { id: 2, title: "Library Fine Waiver — April 5 Only", date: "Mar 24", priority: "medium", read: false },
  { id: 3, title: "BMSIT Placement Drive — Infosys", date: "Mar 22", priority: "high", read: true },
  { id: 4, title: "Cultural Fest Registrations Open", date: "Mar 20", priority: "low", read: true },
  { id: 5, title: "Fee Payment Deadline Extended", date: "Mar 18", priority: "medium", read: true },
]

const aiInsights = [
  "Most students are placed in Bangalore with the highest average packages.",
  "CSE department has the fastest-growing placement rate — up 12% this year.",
  "The HackNova 2025 event has the highest registration interest across all campuses.",
  "Library usage peaks on Tuesday and Thursday mornings between 9–11 AM.",
]

export function StudentUtilities() {
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState("")
  const [dismissedInsights, setDismissedInsights] = useState<number[]>([])
  const [readAnnouncements, setReadAnnouncements] = useState<number[]>([3, 4, 5])

  const typeColor = (type: string) => {
    switch (type) {
      case "lecture": return "border-l-lightblue bg-lightblue/10 text-lightblue"
      case "lab": return "border-l-maroon bg-maroon/10 text-maroon-light"
      case "break": return "border-l-tan bg-tan/10 text-tan-dark"
      default: return "border-l-tan/30 bg-midnight-light/10 text-tan"
    }
  }

  const priorityDot = (p: string) => {
    if (p === "high") return "bg-maroon"
    if (p === "medium") return "bg-tan"
    return "bg-lightblue/50"
  }

  return (
    <section id="utilities" className="bg-alabaster py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Student Portal</p>
            <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance">
              Your daily toolkit.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight/40" />
              <Input
                placeholder="Search courses, events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 border-tan bg-white text-midnight w-56 placeholder:text-midnight/30 focus:border-midnight"
              />
            </div>
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full bg-midnight flex items-center justify-center hover:bg-midnight-light transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-tan" /> : <Moon className="w-4 h-4 text-alabaster" />}
            </button>
            {/* Export */}
            <Button variant="outline" size="sm" className="border-tan text-midnight hover:bg-tan/20 gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Timetable */}
          <div className="md:col-span-2 bg-midnight rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-5 h-5 text-lightblue" />
              <h3 className="font-serif font-bold text-xl text-alabaster">Today&apos;s Timetable</h3>
              <span className="ml-auto text-tan/60 text-xs">Thursday, Mar 27</span>
            </div>
            <div className="space-y-2">
              {timetable.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 border-l-4 ${typeColor(item.type)}`}
                >
                  <span className="font-mono text-sm font-bold w-12 flex-shrink-0">{item.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-alabaster text-sm font-medium truncate">{item.subject}</p>
                    <p className="text-tan/60 text-xs">{item.room}</p>
                  </div>
                  <span className={`text-xs capitalize px-2 py-0.5 rounded-full bg-midnight/30 ${typeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="flex flex-col gap-4">
            {/* Announcements */}
            <div className="bg-midnight rounded-2xl p-5 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-lightblue" />
                <h3 className="font-serif font-bold text-lg text-alabaster">Announcements</h3>
                <span className="ml-auto bg-maroon text-alabaster text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {announcements.filter(a => !readAnnouncements.includes(a.id)).length}
                </span>
              </div>
              <div className="space-y-2">
                {announcements.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setReadAnnouncements(prev => prev.includes(a.id) ? prev : [...prev, a.id])}
                    className="w-full text-left flex items-start gap-2.5 py-2 border-b border-midnight-light/30 last:border-0 group"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${readAnnouncements.includes(a.id) ? "bg-tan/20" : priorityDot(a.priority)}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-tight ${readAnnouncements.includes(a.id) ? "text-tan/50" : "text-alabaster"} group-hover:text-alabaster transition-colors`}>
                        {a.title}
                      </p>
                      <p className="text-tan/40 text-xs mt-0.5">{a.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources quick links */}
            <div className="bg-midnight rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-lightblue" />
                <h3 className="font-serif font-bold text-base text-alabaster">Quick Resources</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Notes", "Syllabus", "PYQs", "Results"].map(r => (
                  <button
                    key={r}
                    className="bg-midnight-light/30 rounded-lg py-2.5 text-tan text-xs font-medium hover:bg-lightblue/20 hover:text-lightblue transition-all"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-lightblue" />
            <h3 className="font-serif font-bold text-xl text-midnight">AI Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiInsights.map((insight, i) => {
              if (dismissedInsights.includes(i)) return null
              return (
                <div
                  key={i}
                  className="bg-midnight rounded-xl px-4 py-3 flex items-start gap-3 border border-lightblue/10 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-lightblue flex-shrink-0 mt-0.5" />
                  <p className="text-tan/80 text-sm leading-relaxed flex-1">{insight}</p>
                  <button
                    onClick={() => setDismissedInsights(prev => [...prev, i])}
                    className="text-tan/30 hover:text-tan opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
