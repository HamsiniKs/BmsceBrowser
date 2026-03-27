"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Admissions", href: "#admissions" },
  { label: "Placements", href: "#placements" },
  { label: "Departments", href: "#departments" },
  { label: "Events", href: "#events" },
  { label: "Clubs", href: "/clubs" },
  { label: "Seat Finder", href: "#seat-finder" },
  { label: "Alumni", href: "#alumni" },
  { label: "Utilities", href: "#utilities" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Fixed Navbar - appears after scrolling */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-midnight/95 backdrop-blur-md shadow-lg translate-y-0"
            : "bg-transparent -translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="font-serif font-black text-maroon text-sm leading-none">B</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm leading-none">BMSIT</p>
                <p className="text-white/60 text-xs leading-none mt-0.5">since 2002</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[500px] border-t border-white/10" : "max-h-0"
          }`}
        >
          <nav className="bg-midnight/95 backdrop-blur-md px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
