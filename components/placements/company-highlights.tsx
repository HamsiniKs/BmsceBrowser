'use client';

import { topCompanies } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export function CompanyHighlights() {
  const chartData = topCompanies.map((company) => ({
    name: company.name,
    students: company.count,
    avgPackage: Math.round((Math.min(...company.packages) + Math.max(...company.packages)) / 2),
  }));

  const colors = [
    'var(--color-chart-1)',
    'var(--color-chart-2)',
    'var(--color-chart-3)',
    'var(--color-chart-4)',
    'var(--color-chart-5)',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground dark:text-white">
          Company-wise Placement Data
        </h2>
        <p className="text-lg text-muted-foreground dark:text-white/70">
          Detailed insights into student placements across top recruiting companies
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
        <h3 className="text-lg font-semibold mb-6 text-foreground dark:text-white">
          Students Placed by Company
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'var(--color-foreground)' }}
            />
            <Legend />
            <Bar dataKey="students" fill="var(--color-chart-1)" name="Students Placed" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Company Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topCompanies.map((company, index) => (
          <div
            key={company.name}
            className="bg-white dark:bg-card rounded-lg p-6 shadow-sm border border-border dark:border-sidebar-border hover:shadow-md transition-shadow"
            style={{
              borderTopWidth: '4px',
              borderTopColor: colors[index % colors.length],
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg text-foreground dark:text-white">{company.name}</h4>
              <span className="text-sm font-semibold text-white bg-secondary dark:bg-accent rounded px-2 py-1">
                {company.count}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <p className="text-xs text-muted-foreground dark:text-white/60 mb-1">Package Range</p>
                <p className="text-sm font-semibold text-foreground dark:text-white">
                  ₹{Math.min(...company.packages)} - ₹{Math.max(...company.packages)} LPA
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground dark:text-white/60 mb-1">Average</p>
                <p className="text-sm font-semibold text-secondary dark:text-accent">
                  ₹{Math.round((Math.min(...company.packages) + Math.max(...company.packages)) / 2)} LPA
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border dark:border-sidebar-border">
              <p className="text-xs text-muted-foreground dark:text-white/60">Offered Packages</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {company.packages.map((pkg, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-muted dark:bg-sidebar px-2 py-1 rounded text-foreground dark:text-white"
                  >
                    ₹{pkg}L
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
