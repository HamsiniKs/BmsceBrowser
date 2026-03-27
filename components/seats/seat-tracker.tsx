'use client';

import { useState } from 'react';
import { seatAvailability } from '@/lib/mock-data';
import { SeatGrid } from './seat-grid';
import { MapPin, Zap } from 'lucide-react';

export function SeatTracker() {
  const [activeLocation, setActiveLocation] = useState<'library' | 'canteen'>('library');
  const [zone, setZone] = useState<string | null>(null);

  const locations = {
    library: {
      name: 'Library',
      icon: '📚',
      description: 'Quiet study spaces with full amenities',
    },
    canteen: {
      name: 'Canteen',
      icon: '🍽️',
      description: 'Relaxation and meal area',
    },
  };

  const currentLocation = seatAvailability[activeLocation];
  const occupiedSeats = currentLocation.zones.filter((s) => s.occupied).length;
  const availableSeats = currentLocation.zones.length - occupiedSeats;
  const occupancyPercentage = Math.round((occupiedSeats / currentLocation.zones.length) * 100);

  const zones = [...new Set(currentLocation.zones.map((seat) => seat.id.charAt(0)))];
  const filteredSeats = zone
    ? currentLocation.zones.filter((seat) => seat.id.startsWith(zone))
    : currentLocation.zones;

  return (
    <div className="space-y-8">
      {/* Location Tabs */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(locations).map(([key, location]) => (
          <button
            key={key}
            onClick={() => {
              setActiveLocation(key as 'library' | 'canteen');
              setZone(null);
            }}
            className={`p-6 rounded-xl transition-all ${
              activeLocation === key
                ? 'bg-gradient-to-br from-secondary to-accent dark:from-accent dark:to-secondary text-white ring-2 ring-offset-2 ring-secondary dark:ring-accent'
                : 'bg-white dark:bg-card border border-border dark:border-sidebar-border text-foreground dark:text-white hover:border-secondary dark:hover:border-accent'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-2xl font-bold">{location.icon}</h3>
              <span className="text-sm font-semibold">
                {activeLocation === key ? '✓ Active' : ''}
              </span>
            </div>
            <p className="text-lg font-bold mb-1">{location.name}</p>
            <p className={`text-sm ${activeLocation === key ? 'text-white/80' : 'text-muted-foreground dark:text-white/70'}`}>
              {location.description}
            </p>
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm border border-border dark:border-sidebar-border">
          <p className="text-sm text-muted-foreground dark:text-white/60 mb-2">Total Seats</p>
          <p className="text-3xl font-bold text-foreground dark:text-white">{currentLocation.zones.length}</p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm border border-border dark:border-sidebar-border">
          <p className="text-sm text-muted-foreground dark:text-white/60 mb-2">Available</p>
          <p className="text-3xl font-bold text-accent dark:text-chart-1">{availableSeats}</p>
        </div>
        <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm border border-border dark:border-sidebar-border">
          <p className="text-sm text-muted-foreground dark:text-white/60 mb-2">Occupancy</p>
          <p className="text-3xl font-bold text-secondary dark:text-accent">{occupancyPercentage}%</p>
        </div>
      </div>

      {/* Occupancy Bar */}
      <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
        <p className="text-sm font-medium text-muted-foreground dark:text-white/70 mb-3">Overall Occupancy</p>
        <div className="w-full bg-muted dark:bg-sidebar rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-chart-3 to-chart-1 transition-all"
            style={{ width: `${occupancyPercentage}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground dark:text-white/60 mt-2">
          {occupiedSeats} occupied, {availableSeats} available
        </p>
      </div>

      {/* Zone Filter */}
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground dark:text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary dark:text-accent" />
            Filter by Zone
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setZone(null)}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                zone === null
                  ? 'bg-secondary dark:bg-accent text-white'
                  : 'bg-muted dark:bg-sidebar border border-border dark:border-sidebar-border text-foreground dark:text-white hover:border-secondary dark:hover:border-accent'
              }`}
            >
              All Zones
            </button>
            {zones.map((z) => {
              const zoneSeats = currentLocation.zones.filter((s) => s.id.startsWith(z));
              const zoneOccupied = zoneSeats.filter((s) => s.occupied).length;
              return (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                    zone === z
                      ? 'bg-secondary dark:bg-accent text-white'
                      : 'bg-muted dark:bg-sidebar border border-border dark:border-sidebar-border text-foreground dark:text-white hover:border-secondary dark:hover:border-accent'
                  }`}
                >
                  Zone {z}
                  <span className="block text-xs mt-1 text-white/70">
                    {zoneOccupied}/{zoneSeats.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border dark:border-sidebar-border">
        <p className="text-sm font-medium text-foreground dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-secondary dark:text-accent" />
          Amenities Available
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currentLocation.amenities.map((amenity) => (
            <div
              key={amenity}
              className="px-4 py-2 bg-gradient-to-br from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-lg text-center"
            >
              <p className="text-sm font-medium text-secondary dark:text-accent">{amenity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Grid */}
      <SeatGrid seats={filteredSeats} />
    </div>
  );
}
