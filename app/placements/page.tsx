import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PlacementMap } from '@/components/placements/placement-map';
import { PlacementFilters } from '@/components/placements/placement-filters';
import { CompanyHighlights } from '@/components/placements/company-highlights';

export const metadata = {
  title: 'Placements - Premier Institute of Technology',
  description: 'Explore comprehensive placement data, company statistics, and salary insights across branches and locations.',
};

export default function PlacementsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border dark:border-sidebar-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground dark:text-white">
              Placement Analytics
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/70 max-w-3xl">
              Interactive insights into placement data across states, cities, branches, and companies
            </p>
          </div>
        </section>

        {/* Filters and Map */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <PlacementFilters />
            <div className="mt-8">
              <PlacementMap />
            </div>
          </div>
        </section>

        {/* Company Highlights */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted dark:bg-sidebar/50">
          <div className="max-w-7xl mx-auto">
            <CompanyHighlights />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
