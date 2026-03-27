import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SeatGrid } from '@/components/seats/seat-grid';
import { SeatTracker } from '@/components/seats/seat-tracker';

export const metadata = {
  title: 'Seat Tracker - Premier Institute of Technology',
  description: 'Real-time seat availability in library and canteen with interactive seat selection.',
};

export default function SeatsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border dark:border-sidebar-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground dark:text-white">
              Seat Availability Tracker
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/70 max-w-3xl">
              Real-time seat availability in library and canteen. Find the perfect spot to study or relax.
            </p>
          </div>
        </section>

        {/* Tracker */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SeatTracker />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
