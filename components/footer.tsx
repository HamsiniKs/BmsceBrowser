import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary dark:bg-sidebar text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center font-bold">
                PIT
              </div>
              <div>
                <h3 className="font-bold text-lg">Premier Institute</h3>
                <p className="text-sm text-white/70">of Technology</p>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Empowering minds, shaping futures. Established 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/placements" className="text-white/70 hover:text-accent transition-colors">
                  Placements
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-white/70 hover:text-accent transition-colors">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="text-white/70 hover:text-accent transition-colors">
                  Alumni
                </Link>
              </li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-semibold mb-4">Academics</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  Computer Science
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  Mechanical
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  Civil Engineering
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-white/70">Campus Road, Tech City, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href="tel:+919876543210" className="text-white/70 hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href="mailto:info@pit.edu" className="text-white/70 hover:text-accent transition-colors">
                  info@pit.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>&copy; 2024 Premier Institute of Technology. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
