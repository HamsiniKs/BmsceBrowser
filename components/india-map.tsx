"use client"

import { useState, useRef, useCallback } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Sparkles, X } from "lucide-react"

export interface StateData {
  students: number
  companies: string[]
}

interface CityMarker {
  name: string
  state: string
  x: number
  y: number
  students: number
  avg: number
  topRecruiters: string[]
}

interface Props {
  stateData: Record<string, StateData>
}

const CITIES: CityMarker[] = [
  { name: "Bangalore",  state: "Karnataka",   x: 228, y: 432, students: 1840, avg: 9.2, topRecruiters: ["Google","Infosys","Wipro","Flipkart","Amazon"] },
  { name: "Hyderabad",  state: "Telangana",   x: 254, y: 370, students: 620,  avg: 7.8, topRecruiters: ["Amazon","Microsoft","Deloitte","Cyient"] },
  { name: "Chennai",    state: "Tamil Nadu",  x: 264, y: 462, students: 310,  avg: 6.9, topRecruiters: ["HCL","Zoho","TCS","Cognizant"] },
  { name: "Mumbai",     state: "Maharashtra", x: 166, y: 308, students: 390,  avg: 8.4, topRecruiters: ["JP Morgan","Goldman Sachs","KPMG","Accenture"] },
  { name: "Pune",       state: "Maharashtra", x: 182, y: 328, students: 480,  avg: 7.1, topRecruiters: ["TCS","Cognizant","Infosys","Capgemini"] },
  { name: "Delhi",      state: "Delhi",       x: 229, y: 138, students: 250,  avg: 8.0, topRecruiters: ["Deloitte","EY","PWC","Paytm"] },
]

const MAX_STUDENTS = 1840
const MIN_R = 10
const MAX_R = 32

function markerRadius(students: number) {
  return MIN_R + ((students / MAX_STUDENTS) * (MAX_R - MIN_R))
}

