'use client';

import { useState } from 'react';
import { faculty } from '@/lib/mock-data';
import { Search, X } from 'lucide-react';
import { FacultyCard } from './faculty-card';

export function FacultyGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedExp, setSelectedExp] = useState<string>('all');

  const departments = [...new Set(faculty.map((f) => f.department))];
  const experienceLevels = {
    all: 'All Levels',
    junior: 'Junior (< 10 years)',
    mid: 'Mid (10-15 years)',
    senior: 'Senior (15+ years)',
  };

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = !selectedDept || f.department === selectedDept;

    let matchesExp = true;
    if (selectedExp === 'junior') matchesExp = f.experience < 10;
    if (selectedExp === 'mid') matchesExp = f.experience >= 10 && f.experience < 15;
    if (selectedExp === 'senior') matchesExp = f.experience >= 15;

    return matchesSearch && matchesDept && matchesExp;
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedDept(null);
    setSelectedExp('all');
  };

  const isFiltered = searchTerm || selectedDept || selectedExp !== 'all';

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
            Search Faculty
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-white/50" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-sidebar-border rounded-lg bg-white dark:bg-primary text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
              Department
            </label>
            <select
              value={selectedDept || 'all'}
              onChange={(e) => setSelectedDept(e.target.value === 'all' ? null : e.target.value)}
              className="w-full px-3 py-2 border border-border dark:border-sidebar-border rounded-lg bg-white dark:bg-primary text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
              Experience Level
            </label>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full px-3 py-2 border border-border dark:border-sidebar-border rounded-lg bg-white dark:bg-primary text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent"
            >
              {Object.entries(experienceLevels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-muted dark:bg-sidebar hover:bg-secondary/20 dark:hover:bg-accent/20 text-secondary dark:text-accent rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground dark:text-white/70">
          Showing {filteredFaculty.length} of {faculty.length} faculty members
        </p>
      </div>

      {/* Faculty Grid */}
      {filteredFaculty.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <FacultyCard key={member.id} faculty={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground dark:text-white/70 mb-4">
            No faculty members found matching your filters
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-secondary dark:bg-accent text-white rounded-lg hover:shadow-lg transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
