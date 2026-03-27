'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/placements', label: 'Placements' },
    { href: '/seats', label: 'Seat Tracker' },
    { href: '/faculty', label: 'Faculty' },
    { href: '/alumni', label: 'Alumni' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-primary border-b border-border dark:border-sidebar-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-lg">
              PIT
            </div>
            <span className="font-semibold text-foreground dark:text-white hidden sm:inline text-sm">
              Premier Institute
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground dark:text-sidebar-foreground hover:text-primary dark:hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted dark:hover:bg-sidebar-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground dark:text-sidebar-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground dark:text-sidebar-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border dark:border-sidebar-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-lg text-foreground dark:text-sidebar-foreground hover:bg-muted dark:hover:bg-sidebar-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
