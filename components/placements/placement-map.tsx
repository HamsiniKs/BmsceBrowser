'use client';

import { useState } from 'react';
import { stateWisePlacementData, topCompanies } from '@/lib/mock-data';
import { MapPin, Users, TrendingUp } from 'lucide-react';

export function PlacementMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const states = Object.keys(stateWisePlacementData);
  const maxPlacements = Math.max(...states.map((state) => stateWisePlacementData[state as keyof typeof stateWisePlacementData].placements));

  const getHeatmapColor = (placements: number) => {
    const intensity = placements / maxPlacements;
    if (intensity > 0.7) return 'from-chart-1 to-chart-2';
    if (intensity > 0.4) return 'from-chart-2 to-chart-3';
    return 'from-chart-3 to-chart-4';
  };

  const currentState = selectedState
    ? stateWisePlacementData[selectedState as keyof typeof stateWisePlacementData]
    : null;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Map/Grid View */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
          <h3 className="text-lg font-semibold mb-6 text-foreground dark:text-white">
            Placement Heatmap by State
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {states.map((state) => {
              const data = stateWisePlacementData[state as keyof typeof stateWisePlacementData];
              const isSelected = selectedState === state;
              const bgGradient = getHeatmapColor(data.placements);

              return (
                <button
                  key={state}
                  onClick={() => {
                    setSelectedState(isSelected ? null : state);
                    setSelectedCity(null);
                  }}
                  className={`relative p-4 rounded-lg transition-all transform hover:scale-105 group ${
                    isSelected
                      ? 'ring-2 ring-secondary dark:ring-accent shadow-lg'
                      : 'bg-muted dark:bg-sidebar border border-border dark:border-sidebar-border hover:border-secondary dark:hover:border-accent'
                  }`}
                >
                  <div className={`absolute inset-0 rounded-lg opacity-10 bg-gradient-to-br ${bgGradient}`} />
                  <div className="relative">
                    <p className="font-semibold text-foreground dark:text-white text-sm mb-1">
                      {state}
                    </p>
                    <p className="text-2xl font-bold text-secondary dark:text-accent mb-1">
                      {data.placements}
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-white/60">
                      ₹{data.avgPackage} LPA avg
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* City Drill-down */}
        {selectedState && currentState && (
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
            <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary dark:text-accent" />
              Cities in {selectedState}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentState.cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedCity === city
                      ? 'bg-secondary dark:bg-accent text-white dark:text-primary ring-2 ring-offset-2 ring-secondary dark:ring-accent'
                      : 'bg-muted dark:bg-sidebar border border-border dark:border-sidebar-border text-foreground dark:text-white hover:border-secondary dark:hover:border-accent'
                  }`}
                >
                  <p className="font-medium text-sm">{city}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="space-y-4">
        {selectedState && currentState ? (
          <>
            <div className="bg-gradient-to-br from-secondary to-accent dark:from-accent dark:to-secondary rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm text-white/80 mb-2">Selected State</p>
              <h3 className="text-3xl font-bold mb-4">{selectedState}</h3>

              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/70">Total Placements</p>
                  <p className="text-2xl font-bold">{currentState.placements}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/70">Average Package</p>
                  <p className="text-2xl font-bold">₹{currentState.avgPackage} LPA</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/70">Cities</p>
                  <p className="text-2xl font-bold">{currentState.cities.length}</p>
                </div>
              </div>

              {selectedCity && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold mb-2">Currently viewing: {selectedCity}</p>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Clear city filter
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
              <h4 className="font-semibold mb-4 text-foreground dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary dark:text-accent" />
                Top Companies
              </h4>
              <div className="space-y-2">
                {topCompanies.slice(0, 5).map((company) => (
                  <div key={company.name} className="flex items-center justify-between p-2 rounded hover:bg-muted dark:hover:bg-sidebar transition-colors">
                    <p className="text-sm font-medium text-foreground dark:text-white">{company.name}</p>
                    <span className="text-xs font-semibold text-secondary dark:text-accent bg-secondary/10 dark:bg-accent/10 px-2 py-1 rounded">
                      {company.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-secondary dark:text-accent/50 mb-3" />
            <p className="text-muted-foreground dark:text-white/70 text-sm">
              Select a state to view detailed insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
