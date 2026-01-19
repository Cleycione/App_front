import React from 'react';
import { MoreVertical, MapPin, Clock } from 'lucide-react';
import { Card } from './Card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PetCardProps {
  pet: {
    id: string;
    name: string;
    species: string;
    breed?: string;
    color: string;
    size: string;
    photo?: string;
    isLost?: boolean;
    lostDate?: string;
    lastSeenLocation?: string;
  };
  onClick?: () => void;
  onOptionsClick?: () => void;
}

export function PetCard({ pet, onClick, onOptionsClick }: PetCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={`p-4 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${
        pet.isLost ? 'border-l-4 border-l-[var(--app-warning)]' : ''
      }`}
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--app-gray-100)]">
          {pet.photo ? (
            <ImageWithFallback
              src={pet.photo}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              🐾
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-[var(--app-gray-900)] truncate">
                {pet.name}
              </h3>
              <p className="text-sm text-[var(--app-gray-600)]">
                {pet.species} {pet.breed ? `• ${pet.breed}` : ''}
              </p>
            </div>
            {onOptionsClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOptionsClick();
                }}
                className="text-[var(--app-gray-500)] hover:text-[var(--app-gray-700)] p-1"
              >
                <MoreVertical size={20} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-[var(--app-gray-100)] text-[var(--app-gray-700)] px-2 py-1 rounded-full">
              {pet.color}
            </span>
            <span className="bg-[var(--app-gray-100)] text-[var(--app-gray-700)] px-2 py-1 rounded-full">
              {pet.size}
            </span>
          </div>

          {pet.isLost && (
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-xs text-[var(--app-warning)]">
                <MapPin size={14} />
                <span className="truncate">{pet.lastSeenLocation}</span>
              </div>
              {pet.lostDate && (
                <div className="flex items-center gap-2 text-xs text-[var(--app-gray-600)]">
                  <Clock size={14} />
                  <span>Perdido em {pet.lostDate}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
