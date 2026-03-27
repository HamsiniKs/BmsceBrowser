"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const alumni = [
  {
    id: 1,
    name: "Priya Mehta",
    batch: "CSE 2018",
    current: "Senior Engineer, Google",
    avatar: "PM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b132df21-3c95-4848-a2db-bf640f855943-removebg-preview-ThxMN2H2Q5mJKkn1OW9ZpZMkZkRmbN.png",
    journey: [
      { role: "B.E. CSE", company: "BMSIT", duration: "2014–18", type: "education" },
      { role: "SWE Intern", company: "Amazon", duration: "Summer 2017", type: "internship" },
      { role: "Graduate Engineer", company: "Infosys", duration: "2018–19", type: "work" },
      { role: "Software Engineer", company: "Flipkart", duration: "2019–21", type: "work" },
      { role: "Senior Engineer", company: "Google", duration: "2021–Now", type: "current" },
    ],
    aiSummary: "Moved from Infosys to Google in just 3 years, driven by open-source contributions and competitive programming.",
  },
  {
    id: 2,
    name: "Arjun Sharma",
    batch: "ECE 2016",
    current: "Co-founder, TechVenture",
    avatar: "AS",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/66fc94bd-a07f-4db3-bfe5-9d416dad2d11-removebg-preview-zgMaylWOgD9aIZbCqbXYmJIvF4LfN2.png",
    journey: [
      { role: "B.E. ECE", company: "BMSIT", duration: "2012–16", type: "education" },
      { role: "Research Intern", company: "ISRO", duration: "Summer 2015", type: "internship" },
      { role: "Embedded Engineer", company: "Bosch", duration: "2016–19", type: "work" },
      { role: "Product Lead", company: "Ola", duration: "2019–22", type: "work" },
      { role: "Co-founder", company: "TechVenture", duration: "2022–Now", type: "current" },
    ],
    aiSummary: "Transitioned from embedded systems to founding a startup after building product intuition at Ola.",
  },
  {
    id: 3,
    name: "Sneha Patel",
    batch: "ISE 2019",
    current: "ML Engineer, Microsoft",
    avatar: "SP",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e86bb9b6-f693-4e80-8dd7-bd61d060c88a-removebg-preview-RzaG89wKb9WA6aytC35VKrEg8YmDVM.png",
    journey: [
      { role: "B.E. ISE", company: "BMSIT", duration: "2015–19", type: "education" },
      { role: "Data Science Intern", company: "Swiggy", duration: "Summer 2018", type: "internship" },
      { role: "Data Analyst", company: "PhonePe", duration: "2019–20", type: "work" },
      { role: "ML Engineer", company: "Uber", duration: "2020–23", type: "work" },
      { role: "ML Engineer II", company: "Microsoft", duration: "2023–Now", type: "current" },
    ],
    aiSummary: "Specialized in ML ops early, moving from analytics to high-impact ML roles in just 4 years.",
  },
  {
    id: 4,
    name: "Rohan Gupta",
    batch: "ME 2017",
    current: "Design Engineer, Tesla",
    avatar: "RG",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2c2d229f-e9e7-4812-bcf9-1bb3e661891b-removebg-preview-go3I2T2pTsXfumOlhBiO3ACBG9rMBL.png",
    journey: [
      { role: "B.E. Mechanical", company: "BMSIT", duration: "2013–17", type: "education" },
      { role: "Design Intern", company: "Tata Motors", duration: "Summer 2016", type: "internship" },
      { role: "Graduate Trainee", company: "L&T", duration: "2017–19", type: "work" },
      { role: "Design Eng.", company: "Mahindra", duration: "2019–22", type: "work" },
      { role: "Design Engineer", company: "Tesla", duration: "2022–Now", type: "current" },
    ],
    aiSummary: "Leveraged CAD expertise and a Tesla referral program to land a dream role in EV design.",
  },
]

const typeColors: Record<string, string> = {
  education: "#96C0CE",
  internship: "#D8BA98",
  work: "#1a6070",
  current: "#7F0303",
}

