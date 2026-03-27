"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Academics",
    items: [
      { title: "Programs", description: "Undergraduate & postgraduate courses", href: "/academics/programs" },
      { title: "Faculty", description: "Meet our distinguished professors", href: "/academics/faculty" },
      { title: "Departments", description: "Explore our academic departments", href: "/academics/departments" },
      { title: "Research", description: "Ongoing research initiatives", href: "/academics/research" },
    ],
  },
  {
    title: "Placements",
    items: [
      { title: "Placement Stats", description: "View placement statistics & trends", href: "/placements" },
      { title: "Recruiters", description: "Companies that hire from BMSIT", href: "/placements/recruiters" },
      { title: "Training", description: "Placement preparation programs", href: "/placements/training" },
      { title: "Internships", description: "Summer & winter internship opportunities", href: "/placements/internships" },
    ],
  },
  {
    title: "Campus Life",
    items: [
      { title: "Clubs", description: "Explore 18+ student clubs", href: "/clubs" },
      { title: "Events", description: "Upcoming fests & activities", href: "/events" },
      { title: "Facilities", description: "Labs, library & amenities", href: "/campus/facilities" },
      { title: "Hostel", description: "On-campus accommodation", href: "/campus/hostel" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { title: "Apply Now", description: "Start your application process", href: "/admissions" },
      { title: "Eligibility", description: "Check admission requirements", href: "/admissions/eligibility" },
      { title: "Fees", description: "Tuition & scholarship info", href: "/admissions/fees" },
      { title: "Seat Finder", description: "Predict your admission chances", href: "/admissions/seat-finder" },
    ],
  },
  {
    title: "Alumni",
    items: [
      { title: "Alumni Members", description: "Connect with former students", href: "/alumni" },
      { title: "Mentorship", description: "Get guidance from alumni mentors", href: "/alumni/mentorship" },
    ],
  },
]

function NavDropdown({ item, mounted }: { item: typeof navigationItems[0]; mounted: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
          "text-white/80 hover:text-white hover:bg-white/10",
          isOpen && "bg-white/10 text-white"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.title}
        <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="w-[400px] md:w-[500px] rounded-lg border border-border bg-background shadow-lg">
            <ul className="grid gap-1 p-2 md:grid-cols-2">
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  {mounted ? (
                    <Link
                      href={subItem.href}
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-sm font-medium leading-none text-midnight">{subItem.title}</div>
                      <p className="line-clamp-2 text-xs leading-snug text-midnight/60 mt-1.5">
                        {subItem.description}
                      </p>
                    </Link>
                  ) : (
                    <a
                      href={subItem.href}
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none text-midnight">{subItem.title}</div>
                      <p className="line-clamp-2 text-xs leading-snug text-midnight/60 mt-1.5">
                        {subItem.description}
                      </p>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export function Navbar({ variant = "transparent" }: { variant?: "transparent" | "solid" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isTransparent = variant === "transparent"

  // Return a static header placeholder until mounted to avoid router errors
  if (!mounted) {
    return (
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-300",
          isTransparent ? "bg-black/20 backdrop-blur-md" : "bg-midnight border-b border-midnight-light"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="font-serif font-black text-maroon text-lg leading-none">S</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">Smart Campus</p>
                <p className="text-white/70 text-xs leading-none mt-0.5">Platform</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-1">
              <span className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/80">
                Home
              </span>
            </nav>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        isTransparent ? "bg-black/20 backdrop-blur-md" : "bg-midnight border-b border-midnight-light"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <span className="font-serif font-black text-maroon text-lg leading-none">S</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Smart Campus</p>
              <p className="text-white/70 text-xs leading-none mt-0.5">Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              Home
            </Link>
            {navigationItems.map((item) => (
              <NavDropdown key={item.title} item={item} mounted={true} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-white text-maroon hover:bg-white/90 font-semibold border-none"
            >
              Sign In
            </Button>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-midnight/95 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-1">
              <Link
                href="/"
                className="block py-3 px-3 text-white font-medium hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <button
                    className="w-full flex items-center justify-between py-3 px-3 text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    onClick={() =>
                      setOpenMobileDropdown(openMobileDropdown === item.title ? null : item.title)
                    }
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        openMobileDropdown === item.title && "rotate-180"
                      )}
                    />
                  </button>
                  {openMobileDropdown === item.title && (
                    <div className="pl-4 pb-2 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block py-2 px-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-white/10">
              <Button className="w-full bg-white text-maroon hover:bg-white/90 font-semibold">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
