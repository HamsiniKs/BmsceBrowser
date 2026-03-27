'use client';

import { Briefcase, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface JourneyStage {
  year: number;
  role: string;
  company: string;
  location?: string;
}

interface Alumnus {
  id: number;
  name: string;
  batch: number;
  currentRole: string;
  company: string;
  currentLocation: string;
  journey: JourneyStage[];
}

interface AlumniCardProps {
  alumnus: Alumnus;
}

export function AlumniCard({ alumnus }: AlumniCardProps) {
  const yearsWorking = new Date().getFullYear() - alumnus.batch;
  const currentStage = alumnus.journey[alumnus.journey.length - 1];
  const promotions = alumnus.journey.length - 1;

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-secondary via-accent to-secondary dark:from-accent dark:via-secondary dark:to-accent rounded-xl p-8 text-white shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Current Position</p>
              <h2 className="text-3xl font-bold">{alumnus.currentRole}</h2>
              <p className="text-lg text-white/90 mt-1">{alumnus.company}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{alumnus.currentLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span>{yearsWorking} years in industry</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>{promotions} promotion{promotions !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-white/80 text-xs uppercase tracking-wider mb-2">Graduation Year</p>
              <p className="text-3xl font-bold">{alumnus.batch}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-white/80 text-xs uppercase tracking-wider mb-2">Career Stage</p>
              <p className="text-3xl font-bold">{yearsWorking}y</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur col-span-2">
              <p className="text-white/80 text-xs uppercase tracking-wider mb-2">Success Metric</p>
              <p className="text-lg font-bold">
                From Intern to {alumnus.currentRole.split(' ')[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Career Journey Timeline */}
      <div className="bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-border dark:border-sidebar-border">
        <h3 className="text-2xl font-bold mb-8 text-foreground dark:text-white">Career Journey</h3>

        <div className="space-y-6">
          {alumnus.journey.map((stage, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Timeline Dot and Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    index === alumnus.journey.length - 1
                      ? 'bg-secondary dark:bg-accent border-secondary dark:border-accent shadow-lg'
                      : 'bg-muted dark:bg-sidebar border-secondary dark:border-accent'
                  }`}
                />
                {index < alumnus.journey.length - 1 && (
                  <div className="w-0.5 h-20 bg-gradient-to-b from-secondary dark:from-accent to-muted dark:to-sidebar mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="pb-6 flex-grow">
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-secondary/10 dark:to-accent/10 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground dark:text-white/60 uppercase tracking-wider">
                        {stage.year}
                      </p>
                      <h4 className="text-lg font-bold text-foreground dark:text-white">
                        {stage.role}
                      </h4>
                    </div>
                    {index === alumnus.journey.length - 1 && (
                      <span className="text-xs font-semibold bg-secondary dark:bg-accent text-white px-3 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground dark:text-white/80">
                      <Briefcase className="w-4 h-4 text-secondary dark:text-accent" />
                      <span className="font-medium">{stage.company}</span>
                    </div>
                    {stage.location && (
                      <div className="flex items-center gap-2 text-foreground dark:text-white/80">
                        <MapPin className="w-4 h-4 text-secondary dark:text-accent" />
                        <span>{stage.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Growth Indicator */}
                {index < alumnus.journey.length - 1 && (
                  <div className="mt-3 text-xs font-medium text-secondary dark:text-accent flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Career Growth
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Achievements */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm border border-border dark:border-sidebar-border text-center">
          <p className="text-3xl font-bold text-secondary dark:text-accent mb-2">{yearsWorking}</p>
          <p className="text-sm text-muted-foreground dark:text-white/70">Years of Experience</p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm border border-border dark:border-sidebar-border text-center">
          <p className="text-3xl font-bold text-secondary dark:text-accent mb-2">{promotions}</p>
          <p className="text-sm text-muted-foreground dark:text-white/70">Career Advancements</p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm border border-border dark:border-sidebar-border text-center">
          <p className="text-3xl font-bold text-secondary dark:text-accent mb-2">{alumnus.journey.length}</p>
          <p className="text-sm text-muted-foreground dark:text-white/70">Career Roles</p>
        </div>
      </div>
    </div>
  );
}
