import { Navbar } from "@/components/navbar";
import { AlumniShowcase } from "@/components/alumni-showcase";
import { Footer } from "@/components/footer";

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-alabaster">
      <Navbar variant="solid" />
      <div className="pt-8">
        <AlumniShowcase />
      </div>
      <Footer />
    </main>
  );
}