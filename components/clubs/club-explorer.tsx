"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { X, Heart, ChevronUp, Users, Star, Home } from "lucide-react"
import Link from "next/link"
import { CLUBS, Club, Category } from "./club-data"
import { ClubDetailModal } from "./club-detail-modal"
import { SelectedClubsPanel } from "./selected-clubs-panel"

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  Tech:     { bg: "bg-midnight text-alabaster border-midnight",      text: "#0F414A", border: "#0F414A" },
  Cultural: { bg: "bg-maroon text-alabaster border-maroon",          text: "#7F0303", border: "#7F0303" },
  Social:   { bg: "bg-lightblue text-midnight border-lightblue",     text: "#96C0CE", border: "#96C0CE" },
  Academic: { bg: "bg-tan text-midnight border-tan",                 text: "#D8BA98", border: "#D8BA98" },
}

const BG_PATTERNS: Record<string, string> = {
  tech:     "repeating-linear-gradient(45deg, #0F414A08 0px, #0F414A08 1px, transparent 1px, transparent 12px)",
  cultural: "repeating-linear-gradient(45deg, #7F030308 0px, #7F030308 1px, transparent 1px, transparent 12px)",
  social:   "repeating-linear-gradient(45deg, #96C0CE15 0px, #96C0CE15 1px, transparent 1px, transparent 12px)",
  academic: "repeating-linear-gradient(45deg, #D8BA9820 0px, #D8BA9820 1px, transparent 1px, transparent 12px)",
}

const CATEGORY_ILLUSTRATION: Record<string, string> = {
  tech:     "⌨",
  cultural: "🎭",
  social:   "🤝",
  academic: "📐",
}

type SwipeDirection = "left" | "right" | "up" | null

