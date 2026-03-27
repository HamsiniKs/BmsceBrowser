'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface Seat {
  id: string;
  occupied: boolean;
  occupant: string | null;
}

interface SeatGridProps {
  seats: Seat[];
}

export function SeatGrid({ seats }: SeatGridProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatId: string, occupied: boolean) => {
    if (occupied) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleReserve = () => {
    if (selectedSeats.length > 0) {
      alert(`Reserved seats: ${selectedSeats.join(', ')}`);
      setSelectedSeats([]);
    }
  };

  const handleFindBest = () => {
    const availableSeats = seats.filter((s) => !s.occupied);
    if (availableSeats.length > 0) {
      const bestSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
      setSelectedSeats([bestSeat.id]);
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-border dark:border-sidebar-border">
      <div className="space-y-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-chart-1 dark:bg-chart-1 rounded" />
            <span className="text-foreground dark:text-white">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted dark:bg-sidebar rounded" />
            <span className="text-foreground dark:text-white">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-secondary dark:bg-accent rounded" />
            <span className="text-foreground dark:text-white">Selected</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground dark:text-white/70">
            Click on seats to reserve (Interactive Grid)
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => toggleSeat(seat.id, seat.occupied)}
                disabled={seat.occupied}
                title={seat.occupied ? `Occupied by ${seat.occupant}` : seat.id}
                className={`aspect-square rounded-lg font-bold text-sm transition-all transform hover:scale-105 flex items-center justify-center relative group ${
                  seat.occupied
                    ? 'bg-muted dark:bg-sidebar cursor-not-allowed text-muted-foreground dark:text-white/60'
                    : selectedSeats.includes(seat.id)
                      ? 'bg-secondary dark:bg-accent text-white shadow-lg scale-105'
                      : 'bg-chart-1 dark:bg-chart-1 text-white hover:shadow-lg'
                }`}
              >
                {selectedSeats.includes(seat.id) && <Check className="w-4 h-4 absolute" />}
                {seat.occupied || !selectedSeats.includes(seat.id) ? seat.id : ''}

                {/* Tooltip for occupied seats */}
                {seat.occupied && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-foreground dark:bg-white text-white dark:text-primary px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {seat.occupant}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleFindBest}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-chart-2 to-chart-3 dark:from-chart-3 dark:to-chart-2 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Find Best Seat
          </button>
          <button
            onClick={handleReserve}
            disabled={selectedSeats.length === 0}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              selectedSeats.length > 0
                ? 'bg-secondary dark:bg-accent text-white hover:shadow-lg'
                : 'bg-muted dark:bg-sidebar text-muted-foreground dark:text-white/60 cursor-not-allowed'
            }`}
          >
            Reserve {selectedSeats.length > 0 ? `(${selectedSeats.length})` : ''}
          </button>
        </div>

        {selectedSeats.length > 0 && (
          <div className="p-4 bg-secondary/10 dark:bg-accent/10 rounded-lg">
            <p className="text-sm font-medium text-secondary dark:text-accent mb-2">
              Selected Seats:
            </p>
            <p className="text-sm text-foreground dark:text-white">{selectedSeats.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
