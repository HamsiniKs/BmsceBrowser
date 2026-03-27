'use client';

import { topCompanies } from '@/lib/mock-data';

export function PlacementHighlights() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground dark:text-white">
            Top Recruiting Companies
          </h2>
          <p className="text-lg text-muted-foreground dark:text-white/70 max-w-2xl mx-auto">
            Our graduates work at Fortune 500 companies and innovative startups worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {topCompanies.map((company) => (
            <div
              key={company.name}
              className="group relative bg-white dark:bg-card rounded-lg p-6 shadow-sm border border-border dark:border-sidebar-border hover:shadow-lg hover:border-secondary dark:hover:border-accent transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 dark:from-secondary/30 dark:to-accent/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-secondary dark:text-accent text-lg">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-foreground dark:text-white text-sm mb-2">
                  {company.name}
                </p>
                <p className="text-xs text-muted-foreground dark:text-white/60 mb-3">
                  {company.count} students
                </p>
                <div className="text-xs font-mono text-secondary dark:text-accent space-y-0.5">
                  {company.packages.map((pkg, idx) => (
                    <div key={idx}>₹{pkg} LPA</div>
                  ))}
                </div>
              </div>

              {/* Hover tooltip */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
