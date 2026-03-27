'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';

export function PlacementFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    branch: 'all',
    year: 'all',
    minPackage: 0,
    maxPackage: 50,
  });

  const branches = [
    'Computer Science',
    'Electronics & Comm',
    'Mechanical',
    'Civil',
    'Electrical',
  ];

  const years = [2020, 2021, 2022, 2023, 2024];

  const handleBranchChange = (branch: string) => {
    setFilters({ ...filters, branch });
  };

  const handleYearChange = (year: number | string) => {
    setFilters({ ...filters, year: String(year) });
  };

  const handleReset = () => {
    setFilters({
      branch: 'all',
      year: 'all',
      minPackage: 0,
      maxPackage: 50,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {filters.branch !== 'all' || filters.year !== 'all' ? (
          <button
            onClick={handleReset}
            className="text-sm text-secondary dark:text-accent hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Reset
          </button>
        ) : null}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Branch Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
            Branch
          </label>
          <select
            value={filters.branch}
            onChange={(e) => handleBranchChange(e.target.value)}
            className="w-full px-3 py-2 border border-border dark:border-sidebar-border rounded-lg bg-white dark:bg-card text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent"
          >
            <option value="all">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full px-3 py-2 border border-border dark:border-sidebar-border rounded-lg bg-white dark:bg-card text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Min Package */}
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
            Min Package: ₹{filters.minPackage} LPA
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={filters.minPackage}
            onChange={(e) => setFilters({ ...filters, minPackage: Number(e.target.value) })}
            className="w-full accent-secondary dark:accent-accent"
          />
        </div>

        {/* Max Package */}
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
            Max Package: ₹{filters.maxPackage} LPA
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={filters.maxPackage}
            onChange={(e) => setFilters({ ...filters, maxPackage: Number(e.target.value) })}
            className="w-full accent-secondary dark:accent-accent"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.branch !== 'all' || filters.year !== 'all') && (
        <div className="flex flex-wrap gap-2 pt-2">
          {filters.branch !== 'all' && (
            <span className="px-3 py-1 bg-secondary/10 dark:bg-accent/10 text-secondary dark:text-accent rounded-full text-sm">
              {filters.branch}
            </span>
          )}
          {filters.year !== 'all' && (
            <span className="px-3 py-1 bg-secondary/10 dark:bg-accent/10 text-secondary dark:text-accent rounded-full text-sm">
              {filters.year}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
