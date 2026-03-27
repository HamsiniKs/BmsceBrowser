"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Academics",
    items: [
      { title: "Programs", description: "Undergraduate & postgraduate courses", href: "#programs" },
      { title: "Faculty", description: "Meet our distinguished professors", href: "#faculty" },
      { title: "Departments", description: "Explore our academic departments", href: "#departments" },
      { title: "Research", description: "Ongoing research initiatives", href: "#research" },
    ],
  },
  {
    title: "Placements",
    items: [
      { title: "Placement Stats", description: "View placement statistics & trends", href: "#placements" },
      { title: "Recruiters", description: "Companies that hire from BMSIT", href: "#recruiters" },
      { title: "Training", description: "Placement preparation programs", href: "#training" },
      { title: "Internships", description: "Summer & winter internship opportunities", href: "#internships" },
    ],
  },
  {
    title: "Campus Life",
    items: [
      { title: "Clubs", description: "Explore 18+ student clubs", href: "/clubs" },
      { title: "Events", description: "Upcoming fests & activities", href: "#events" },
      { title: "Facilities", description: "Labs, library & amenities", href: "#facilities" },
      { title: "Hostel", description: "On-campus accommodation", href: "#hostel" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { title: "Apply Now", description: "Start your application process", href: "#admissions" },
      { title: "Eligibility", description: "Check admission requirements", href: "#eligibility" },
      { title: "Fees", description: "Tuition & scholarship info", href: "#fees" },
      { title: "Seat Finder", description: "Predict your admission chances", href: "#seat-finder" },
    ],
  },
  {
    title: "Alumni",
    items: [
      { title: "Alumni Network", description: "Connect with former students", href: "#alumni" },
      { title: "Success Stories", description: "Where our graduates are now", href: "#success-stories" },
      { title: "Mentorship", description: "Get guidance from alumni", href: "#mentorship" },
      { title: "Give Back", description: "Contribute to your alma mater", href: "#give-back" },
    ],
  },
]

export function Navbar({ variant = "transparent" }: { variant?: "transparent" | "solid" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)

  const isTransparent = variant === "transparent"

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
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10",
                      "data-[state=open]:bg-white/10 data-[state=open]:text-white",
                      "focus:bg-white/10 focus:text-white"
                    )}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none text-midnight">{subItem.title}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-midnight/60 mt-1.5">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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
