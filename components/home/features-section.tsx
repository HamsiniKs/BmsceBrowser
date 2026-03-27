'use client';

import Link from 'next/link';
import { MapPin, Users, BookOpen, TrendingUp } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Placement Insights',
      description: 'Interactive analytics on placement data across states and branches',
      href: '/placements',
      color: 'from-chart-1 to-chart-2',
    },
    {
      icon: MapPin,
      title: 'Seat Tracker',
      description: 'Real-time availability of library and canteen seating',
      href: '/seats',
      color: 'from-chart-3 to-chart-4',
    },
    {
      icon: Users,
      title: 'Faculty Directory',
      description: 'Meet our distinguished faculty with years of expertise',
      href: '/faculty',
      color: 'from-chart-5 to-chart-1',
    },
    {
      icon: BookOpen,
      title: 'Alumni Network',
      description: 'Success stories and career journeys of our alumni',
      href: '/alumni',
      color: 'from-chart-2 to-chart-3',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted dark:bg-sidebar/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground dark:text-white">
            Explore the Campus
          </h2>
          <p className="text-lg text-muted-foreground dark:text-white/70 max-w-2xl mx-auto">
            Discover comprehensive information about placements, facilities, and opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.href}
                className="group relative bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-border dark:border-sidebar-border hover:shadow-lg hover:border-secondary dark:hover:border-accent transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${feature.color}`} />

                <div className="relative space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 dark:from-secondary/30 dark:to-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-secondary dark:text-accent" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground dark:text-white group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground dark:text-white/70">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-secondary dark:text-accent group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
