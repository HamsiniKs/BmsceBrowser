"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { X, Users, Heart, HeartOff, Calendar, Zap } from "lucide-react"
import { Club, Category } from "./club-data"

const CATEGORY_COLORS: Record<Category, string> = {
  Tech:     "bg-midnight text-alabaster",
  Cultural: "bg-maroon text-alabaster",
  Social:   "bg-lightblue text-midnight",
  Academic: "bg-tan text-midnight",
}

const CATEGORY_ICON_BG: Record<Category, string> = {
  Tech:     "#0F414A",
  Cultural: "#7F0303",
  Social:   "#96C0CE",
  Academic: "#D8BA98",
}

export function ClubDetailModal({
  club,
  isInterested,
  onClose,
  onToggleInterest,
}: {
  club: Club
  isInterested: boolean
  onClose: () => void
  onToggleInterest: (club: Club) => void
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-midnight/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-alabaster shadow-2xl border-t border-tan/60"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        {/* Drag pill */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-tan rounded-full" />
        </div>

        {/* Hero banner — real image */}
        <div
          className="relative mx-4 mt-2 rounded-2xl h-48 overflow-hidden"
          style={{ background: CATEGORY_ICON_BG[club.category] + "20" }}
        >
          <Image
            src={club.image}
            alt={club.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
          {/* Halftone overlay */}
          <div
            className="absolute inset-0 opacity-25 mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(${CATEGORY_ICON_BG[club.category]} 1px, transparent 1px)`,
              backgroundSize: "8px 8px",
            }}
          />
          {/* Text overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/70 to-transparent p-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[club.category]}`}>
              {club.category}
            </span>
            <h2 className="font-serif font-bold text-alabaster text-2xl md:text-3xl mt-1.5 text-balance">
              {club.name}
            </h2>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-alabaster/90 rounded-full px-3 py-1 text-xs font-semibold text-midnight border border-tan/60">
            <Users size={11} />
            {club.memberCount} members
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-5 pb-8 max-w-2xl mx-auto space-y-6">
          {/* About */}
          <section>
            <h3 className="font-semibold text-midnight text-sm uppercase tracking-widest mb-2">About</h3>
            <p className="text-midnight/80 text-sm leading-relaxed">{club.description}</p>
          </section>

          {/* Activities */}
          <section>
            <h3 className="font-semibold text-midnight text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap size={14} className="text-maroon" />
              Activities
            </h3>
            <div className="flex flex-wrap gap-2">
              {club.activities.map(a => (
                <span
                  key={a}
                  className="text-xs bg-tan/40 text-midnight px-3 py-1.5 rounded-full border border-tan/60"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>

          {/* Events */}
          <section>
            <h3 className="font-semibold text-midnight text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <Calendar size={14} className="text-lightblue-dark" />
              Events
            </h3>
            <div className="space-y-2">
              {club.events.map((ev, i) => (
                <div
                  key={ev}
                  className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-tan/50"
                >
                  <span className="w-6 h-6 rounded-full bg-midnight text-alabaster text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-midnight">{ev}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onToggleInterest(club)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all ${
                isInterested
                  ? "bg-tan text-midnight border-2 border-tan-dark hover:bg-tan-dark"
                  : "bg-maroon text-alabaster hover:bg-maroon-light"
              }`}
            >
              {isInterested ? <HeartOff size={16} /> : <Heart size={16} />}
              {isInterested ? "Remove from My Clubs" : "Join / Express Interest"}
            </button>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border-2 border-tan flex items-center justify-center hover:bg-tan/30 transition-colors text-midnight"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
