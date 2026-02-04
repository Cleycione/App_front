import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Card } from './Card';
import { HealthChip } from './HealthChip';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { DonationUi } from '../../types/ui';

interface DonationCardProps {
  donation: DonationUi;
  onClick?: () => void;
  showNewBadge?: boolean;
}

export function DonationCard({ donation, onClick, showNewBadge = false }: DonationCardProps) {
  const isNew = showNewBadge && new Date(donation.publishedDate) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <Card
      onClick={onClick}
      className={`overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-[var(--app-gray-200)]">
        <ImageWithFallback
          src={donation.photos[0]}
          alt={donation.petName}
          className="w-full h-full object-cover"
        />
        {isNew && (
          <div className="absolute top-3 right-3 bg-[var(--app-warning)] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Novo
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm text-[var(--app-gray-900)] px-3 py-1 rounded-full text-sm font-semibold">
            {donation.ageRange}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-[var(--app-gray-900)] mb-1">
              {donation.petName}
            </h3>
            <p className="text-sm text-[var(--app-gray-600)]">
              {donation.species} • {donation.size}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert('Adicionar aos favoritos');
            }}
            className="p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
          >
            <Heart size={20} className="text-[var(--app-gray-400)]" />
          </button>
        </div>

        {/* Health Badges */}
        <div className="flex flex-wrap gap-2">
          {donation.health.vaccinated && <HealthChip label="Vacinado" status={true} size="sm" />}
          {donation.health.neutered && <HealthChip label="Castrado" status={true} size="sm" />}
          {donation.health.dewormed && <HealthChip label="Vermifugado" status={true} size="sm" />}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-[var(--app-gray-600)]">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="truncate">
            {donation.location.neighborhood} • {donation.location.distance}
          </span>
        </div>

        {/* Temperament */}
        {donation.temperament && (
          <p className="text-sm text-[var(--app-gray-700)] line-clamp-2">
            {donation.temperament}
          </p>
        )}
      </div>
    </Card>
  );
}
