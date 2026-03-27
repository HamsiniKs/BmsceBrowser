'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 dark:bg-accent/20 text-secondary dark:text-accent">
                Est. 1998 • Premier Institution
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Shape Your Future at{' '}
              <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                Premier Institute
              </span>
            </h1>

            <p className="text-lg text-muted-foreground dark:text-white/70 max-w-md leading-relaxed">
              Excellence in education meets industry leadership. Join thousands of successful alumni working across the globe.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/placements"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary dark:bg-accent text-white dark:text-primary rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
              >
                Explore Placements
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/alumni"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-secondary dark:border-accent text-secondary dark:text-accent rounded-lg hover:bg-secondary/5 dark:hover:bg-accent/5 transition-colors font-semibold"
              >
                Success Stories
              </Link>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border dark:border-sidebar-border">
              <div>
                <p className="text-2xl font-bold text-secondary dark:text-accent">4,850+</p>
                <p className="text-sm text-muted-foreground dark:text-white/60">Placements</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary dark:text-accent">12.5 LPA</p>
                <p className="text-sm text-muted-foreground dark:text-white/60">Avg Package</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary dark:text-accent">450+</p>
                <p className="text-sm text-muted-foreground dark:text-white/60">Companies</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square">
              {/* Animated cards */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 dark:from-secondary/30 dark:to-accent/30 rounded-2xl" />
              <div className="absolute inset-4 bg-white dark:bg-primary rounded-xl shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">🎓</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Building Tomorrow&apos;s Leaders</h3>
                  <p className="text-sm text-muted-foreground dark:text-white/70">
                    World-class education meets real-world industry experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