export function ClubExplorer() {
  const allCategories: Category[] = ["Tech", "Cultural", "Social", "Academic"]
  const [activeFilter, setActiveFilter] = useState<Category | null>(null)
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set())
  const [interestedIds, setInterestedIds] = useState<Set<string>>(new Set())
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  const [swipeDir, setSwipeDir] = useState<SwipeDirection>(null)
  const [showSelected, setShowSelected] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filtered = CLUBS.filter(c => !activeFilter || c.category === activeFilter)
  const queue = filtered.filter(c => !viewedIds.has(c.id))
  const interestedClubs = CLUBS.filter(c => interestedIds.has(c.id))
  const progress = filtered.length > 0 ? Math.min(viewedIds.size, filtered.length) : 0

  const handleSwipe = useCallback((club: Club, dir: SwipeDirection) => {
    setSwipeDir(dir)
    setTimeout(() => {
      setViewedIds(prev => new Set([...prev, club.id]))
      if (dir === "right") setInterestedIds(prev => new Set([...prev, club.id]))
      if (dir === "up") setSelectedClub(club)
      setSwipeDir(null)
    }, 320)
  }, [])

  const handleReset = () => {
    setViewedIds(new Set())
    setInterestedIds(new Set())
  }

  const topClub = queue[0]
  const nextClub = queue[1]

  return (
    <div className="min-h-screen bg-alabaster font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-alabaster border-b border-tan/60">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {mounted ? (
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-tan hover:bg-tan/30 hover:border-midnight transition-colors"
                aria-label="Go to Home"
              >
                <Home size={18} className="text-midnight" />
              </Link>
            ) : (
              <div className="w-10 h-10 rounded-full border border-tan flex items-center justify-center">
                <Home size={18} className="text-midnight" />
              </div>
            )}
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-midnight leading-tight text-balance">
                Discover Clubs
              </h1>
              <p className="text-sm text-midnight/60 mt-0.5">Swipe to find your perfect club</p>
            </div>
          </div>
          <button
            onClick={() => setShowSelected(true)}
            className="relative flex items-center gap-2 bg-midnight text-alabaster px-4 py-2 rounded-full text-sm font-medium hover:bg-midnight-light transition-colors"
          >
            <Star size={14} />
            My Clubs
            {interestedIds.size > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-maroon text-alabaster text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {interestedIds.size}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap py-5">
          <button
            onClick={() => { setActiveFilter(null); setViewedIds(new Set()) }}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
              activeFilter === null
                ? "bg-midnight text-alabaster border-midnight"
                : "bg-alabaster text-midnight border-tan hover:border-midnight"
            }`}
          >
            All
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setViewedIds(new Set()) }}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                activeFilter === cat
                  ? CATEGORY_COLORS[cat].bg
                  : "bg-alabaster text-midnight border-tan hover:border-midnight"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-midnight/50 mb-1.5">
            <span>{progress} / {filtered.length} explored</span>
            <span>{queue.length} remaining</span>
          </div>
          <div className="h-1.5 bg-tan/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-midnight rounded-full transition-all duration-500"
              style={{ width: filtered.length > 0 ? `${(progress / filtered.length) * 100}%` : "0%" }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Card stack */}
          <div className="flex-1 w-full">
            <div className="relative h-[480px] flex items-center justify-center">
              {queue.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-serif text-2xl font-bold text-midnight mb-2">All explored!</p>
                  <p className="text-midnight/60 mb-6 text-sm">You&apos;ve gone through all {filtered.length} clubs.</p>
                  <button
                    onClick={handleReset}
                    className="bg-midnight text-alabaster px-6 py-2.5 rounded-full font-medium text-sm hover:bg-midnight-light transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              ) : (
                <>
                  {/* Background card (next) */}
                  {nextClub && (
                    <div
                      className="absolute w-full max-w-sm rounded-2xl border border-tan/60 bg-white/60"
                      style={{
                        height: 420,
                        transform: "scale(0.94) translateY(16px)",
                        zIndex: 1,
                        backgroundImage: BG_PATTERNS[nextClub.bgPattern],
                      }}
                    />
                  )}

                  {/* Top card */}
                  <AnimatePresence mode="wait">
                    {topClub && (
                      <SwipeCard
                        key={topClub.id}
                        club={topClub}
                        onSwipe={handleSwipe}
                        onExpand={() => setSelectedClub(topClub)}
                        swipeDir={swipeDir}
                      />
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Action buttons */}
            {topClub && (
              <div className="flex items-center justify-center gap-5 mt-4">
                <button
                  onClick={() => handleSwipe(topClub, "left")}
                  className="w-14 h-14 rounded-full border-2 border-tan bg-alabaster text-midnight flex items-center justify-center hover:bg-tan/30 hover:border-midnight transition-all shadow-sm"
                  aria-label="Skip"
                >
                  <X size={22} />
                </button>
                <button
                  onClick={() => handleSwipe(topClub, "up")}
                  className="w-11 h-11 rounded-full border-2 border-lightblue bg-alabaster text-midnight flex items-center justify-center hover:bg-lightblue/20 transition-all shadow-sm"
                  aria-label="View details"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  onClick={() => handleSwipe(topClub, "right")}
                  className="w-14 h-14 rounded-full border-2 border-maroon bg-maroon text-alabaster flex items-center justify-center hover:bg-maroon-light transition-all shadow-sm"
                  aria-label="Interested"
                >
                  <Heart size={22} />
                </button>
              </div>
            )}

            {/* Swipe hints */}
            <p className="text-center text-xs text-midnight/40 mt-3">
              Swipe or tap — <span className="text-maroon font-medium">heart</span> to join,{" "}
              <span className="font-medium">skip</span> to pass,{" "}
              <span className="text-lightblue-dark font-medium">up</span> for details
            </p>
          </div>

          {/* Recommended sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <RecommendedPanel interestedIds={interestedIds} viewedIds={viewedIds} onSelect={setSelectedClub} />
          </aside>
        </div>
      </main>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedClub && (
          <ClubDetailModal
            club={selectedClub}
            isInterested={interestedIds.has(selectedClub.id)}
            onClose={() => setSelectedClub(null)}
            onToggleInterest={(club) => {
              setInterestedIds(prev => {
                const next = new Set(prev)
                if (next.has(club.id)) next.delete(club.id)
                else next.add(club.id)
                return next
              })
            }}
          />
        )}
      </AnimatePresence>

      {/* Selected clubs panel */}
      <AnimatePresence>
        {showSelected && (
          <SelectedClubsPanel
            clubs={interestedClubs}
            onClose={() => setShowSelected(false)}
            onSelectClub={(club) => { setSelectedClub(club); setShowSelected(false) }}
            onRemove={(id) => setInterestedIds(prev => { const n = new Set(prev); n.delete(id); return n })}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────
// SwipeCard
// ─────────────────────────────────────────────
function SwipeCard({
  club,
  onSwipe,
  onExpand,
}: {
  club: Club
  onSwipe: (club: Club, dir: SwipeDirection) => void
  onExpand: () => void
  swipeDir: SwipeDirection
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-18, 18])
  const likeOpacity = useTransform(x, [20, 80], [0, 1])
  const skipOpacity = useTransform(x, [-80, -20], [1, 0])

  const catColors = CATEGORY_COLORS[club.category]

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    if (offset.x > 100 || velocity.x > 500) {
      onSwipe(club, "right")
    } else if (offset.x < -100 || velocity.x < -500) {
      onSwipe(club, "left")
    } else if (offset.y < -80 || velocity.y < -500) {
      onSwipe(club, "up")
      onExpand()
    }
  }

  return (
    <motion.div
      className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing select-none"
      style={{ x, y, rotate, zIndex: 2 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      whileTap={{ scale: 1.02 }}
    >
      {/* Like / Skip overlays */}
      <motion.div
        className="absolute top-6 left-6 z-10 bg-maroon text-alabaster font-bold text-lg px-4 py-1.5 rounded-full border-2 border-maroon/60 rotate-[-12deg]"
        style={{ opacity: likeOpacity }}
      >
        INTERESTED
      </motion.div>
      <motion.div
        className="absolute top-6 right-6 z-10 bg-tan text-midnight font-bold text-lg px-4 py-1.5 rounded-full border-2 border-tan-dark rotate-[12deg]"
        style={{ opacity: skipOpacity }}
      >
        SKIP
      </motion.div>

      {/* Card body */}
      <div
        className="rounded-2xl overflow-hidden shadow-lg border border-tan/60"
        style={{
          height: 420,
          background: "#EFE8DF",
          backgroundImage: BG_PATTERNS[club.bgPattern],
        }}
      >
        {/* Visual area — club image */}
        <div
          className="relative h-48 flex items-center justify-center overflow-hidden"
          style={{ background: club.color + "18" }}
        >
          <Image
            src={club.image}
            alt={club.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
          />
          {/* Halftone overlay for editorial feel */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(${club.color} 1px, transparent 1px)`,
              backgroundSize: "8px 8px",
            }}
          />
          {/* Member count pill */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-alabaster/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-midnight border border-tan/60">
            <Users size={11} />
            {club.memberCount} members
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-serif font-bold text-xl text-midnight leading-tight text-balance">
              {club.name}
            </h2>
            <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${catColors.bg}`}>
              {club.category}
            </span>
          </div>
          <p className="text-sm text-midnight/70 leading-relaxed line-clamp-3">
            {club.shortDescription}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onExpand() }}
            className="mt-auto self-start text-xs font-semibold text-midnight underline underline-offset-2 hover:text-maroon transition-colors"
          >
            View full details
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Recommended Panel
// ─────────────────────────────────────────────
function RecommendedPanel({
  interestedIds,
  viewedIds,
  onSelect,
}: {
  interestedIds: Set<string>
  viewedIds: Set<string>
  onSelect: (club: Club) => void
}) {
  // Recommend clubs in same categories as interested
  const interestedCategories = new Set(CLUBS.filter(c => interestedIds.has(c.id)).map(c => c.category))
  const recommended = interestedIds.size === 0
    ? CLUBS.slice(0, 4)
    : CLUBS.filter(c => !interestedIds.has(c.id) && interestedCategories.has(c.category)).slice(0, 5)

  return (
    <div className="bg-white/70 border border-tan/60 rounded-2xl p-5">
      <h3 className="font-serif font-bold text-midnight text-lg mb-4">
        {interestedIds.size === 0 ? "Popular Clubs" : "Recommended for You"}
      </h3>
      <div className="flex flex-col gap-3">
        {recommended.map(club => {
          const catColors = CATEGORY_COLORS[club.category]
          return (
            <button
              key={club.id}
              onClick={() => onSelect(club)}
              className="flex items-center gap-3 text-left hover:bg-tan/20 rounded-xl p-2 -mx-2 transition-colors group"
            >
              <div
                className="w-9 h-9 rounded-lg overflow-hidden shrink-0 relative"
                style={{ background: club.color + "18" }}
              >
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-midnight truncate group-hover:text-maroon transition-colors">
                  {club.name}
                </p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${catColors.bg}`}>
                  {club.category}
                </span>
              </div>
              <Users size={13} className="text-midnight/40 shrink-0" />
            </button>
          )
        })}
      </div>
      {interestedIds.size > 0 && (
        <p className="text-xs text-midnight/40 mt-4 text-center">
          Based on your {interestedIds.size} selection{interestedIds.size !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  )
}
