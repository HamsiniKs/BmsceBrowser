'use client';

import { placementStats, branchPlacementData } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted dark:bg-sidebar/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground dark:text-white">
            Placement Trends
          </h2>
          <p className="text-lg text-muted-foreground dark:text-white/70 max-w-2xl mx-auto">
            Five-year growth in placements and average compensation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Placement Growth Chart */}
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-white">
              Annual Placements
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                />
                <Legend />
                <Bar dataKey="placements" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Average Package Growth */}
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-white">
              Average Package Growth (LPA)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgPackage" 
                  stroke="var(--color-chart-2)" 
                  dot={{ fill: 'var(--color-chart-2)', r: 5 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch-wise Placement */}
        <div className="mt-8 bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
          <h3 className="text-lg font-semibold mb-6 text-foreground dark:text-white">
            Branch-wise Placement Statistics
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {branchPlacementData.map((branch) => (
              <div key={branch.branch} className="p-4 rounded-lg bg-muted dark:bg-sidebar border border-border dark:border-sidebar-border">
                <p className="text-sm font-medium text-muted-foreground dark:text-white/70 mb-2">
                  {branch.branch}
                </p>
                <p className="text-2xl font-bold text-foreground dark:text-white mb-1">
                  {branch.placed}/{branch.total}
                </p>
                <p className="text-xs text-muted-foreground dark:text-white/60 mb-3">
                  {Math.round((branch.placed / branch.total) * 100)}% placed
                </p>
                <p className="text-sm font-semibold text-secondary dark:text-accent">
                  ₹{branch.avgPackage} LPA
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
