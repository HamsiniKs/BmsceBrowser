import { GraduationCap, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-midnight border-t border-midnight-light/40 px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-maroon flex items-center justify-center flex-shrink-0">
                <span className="font-serif font-black text-alabaster text-base">B</span>
              </div>
              <div>
                <p className="text-alabaster font-bold text-sm leading-none">BMSIT&M</p>
                <p className="text-lightblue text-xs leading-none mt-0.5">Est. 2002</p>
              </div>
            </div>
            <p className="text-tan/60 text-xs leading-relaxed max-w-xs">
              BMS Institute of Technology and Management — NBA Accredited, NAAC A+ Grade. Bengaluru, Karnataka.
            </p>
          </div>

          {/* Academics */}
          <div>
            <p className="text-alabaster font-semibold text-sm mb-4">Academics</p>
            <div className="space-y-2.5">
              {["B.E. Programs", "M.Tech Programs", "Research & Ph.D", "Curriculum", "Faculty"].map(l => (
                <a key={l} href="#" className="block text-tan/60 text-xs hover:text-alabaster transition-colors">{l}</a>
              ))}
            </div>
          </div>

          {/* Campus */}
          <div>
            <p className="text-alabaster font-semibold text-sm mb-4">Campus</p>
            <div className="space-y-2.5">
              {["Admissions", "Placements", "Events", "Library", "Hostel", "Transport"].map(l => (
                <a key={l} href="#" className="block text-tan/60 text-xs hover:text-alabaster transition-colors">{l}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-alabaster font-semibold text-sm mb-4">Contact</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-lightblue flex-shrink-0 mt-0.5" />
                <span className="text-tan/60 text-xs leading-relaxed">Doddaballapur Rd, Avalahalli, Bangalore – 560064</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lightblue flex-shrink-0" />
                <span className="text-tan/60 text-xs">+91 80 2309 9900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-lightblue flex-shrink-0" />
                <span className="text-tan/60 text-xs">principal@bmsit.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-midnight-light/30 gap-4">
          <p className="text-tan/40 text-xs">© 2025 BMS Institute of Technology and Management. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map(l => (
              <a key={l} href="#" className="text-tan/40 text-xs hover:text-tan transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
