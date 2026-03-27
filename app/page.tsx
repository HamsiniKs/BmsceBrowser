import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { StatsSection } from '@/components/home/stats-section';
import { FeaturesSection } from '@/components/home/features-section';
import { PlacementHighlights } from '@/components/home/placement-highlights';

export const metadata = {
  title: 'Premier Institute of Technology - Excellence in Education',
  description: 'Top-ranked engineering institution with outstanding placements, distinguished faculty, and vibrant campus life.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <PlacementHighlights />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
