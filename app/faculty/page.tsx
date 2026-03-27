import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FacultyGrid } from '@/components/faculty/faculty-grid';

export const metadata = {
  title: 'Faculty - Premier Institute of Technology',
  description: 'Meet our distinguished faculty members with diverse expertise and research interests.',
};

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border dark:border-sidebar-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground dark:text-white">
              Our Faculty
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/70 max-w-3xl">
              Learn from industry experts with years of experience in research, teaching, and innovation.
            </p>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FacultyGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
