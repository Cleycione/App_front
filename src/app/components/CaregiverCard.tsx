import React from 'react';
import { MapPin, MessageCircle, Star, CheckCircle } from 'lucide-react';
import { StarRating } from './ui/StarRating';

export interface Caregiver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  verified?: boolean;
  acceptsEmergency?: boolean;
  available?: boolean;
  badges?: string[];
}

interface CaregiverCardProps {
  caregiver: Caregiver;
  onViewProfile: () => void;
  onOpenChat: () => void;
}

export function CaregiverCard({ caregiver, onViewProfile, onOpenChat }: CaregiverCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[var(--petmatch-border)] p-4 hover:shadow-md transition">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative">
          <img 
            src={caregiver.photo} 
            alt={caregiver.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {caregiver.verified && (
            <div className="absolute -bottom-1 -right-1 bg-[var(--petmatch-success)] rounded-full p-0.5">
              <CheckCircle size={14} className="text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--petmatch-text)] mb-1">
            {caregiver.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-medium text-sm">{caregiver.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-[var(--petmatch-text-muted)]">
              ({caregiver.reviewCount})
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {caregiver.acceptsEmergency && (
              <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full border border-red-200">
                Aceita emergências
              </span>
            )}
            {caregiver.available && (
              <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                Disponível
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-[var(--petmatch-text-muted)]">
            <MapPin size={14} />
            <span>{caregiver.location} • {caregiver.distance}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onViewProfile}
          className="flex-1 py-2 border border-[var(--petmatch-primary)] text-[var(--petmatch-primary)] rounded-lg hover:bg-blue-50 transition font-medium text-sm"
        >
          Ver perfil
        </button>
        <button
          onClick={onOpenChat}
          className="flex-1 py-2 bg-[var(--petmatch-primary)] text-white rounded-lg hover:bg-blue-600 transition font-medium text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle size={16} />
          Chat
        </button>
      </div>
    </div>
  );
}
