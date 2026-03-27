"use client"

import { useState } from "react"
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts"
import { TrendingUp, Users, Award, DollarSign, Filter, Building2 } from "lucide-react"

const kpis = [
  { label: "Students Placed", value: "4,812", change: "+12%", icon: Users, color: "text-lightblue" },
  { label: "Total Offers", value: "5,240", change: "+18%", icon: Award, color: "text-tan" },
  { label: "Highest Package", value: "₹48 LPA", change: "+8%", icon: TrendingUp, color: "text-maroon-light" },
  { label: "Average Package", value: "₹7.2 LPA", change: "+5%", icon: DollarSign, color: "text-lightblue" },
]

const cityData = [
  { city: "Bangalore", students: 1840, avg: 9.2, companies: ["Google", "Infosys", "Wipro"] },
  { city: "Hyderabad", students: 620, avg: 7.8, companies: ["Amazon", "Microsoft"] },
  { city: "Pune", students: 480, avg: 7.1, companies: ["TCS", "Cognizant"] },
  { city: "Mumbai", students: 390, avg: 8.4, companies: ["JP Morgan", "Goldman Sachs"] },
  { city: "Chennai", students: 310, avg: 6.9, companies: ["HCL", "Zoho"] },
  { city: "Delhi", students: 250, avg: 8.0, companies: ["Deloitte", "EY"] },
]

const barData = cityData.map(c => ({ name: c.city, students: c.students }))

const pieData = [
  { name: "Product", value: 35, color: "#96C0CE" },
  { name: "Service", value: 45, color: "#0F414A" },
  { name: "Finance", value: 12, color: "#7F0303" },
  { name: "Research", value: 8, color: "#D8BA98" },
]

const trendData = [
  { year: "2019", placed: 72 },
  { year: "2020", placed: 78 },
  { year: "2021", placed: 81 },
  { year: "2022", placed: 86 },
  { year: "2023", placed: 91 },
  { year: "2024", placed: 96 },
]

const recruiters = [
  "Google", "Amazon", "Microsoft", "Infosys", "TCS", "Wipro",
  "Deloitte", "Accenture", "IBM", "Oracle", "Goldman Sachs", "JP Morgan",
]

const indianStates: { name: string; x: number; y: number; value: number }[] = [
  { name: "Karnataka", x: 30, y: 64, value: 1840 },
  { name: "Tamil Nadu", x: 34, y: 72, value: 310 },
  { name: "Maharashtra", x: 26, y: 56, value: 390 },
  { name: "Telangana", x: 35, y: 60, value: 620 },
  { name: "Delhi", x: 32, y: 30, value: 250 },
  { name: "Gujarat", x: 20, y: 50, value: 180 },
  { name: "West Bengal", x: 50, y: 46, value: 140 },
  { name: "Rajasthan", x: 24, y: 40, value: 90 },
  { name: "UP", x: 38, y: 38, value: 120 },
  { name: "Punjab", x: 28, y: 28, value: 60 },
]