// Accurate India SVG paths — viewBox "0 0 560 600"
const STATE_PATHS: { name: string; d: string }[] = [
  { name: "Jammu & Kashmir",
    d: "M130,10 L165,6 L200,14 L230,8 L258,10 L278,26 L272,50 L256,64 L240,68 L224,60 L208,66 L193,60 L175,52 L160,38 Z" },
  { name: "Himachal Pradesh",
    d: "M224,60 L240,68 L258,64 L274,70 L278,88 L265,102 L250,106 L235,98 L226,85 Z" },
  { name: "Punjab",
    d: "M175,66 L193,60 L208,66 L224,60 L226,85 L218,102 L204,106 L190,101 L181,86 Z" },
  { name: "Uttarakhand",
    d: "M265,80 L278,88 L290,82 L316,84 L320,102 L306,114 L290,112 L275,105 L268,96 Z" },
  { name: "Haryana",
    d: "M190,101 L204,106 L218,102 L226,112 L222,130 L208,135 L197,130 L191,118 Z" },
  { name: "Delhi",
    d: "M222,114 L231,112 L238,118 L236,128 L229,130 L222,122 Z" },
  { name: "Uttar Pradesh",
    d: "M236,118 L268,110 L306,114 L338,118 L366,125 L378,140 L370,162 L352,170 L326,172 L300,166 L275,160 L253,150 L240,140 L236,130 Z" },
  { name: "Rajasthan",
    d: "M146,120 L176,116 L191,118 L197,130 L208,135 L222,130 L236,136 L232,158 L218,177 L208,200 L192,215 L176,220 L159,215 L146,200 L138,180 L140,157 Z" },
  { name: "Bihar",
    d: "M378,140 L402,134 L424,137 L434,146 L430,165 L413,174 L394,169 L379,162 Z" },
  { name: "West Bengal",
    d: "M430,165 L446,160 L458,164 L464,177 L460,198 L452,216 L440,224 L430,217 L422,202 L418,184 Z" },
  { name: "Jharkhand",
    d: "M379,162 L394,169 L413,174 L423,184 L418,202 L405,208 L390,204 L378,194 L376,180 Z" },
  { name: "Sikkim",
    d: "M440,128 L450,125 L456,134 L450,141 L441,139 Z" },
  { name: "Assam",
    d: "M460,157 L483,152 L505,155 L514,167 L506,180 L489,183 L471,180 L461,169 Z" },
  { name: "Arunachal Pradesh",
    d: "M483,132 L510,126 L537,130 L544,143 L537,155 L514,157 L505,155 L483,152 L477,144 Z" },
  { name: "Nagaland",
    d: "M506,167 L523,165 L530,174 L525,186 L513,187 L506,180 Z" },
  { name: "Manipur",
    d: "M513,187 L525,186 L533,194 L530,206 L519,211 L510,204 L509,194 Z" },
  { name: "Mizoram",
    d: "M510,211 L520,211 L525,222 L519,234 L510,234 L505,224 Z" },
  { name: "Tripura",
    d: "M490,201 L500,198 L507,206 L503,218 L493,219 L488,212 Z" },
  { name: "Meghalaya",
    d: "M461,177 L483,173 L492,180 L492,190 L481,193 L465,191 L459,183 Z" },
  { name: "Madhya Pradesh",
    d: "M232,164 L253,154 L275,160 L300,166 L326,172 L348,184 L350,200 L342,220 L322,234 L299,238 L276,234 L253,227 L235,216 L223,204 L222,186 Z" },
  { name: "Chhattisgarh",
    d: "M348,184 L371,180 L388,187 L390,204 L405,208 L408,224 L400,240 L384,248 L367,251 L352,244 L340,234 L340,220 Z" },
  { name: "Odisha",
    d: "M405,208 L418,202 L432,204 L442,216 L442,234 L434,251 L420,258 L407,254 L400,244 L400,230 Z" },
  { name: "Gujarat",
    d: "M138,200 L146,220 L149,240 L152,258 L145,274 L133,284 L120,276 L110,260 L106,243 L110,226 L124,215 Z" },
  { name: "Maharashtra",
    d: "M152,258 L159,274 L166,288 L179,302 L196,311 L218,314 L242,311 L262,304 L280,294 L290,281 L292,266 L281,254 L262,248 L240,244 L218,244 L198,246 L178,250 L161,254 Z" },
  { name: "Telangana",
    d: "M290,266 L314,258 L334,258 L348,268 L350,285 L341,304 L325,314 L308,314 L295,304 L290,287 Z" },
  { name: "Andhra Pradesh",
    d: "M295,304 L308,314 L325,314 L341,304 L355,314 L359,331 L352,351 L338,364 L322,368 L306,361 L293,348 L288,331 L291,317 Z" },
  { name: "Karnataka",
    d: "M218,314 L242,311 L262,304 L280,294 L291,304 L288,317 L288,331 L278,348 L264,361 L248,368 L231,364 L215,354 L202,341 L200,324 L208,314 Z" },
  { name: "Goa",
    d: "M203,351 L211,348 L217,354 L215,362 L208,364 L203,357 Z" },
  { name: "Tamil Nadu",
    d: "M248,368 L264,361 L278,348 L288,361 L293,374 L291,391 L283,408 L271,421 L258,424 L245,416 L238,401 L238,384 L243,370 Z" },
  { name: "Kerala",
    d: "M231,364 L243,368 L243,384 L241,401 L235,416 L228,424 L221,418 L218,404 L221,388 L225,374 Z" },
]

function getFill(name: string, data: StateData | undefined, isHovered: boolean): string {
  if (isHovered) return "#D8BA98"
  if (name === "Karnataka") return "#0a3540"
  if (!data || data.students === 0) return "#0d3e48"
  const ratio = Math.min(data.students / MAX_STUDENTS, 1)
  if (ratio > 0.5) return "#1d7a8a"
  if (ratio > 0.15) return "#155f6e"
  return "#104b58"
}

