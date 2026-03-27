import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AlumniShowcase } from '@/components/alumni/alumni-showcase';

export const metadata = {
  title: 'Alumni - Premier Institute of Technology',
  description: 'Explore success stories and career journeys of our accomplished alumni across the globe.',
};

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border dark:border-sidebar-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground dark:text-white">
              Alumni Success Stories
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/70 max-w-3xl">
              Discover the remarkable journeys of our alumni and their achievements across the globe.
            </p>
          </div>
        </section>

        {/* Alumni Showcase */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AlumniShowcase />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
