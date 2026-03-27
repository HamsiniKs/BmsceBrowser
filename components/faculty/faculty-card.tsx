'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

interface FacultyMember {
  id: number;
  name: string;
  department: string;
  specialization: string;
  experience: number;
  image: string;
}

interface FacultyCardProps {
  faculty: FacultyMember;
}

export function FacultyCard({ faculty }: FacultyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-80 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-white dark:bg-card rounded-xl overflow-hidden shadow-lg border border-border dark:border-sidebar-border"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative w-full h-full group">
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={faculty.image}
                alt={faculty.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary dark:to-sidebar/80" />
            </div>

            {/* Content on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{faculty.name}</h3>
              <p className="text-sm text-white/80">{faculty.department}</p>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-secondary to-accent dark:from-accent dark:to-secondary rounded-xl overflow-hidden shadow-lg border border-secondary/50 dark:border-accent/50 p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Specialization</p>
              <p className="font-bold text-white">{faculty.specialization}</p>
            </div>

            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Experience</p>
                <p className="font-bold text-white">{faculty.experience} years</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Department</p>
                <p className="font-bold text-white text-sm">{faculty.department}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/20">
            <p className="text-white/70 text-xs text-center">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}
