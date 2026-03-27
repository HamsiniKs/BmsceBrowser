'use client';

import { useState } from 'react';
import { alumni } from '@/lib/mock-data';
import { AlumniCard } from './alumni-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function AlumniShowcase() {
  const [selectedAlumnus, setSelectedAlumnus] = useState(alumni[0]);

  return (
    <div className="space-y-8">
      {/* Alumni Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Select Alumni</h2>

        <div className="relative">
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-4 min-w-min px-4 -mx-4">
              {alumni.map((person) => (
                <button
                  key={person.id}
                  onClick={() => setSelectedAlumnus(person)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedAlumnus.id === person.id
                      ? 'bg-gradient-to-r from-secondary to-accent dark:from-accent dark:to-secondary text-white shadow-lg'
                      : 'bg-white dark:bg-card border border-border dark:border-sidebar-border text-foreground dark:text-white hover:border-secondary dark:hover:border-accent'
                  }`}
                >
                  <div className="text-sm font-semibold">{person.name}</div>
                  <div className="text-xs text-white/70">{person.batch}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Alumni Details */}
      <AlumniCard alumnus={selectedAlumnus} />
    </div>
  );
}