export function PlacementsDashboard() {
  const [selectedCity, setSelectedCity] = useState<string | null>("Bangalore")
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  const activeCity = cityData.find(c => c.city === selectedCity)

  const getRadius = (val: number) => Math.max(8, Math.min(28, val / 60))
  const getOpacity = (val: number) => 0.3 + (val / 2000) * 0.7

  return (
    <section id="placements" className="bg-alabaster py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-maroon font-medium text-sm uppercase tracking-widest mb-2">Placements 2024</p>
            <h2 className="font-serif font-black text-4xl md:text-5xl text-midnight text-balance">
              Placement Analytics
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-midnight text-alabaster text-sm px-4 py-2 rounded-lg hover:bg-midnight-light transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <div key={kpi.label} className="bg-midnight rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${kpi.color}`} strokeWidth={1.5} />
                  <span className="text-lightblue text-xs font-medium">{kpi.change}</span>
                </div>
                <div>
                  <p className="font-serif font-black text-2xl text-alabaster">{kpi.value}</p>
                  <p className="text-tan/70 text-xs mt-0.5">{kpi.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Map + City panel */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* India placement map */}
          <div className="md:col-span-2 bg-midnight rounded-2xl p-6">
            <h3 className="font-serif font-bold text-xl text-alabaster mb-4">Placement Heatmap — India</h3>
            <div className="relative w-full" style={{ paddingBottom: "75%" }}>
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Simplified India outline */}
                <path
                  d="M20,20 L45,18 L65,22 L75,30 L72,42 L68,50 L62,58 L55,65 L50,72 L44,78 L40,82 L36,78 L32,72 L28,65 L22,58 L18,50 L15,40 L16,30 Z"
                  fill="#1a6070"
                  stroke="#96C0CE"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                {/* State dots */}
                {indianStates.map((state) => (
                  <g key={state.name}>
                    <circle
                      cx={state.x}
                      cy={state.y}
                      r={getRadius(state.value)}
                      fill="#7F0303"
                      opacity={getOpacity(state.value)}
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredState(state.name)}
                      onMouseLeave={() => setHoveredState(null)}
                    />
                    <circle
                      cx={state.x}
                      cy={state.y}
                      r="2"
                      fill="#EFE8DF"
                      opacity="0.9"
                    />
                  </g>
                ))}
              </svg>
              {hoveredState && (() => {
                const s = indianStates.find(st => st.name === hoveredState)
                if (!s) return null
                return (
                  <div
                    className="absolute bg-midnight-light text-alabaster text-xs px-3 py-2 rounded-lg pointer-events-none shadow-lg border border-lightblue/20 z-10"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -120%)" }}
                  >
                    <p className="font-bold">{s.name}</p>
                    <p className="text-lightblue">{s.value} students</p>
                  </div>
                )
              })()}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-maroon opacity-30" />
                <span className="text-tan/60 text-xs">Low</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-maroon opacity-60" />
                <span className="text-tan/60 text-xs">Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-maroon opacity-100" />
                <span className="text-tan/60 text-xs">High</span>
              </div>
            </div>
          </div>

          {/* City panel */}
          <div className="bg-midnight rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="font-serif font-bold text-lg text-alabaster mb-1">City Breakdown</h3>
            <div className="flex flex-col gap-2 flex-1">
              {cityData.map((city) => (
                <button
                  key={city.city}
                  onClick={() => setSelectedCity(city.city)}
                  className={`w-full text-left rounded-xl p-3 transition-all duration-200 ${
                    selectedCity === city.city
                      ? "bg-maroon text-alabaster"
                      : "bg-midnight-light/30 text-tan hover:bg-midnight-light/60"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">{city.city}</span>
                    <span className={`text-xs font-mono ${selectedCity === city.city ? "text-tan" : "text-lightblue"}`}>
                      ₹{city.avg}L
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${selectedCity === city.city ? "text-tan" : "text-tan/50"}`}>
                    {city.students} placed
                  </p>
                </button>
              ))}
            </div>
            {activeCity && (
              <div className="bg-midnight-light/30 rounded-xl p-3 border border-lightblue/10">
                <p className="text-tan text-xs mb-1.5">Top Recruiters in {activeCity.city}</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeCity.companies.map(c => (
                    <span key={c} className="text-xs bg-lightblue/20 text-lightblue px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Bar chart */}
          <div className="md:col-span-1 bg-midnight rounded-2xl p-5">
            <h3 className="font-serif font-bold text-base text-alabaster mb-4">Top Cities</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a6070" />
                <XAxis dataKey="name" tick={{ fill: "#D8BA98", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#D8BA98", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0F414A", border: "1px solid #1a6070", borderRadius: 8, color: "#EFE8DF", fontSize: 12 }} />
                <Bar dataKey="students" fill="#96C0CE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="md:col-span-1 bg-midnight rounded-2xl p-5">
            <h3 className="font-serif font-bold text-base text-alabaster mb-4">By Company Type</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0F414A", border: "1px solid #1a6070", borderRadius: 8, color: "#EFE8DF", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-tan/70 text-xs">{d.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line chart */}
          <div className="md:col-span-1 bg-midnight rounded-2xl p-5">
            <h3 className="font-serif font-bold text-base text-alabaster mb-4">Placement Trend %</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trendData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a6070" />
                <XAxis dataKey="year" tick={{ fill: "#D8BA98", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#D8BA98", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0F414A", border: "1px solid #1a6070", borderRadius: 8, color: "#EFE8DF", fontSize: 12 }} />
                <Line type="monotone" dataKey="placed" stroke="#7F0303" strokeWidth={2.5} dot={{ fill: "#D8BA98", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruiter logos */}
        <div className="bg-midnight rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-5 h-5 text-lightblue" />
            <h3 className="font-serif font-bold text-xl text-alabaster">Top Recruiters</h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {recruiters.map((r) => (
              <div
                key={r}
                className="bg-midnight-light/30 rounded-xl px-3 py-3 flex items-center justify-center border border-lightblue/10 hover:border-lightblue/30 hover:bg-midnight-light/60 transition-all cursor-pointer"
              >
                <span className="text-tan text-xs font-semibold text-center">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