export function AlumniShowcase() {
  const [selectedId, setSelectedId] = useState<number>(1)
  const [timelineOffset, setTimelineOffset] = useState(0)

  const selected = alumni.find(a => a.id === selectedId)!

  return (
    <section id="alumni" className="bg-midnight py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Alumni Network</p>
          <h2 className="font-serif font-black text-4xl md:text-5xl text-alabaster text-balance">
            Their journeys,<br />your inspiration.
          </h2>
        </div>

        {/* Alumni grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {alumni.map(a => (
            <button
              key={a.id}
              onClick={() => { setSelectedId(a.id); setTimelineOffset(0) }}
              className={`rounded-2xl text-left border transition-all duration-200 overflow-hidden flex flex-col ${
                selectedId === a.id
                  ? "bg-maroon border-maroon"
                  : "bg-midnight-light/20 border-lightblue/10 hover:border-lightblue/30 hover:bg-midnight-light/40"
              }`}
            >
              {/* Image container - takes up most of the card */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Text info at bottom */}
              <div className="p-3">
                <p className={`font-serif font-bold text-base leading-tight ${selectedId === a.id ? "text-alabaster" : "text-alabaster/80"}`}>
                  {a.name}
                </p>
                <p className={`text-xs mt-0.5 ${selectedId === a.id ? "text-tan" : "text-tan/60"}`}>{a.batch}</p>
                <p className={`text-xs mt-1 leading-tight ${selectedId === a.id ? "text-tan/90" : "text-tan/50"}`}>{a.current}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-midnight-light/20 rounded-2xl p-6 border border-lightblue/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-xl text-alabaster">{selected.name}&apos;s Journey</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setTimelineOffset(Math.max(0, timelineOffset - 1))}
                className="w-7 h-7 rounded-full bg-midnight-light/50 text-tan hover:text-alabaster flex items-center justify-center"
                disabled={timelineOffset === 0}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTimelineOffset(Math.min(selected.journey.length - 3, timelineOffset + 1))}
                className="w-7 h-7 rounded-full bg-midnight-light/50 text-tan hover:text-alabaster flex items-center justify-center"
                disabled={timelineOffset >= selected.journey.length - 3}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex items-start gap-0 transition-transform duration-500"
              style={{ transform: `translateX(-${timelineOffset * (100 / selected.journey.length)}%)` }}
            >
              {selected.journey.map((node, i, arr) => (
                <div key={`${selected.id}-journey-${i}`} className="flex items-center flex-shrink-0" style={{ width: `${100 / Math.min(arr.length, 5)}%` }}>
                  <div className="flex flex-col items-center flex-1">
                    {/* Node */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-midnight font-bold text-sm shadow-lg flex-shrink-0"
                      style={{ background: typeColors[node.type] }}
                    >
                      {i + 1}
                    </div>
                    {/* Label */}
                    <div className="mt-3 text-center px-2">
                      <p className="text-alabaster text-xs font-semibold leading-tight">{node.role}</p>
                      <p className="font-mono text-xs mt-0.5" style={{ color: typeColors[node.type] }}>{node.company}</p>
                      <p className="text-tan/50 text-xs mt-0.5">{node.duration}</p>
                    </div>
                  </div>
                  {/* Connector */}
                  {i < arr.length - 1 && (
                    <div className="h-0.5 w-8 flex-shrink-0 mt-[-60px]" style={{ background: typeColors[node.type] }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI summary */}
          <div className="mt-6 bg-midnight/60 rounded-xl px-4 py-3 flex items-start gap-3 border border-lightblue/10">
            <Sparkles className="w-4 h-4 text-lightblue flex-shrink-0 mt-0.5" />
            <p className="text-tan/80 text-sm leading-relaxed italic">&ldquo;{selected.aiSummary}&rdquo;</p>
          </div>

          {/* Type legend */}
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-tan/60 text-xs capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
