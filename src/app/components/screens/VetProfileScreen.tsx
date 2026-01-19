import React from 'react';
import { ArrowLeft, MapPin, Star, Phone, Clock, AlertCircle, MessageCircle } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { StarDistribution } from '../ui/StarDistribution';
import { ReviewCard } from '../ui/ReviewCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface VetProfileScreenProps {
  vet: any;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function VetProfileScreen({ vet, onBack, onNavigate }: VetProfileScreenProps) {
  // Calculate distribution
  const distribution = {
    5: vet.reviews.filter((r: any) => r.rating === 5).length,
    4: vet.reviews.filter((r: any) => r.rating === 4).length,
    3: vet.reviews.filter((r: any) => r.rating === 3).length,
    2: vet.reviews.filter((r: any) => r.rating === 2).length,
    1: vet.reviews.filter((r: any) => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)] pb-20">
      {/* Header Image */}
      <div className="relative h-64 bg-gradient-to-br from-green-400 to-green-600">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
        >
          <ArrowLeft size={24} className="text-[var(--petmatch-text)]" />
        </button>

        {vet.photos && vet.photos.length > 0 ? (
          <ImageWithFallback
            src={vet.photos[0]}
            alt={vet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
              <ImageWithFallback
                src={vet.photo}
                alt={vet.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-start gap-4 mb-4">
            {(!vet.photos || vet.photos.length === 0) && (
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <ImageWithFallback
                  src={vet.photo}
                  alt={vet.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h1 className="text-2xl font-semibold text-[var(--petmatch-text)]">
                  {vet.name}
                </h1>
                {vet.emergency24h && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    24h
                  </span>
                )}
              </div>

              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-3">
                {vet.type}
              </span>

              <div className="flex items-center gap-1 mb-2">
                <Star size={20} className="text-yellow-400" fill="currentColor" />
                <span className="text-xl font-bold text-[var(--petmatch-text)]">
                  {vet.rating.toFixed(1)}
                </span>
                <span className="text-sm text-[var(--petmatch-text-muted)]">
                  ({vet.reviewCount} avaliações)
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--petmatch-text-muted)]">
                <MapPin size={16} />
                <span>{vet.location} • {vet.distance}</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {vet.acceptsEmergency && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm">
                <AlertCircle size={14} />
                <span>Emergências</span>
              </div>
            )}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm">
              <Clock size={14} />
              <span>{vet.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h2 className="font-semibold text-[var(--petmatch-text)] mb-2">
            Sobre
          </h2>
          <p className="text-sm text-[var(--petmatch-text-muted)]">
            {vet.description}
          </p>
        </div>
      </div>

      {/* Specialties */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h2 className="font-semibold text-[var(--petmatch-text)] mb-3">
            Especialidades / Serviços
          </h2>
          <div className="flex flex-wrap gap-2">
            {vet.specialties.map((specialty: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-100 text-[var(--petmatch-text)] text-sm rounded-lg"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      {vet.photos && vet.photos.length > 1 && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h2 className="font-semibold text-[var(--petmatch-text)] mb-3">
              Galeria
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {vet.photos.map((photo: string, idx: number) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={photo}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h2 className="font-semibold text-[var(--petmatch-text)] mb-4">
            Avaliações
          </h2>

          {/* Rating Summary */}
          <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-100">
            <div className="text-center">
              <div className="text-5xl font-bold text-[var(--petmatch-text)] mb-2">
                {vet.rating.toFixed(1)}
              </div>
              <StarRating rating={vet.rating} size={18} />
              <p className="text-xs text-[var(--petmatch-text-muted)] mt-2">
                {vet.reviewCount} avaliações
              </p>
            </div>

            <div className="flex-1">
              <StarDistribution distribution={distribution} totalReviews={vet.reviewCount} />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {vet.reviews.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom z-10">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => onNavigate('create-vet-review', { vet })}
            className="flex-1 py-3 bg-yellow-400 text-[var(--petmatch-text)] font-semibold rounded-xl hover:bg-yellow-500 transition-colors"
          >
            Avaliar
          </button>
          
          {vet.showPhone && (
            <a
              href={`tel:${vet.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--petmatch-primary)] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Phone size={20} />
              Contato
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
