import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { AdmissionsSection } from "@/components/admissions-section"
import { PlacementsDashboard } from "@/components/placements-dashboard"
import { DepartmentExplorer } from "@/components/department-explorer"
import { EventsSection } from "@/components/events-section"
import { SeatFinder } from "@/components/seat-finder"
import { AlumniShowcase } from "@/components/alumni-showcase"
import { StudentUtilities } from "@/components/student-utilities"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BentoGrid />
      <AdmissionsSection />
      <PlacementsDashboard />
      <DepartmentExplorer />
      <EventsSection />
      {/* Club Explorer CTA */}
      <section className="bg-alabaster py-16 px-4 border-y border-tan/60">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-maroon mb-3">New Feature</p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-midnight mb-4 text-balance">
            Discover Your Perfect Club
          </h2>
          <p className="text-midnight/60 mb-8 text-sm leading-relaxed max-w-xl mx-auto">
            Swipe through all 18 BMSIT clubs, filter by interest, and save the ones that excite you — just like picking your next favourite show.
          </p>
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 bg-midnight text-alabaster px-8 py-3 rounded-full font-semibold text-sm hover:bg-midnight-light transition-colors"
          >
            Explore Clubs
          </Link>
        </div>
      </section>
      <SeatFinder />
      <AlumniShowcase />
      <StudentUtilities />
      <Footer />
    </main>
  )
}
