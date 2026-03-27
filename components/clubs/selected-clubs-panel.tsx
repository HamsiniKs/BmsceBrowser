"use client"

import { motion } from "framer-motion"
import { X, Users, ArrowRight } from "lucide-react"
import { Club, Category } from "./club-data"

const CATEGORY_COLORS: Record<Category, string> = {
  Tech:     "bg-midnight text-alabaster",
  Cultural: "bg-maroon text-alabaster",
  Social:   "bg-lightblue text-midnight",
  Academic: "bg-tan text-midnight",
}

const CAT_ICON_BG: Record<Category, string> = {
  Tech:     "#0F414A",
  Cultural: "#7F0303",
  Social:   "#96C0CE",
  Academic: "#D8BA98",
}

const ILLUSTRATION: Record<string, string> = {
  tech:     "⌨",
  cultural: "🎭",
  social:   "🤝",
  academic: "📐",
}

export function SelectedClubsPanel({
  clubs,
  onClose,
  onSelectClub,
  onRemove,
}: {
  clubs: Club[]
  onClose: () => void
  onSelectClub: (club: Club) => void
  onRemove: (id: string) => void
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-midnight/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-alabaster shadow-2xl border-l border-tan/60 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-tan/60">
          <div>
            <h2 className="font-serif font-bold text-midnight text-xl">My Clubs</h2>
            <p className="text-xs text-midnight/50 mt-0.5">{clubs.length} club{clubs.length !== 1 ? "s" : ""} selected</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-tan flex items-center justify-center hover:bg-tan/30 transition-colors"
            aria-label="Close panel"
          >
            <X size={16} className="text-midnight" />
          </button>
        </div>

        {/* Club list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {clubs.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif text-midnight font-bold text-lg mb-1">No clubs yet</p>
              <p className="text-sm text-midnight/50">Swipe right or tap the heart button to save clubs here.</p>
            </div>
          ) : (
            clubs.map(club => (
              <div
                key={club.id}
                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-tan/50 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ background: CAT_ICON_BG[club.category] + "18" }}
                >
                  {ILLUSTRATION[club.bgPattern]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-midnight truncate">{club.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[club.category]}`}>
                    {club.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onSelectClub(club)}
                    className="w-7 h-7 rounded-full hover:bg-tan/30 flex items-center justify-center transition-colors"
                    aria-label="View club details"
                  >
                    <ArrowRight size={13} className="text-midnight" />
                  </button>
                  <button
                    onClick={() => onRemove(club.id)}
                    className="w-7 h-7 rounded-full hover:bg-maroon/10 flex items-center justify-center transition-colors"
                    aria-label="Remove club"
                  >
                    <X size={13} className="text-maroon" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {clubs.length > 0 && (
          <div className="p-4 border-t border-tan/60 bg-tan/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-midnight/60">Total members across clubs</span>
              <span className="font-bold text-midnight flex items-center gap-1">
                <Users size={13} />
                {clubs.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}
