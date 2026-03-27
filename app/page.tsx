import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { AdmissionsSection } from "@/components/admissions-section"
import { PlacementsDashboard } from "@/components/placements-dashboard"
import { EventsSection } from "@/components/events-section"
import { SeatFinder } from "@/components/seat-finder"
import { AlumniShowcase } from "@/components/alumni-showcase"
import { StudentUtilities } from "@/components/student-utilities"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BentoGrid />
      <AdmissionsSection />
      <PlacementsDashboard />
      <EventsSection />
      <SeatFinder />
      <AlumniShowcase />
      <StudentUtilities />
      <Footer />
    </main>
  )
}