export default function IndiaMap({ stateData }: Props) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<CityMarker | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.3, 4))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.3, 0.6))
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging) setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }, [dragging, dragStart])

  const handleMouseUp = () => setDragging(false)

  const getPct = (e: React.MouseEvent): { x: number; y: number } | null => {
    if (!containerRef.current) return null
    const rect = containerRef.current.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }

  const topCity = CITIES.reduce((a, b) => a.students > b.students ? a : b)

  return (
    <div className="flex flex-col gap-4">
      {/* AI Insight Banner */}
      <div className="flex items-start gap-3 bg-midnight-light/40 border border-lightblue/20 rounded-xl px-4 py-3">
        <Sparkles className="w-4 h-4 text-lightblue mt-0.5 flex-shrink-0" />
        <p className="text-tan text-xs leading-relaxed">
          <span className="text-lightblue font-semibold">AI Insight: </span>
          Bangalore leads with 1,840 placements — 38% of total. Product companies grew 12% YoY. Hyderabad and Pune are the fastest-growing hubs. Average package up 5% to ₹7.2 LPA.
        </p>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Map */}
        <div className="flex-1 relative">
          {/* Zoom controls */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5">
            {[{ Icon: ZoomIn, fn: handleZoomIn }, { Icon: ZoomOut, fn: handleZoomOut }, { Icon: RotateCcw, fn: handleReset }].map(({ Icon, fn }, i) => (
              <button
                key={i}
                onClick={fn}
                className="w-8 h-8 bg-midnight-light/80 hover:bg-midnight-light border border-lightblue/20 rounded-lg flex items-center justify-center text-tan transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-xl"
            style={{ cursor: dragging ? "grabbing" : "grab", aspectRatio: "560/600" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              viewBox="0 0 560 600"
              className="w-full h-full"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.2s ease",
              }}
            >
              {/* State fills */}
              {STATE_PATHS.map((s) => {
                const data = stateData[s.name]
                const isHov = hoveredState === s.name
                return (
                  <path
                    key={s.name}
                    d={s.d}
                    fill={getFill(s.name, data, isHov)}
                    stroke="#1e7a8a"
                    strokeWidth={isHov ? 1.8 : 0.8}
                    style={{ transition: "fill 0.25s, stroke-width 0.15s", cursor: "pointer" }}
                    onMouseEnter={(e) => {
                      setHoveredState(s.name)
                      const pt = getPct(e as unknown as React.MouseEvent)
                      if (pt) setTooltipPos(pt)
                    }}
                    onMouseMove={(e) => {
                      const pt = getPct(e as unknown as React.MouseEvent)
                      if (pt) setTooltipPos(pt)
                    }}
                    onMouseLeave={() => { setHoveredState(null); setTooltipPos(null) }}
                  />
                )
              })}

              {/* City markers */}
              {CITIES.map((city) => {
                const r = markerRadius(city.students)
                const isTop = city.name === topCity.name
                const isHov = hoveredCity === city.name
                const isSelected = selectedCity?.name === city.name
                const fill = isTop ? "#D8BA98" : "#96C0CE"

                return (
                  <g
                    key={city.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedCity(isSelected ? null : city)}
                    onMouseEnter={(e) => {
                      setHoveredCity(city.name)
                      const pt = getPct(e as unknown as React.MouseEvent)
                      if (pt) setTooltipPos(pt)
                    }}
                    onMouseMove={(e) => {
                      const pt = getPct(e as unknown as React.MouseEvent)
                      if (pt) setTooltipPos(pt)
                    }}
                    onMouseLeave={() => { setHoveredCity(null) }}
                  >
                    {/* Pulse rings for top city */}
                    {isTop && (
                      <>
                        <circle cx={city.x} cy={city.y} r={r + 14} fill="#D8BA98" opacity="0.12">
                          <animate attributeName="r" values={`${r + 8};${r + 22};${r + 8}`} dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.18;0.04;0.18" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={city.x} cy={city.y} r={r + 7} fill="#D8BA98" opacity="0.22">
                          <animate attributeName="r" values={`${r + 4};${r + 16};${r + 4}`} dur="2.4s" begin="0.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.28;0.06;0.28" dur="2.4s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                    {/* Glow */}
                    <circle cx={city.x} cy={city.y} r={r + 6} fill={fill}
                      opacity={isHov || isSelected ? 0.32 : 0.1}
                      style={{ transition: "opacity 0.2s" }}
                    />
                    {/* Body */}
                    <circle
                      cx={city.x} cy={city.y}
                      r={isHov || isSelected ? r + 3 : r}
                      fill={fill}
                      stroke={isSelected ? "#EFE8DF" : "none"}
                      strokeWidth={2}
                      style={{ transition: "r 0.2s" }}
                    />
                    {/* Centre dot */}
                    <circle cx={city.x} cy={city.y} r={4} fill="#0F414A" />
                    {/* Labels */}
                    <text x={city.x} y={city.y + r + 13} textAnchor="middle"
                      fontSize="8" fontWeight="700" fill="#D8BA98"
                      className="pointer-events-none select-none">
                      {city.name}
                    </text>
                    <text x={city.x} y={city.y + r + 22} textAnchor="middle"
                      fontSize="7" fill="#96C0CE"
                      className="pointer-events-none select-none">
                      {city.students.toLocaleString()}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* State hover tooltip */}
            {hoveredState && !hoveredCity && tooltipPos && (
              <div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${Math.min(tooltipPos.x + 2, 56)}%`,
                  top: `${Math.max(tooltipPos.y - 6, 2)}%`,
                }}
              >
                <div className="bg-midnight border border-lightblue/30 rounded-xl px-3 py-2.5 shadow-2xl min-w-[150px]">
                  <p className="text-alabaster font-semibold text-sm">{hoveredState}</p>
                  {stateData[hoveredState] ? (
                    <>
                      <p className="text-lightblue text-xs mt-0.5">
                        {stateData[hoveredState].students.toLocaleString()} placed
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {stateData[hoveredState].companies.map(c => (
                          <span key={c} className="text-[9px] bg-lightblue/15 text-lightblue px-1.5 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-tan/50 text-xs mt-0.5">No placement data</p>
                  )}
                </div>
              </div>
            )}

            {/* City hover tooltip */}
            {hoveredCity && tooltipPos && (() => {
              const city = CITIES.find(c => c.name === hoveredCity)
              if (!city) return null
              return (
                <div
                  className="absolute z-30 pointer-events-none"
                  style={{
                    left: `${Math.min(tooltipPos.x + 2, 52)}%`,
                    top: `${Math.max(tooltipPos.y - 6, 2)}%`,
                  }}
                >
                  <div className="bg-midnight border border-tan/40 rounded-xl px-3 py-2.5 shadow-2xl min-w-[160px]">
                    <p className="text-alabaster font-bold text-sm">{city.name}</p>
                    <p className="text-tan/60 text-[10px]">{city.state}</p>
                    <div className="flex gap-4 mt-1.5">
                      <div>
                        <p className="text-lightblue text-xs font-semibold">{city.students.toLocaleString()}</p>
                        <p className="text-tan/50 text-[9px]">placed</p>
                      </div>
                      <div>
                        <p className="text-tan text-xs font-semibold">₹{city.avg}L</p>
                        <p className="text-tan/50 text-[9px]">avg pkg</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <p className="text-tan/50 text-xs">Marker size = placement volume</p>
            {[{ label: "Low", r: 10 }, { label: "Medium", r: 18 }, { label: "High", r: 26 }].map(({ label, r }) => (
              <div key={label} className="flex items-center gap-1.5">
                <svg width={r * 2 + 4} height={r * 2 + 4} className="flex-shrink-0">
                  <circle cx={r + 2} cy={r + 2} r={r} fill="#96C0CE" opacity="0.7" />
                </svg>
                <span className="text-tan/60 text-[10px]">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <svg width="26" height="26">
                <circle cx="13" cy="13" r="11" fill="#D8BA98" opacity="0.85" />
              </svg>
              <span className="text-tan/60 text-[10px]">Top city</span>
            </div>
          </div>
        </div>

        {/* Details panel */}
        {selectedCity && (
          <div className="lg:w-60 bg-midnight-light/30 border border-lightblue/15 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-serif font-bold text-alabaster text-xl">{selectedCity.name}</h4>
                <p className="text-tan/60 text-xs mt-0.5">{selectedCity.state}</p>
              </div>
              <button onClick={() => setSelectedCity(null)} className="text-tan/40 hover:text-tan transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-midnight/60 rounded-xl p-3">
                <p className="font-serif font-bold text-lightblue text-lg">{selectedCity.students.toLocaleString()}</p>
                <p className="text-tan/50 text-[10px] mt-0.5">Students placed</p>
              </div>
              <div className="bg-midnight/60 rounded-xl p-3">
                <p className="font-serif font-bold text-tan text-lg">₹{selectedCity.avg}L</p>
                <p className="text-tan/50 text-[10px] mt-0.5">Avg package</p>
              </div>
            </div>

            <div>
              <p className="text-tan/50 text-xs font-medium mb-2">Top Recruiters</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCity.topRecruiters.map(r => (
                  <span key={r} className="text-[10px] bg-lightblue/15 text-lightblue border border-lightblue/20 px-2 py-1 rounded-full">{r}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-tan/50 text-xs font-medium mb-1.5">Volume vs peak</p>
              <div className="h-2 bg-midnight rounded-full overflow-hidden">
                <div
                  className="h-full bg-lightblue rounded-full transition-all duration-500"
                  style={{ width: `${(selectedCity.students / MAX_STUDENTS) * 100}%` }}
                />
              </div>
              <p className="text-tan/40 text-[10px] mt-1">{Math.round((selectedCity.students / MAX_STUDENTS) * 100)}% of peak</p>
            </div>

            <button
              onClick={() => setSelectedCity(null)}
              className="w-full text-center text-xs text-tan/50 hover:text-tan border border-tan/20 hover:border-tan/40 rounded-lg py-2 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
