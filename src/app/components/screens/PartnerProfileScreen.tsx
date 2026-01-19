import React from 'react';
import { ArrowLeft, MapPin, Star, Phone, Clock, Truck, Package, MessageCircle } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { StarDistribution } from '../ui/StarDistribution';
import { ReviewCard } from '../ui/ReviewCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ProductCard } from '../ui/ProductCard';

interface PartnerProfileScreenProps {
  partner: any;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function PartnerProfileScreen({ partner, onBack, onNavigate }: PartnerProfileScreenProps) {
  // Calculate distribution
  const distribution = {
    5: partner.reviews.filter((r: any) => r.rating === 5).length,
    4: partner.reviews.filter((r: any) => r.rating === 4).length,
    3: partner.reviews.filter((r: any) => r.rating === 3).length,
    2: partner.reviews.filter((r: any) => r.rating === 2).length,
    1: partner.reviews.filter((r: any) => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)] pb-20">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
        >
          <ArrowLeft size={24} className="text-[var(--petmatch-text)]" />
        </button>

        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white">
            <ImageWithFallback
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-[var(--petmatch-text)] mb-2">
              {partner.name}
            </h1>

            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
              {partner.category}
            </span>

            <div className="flex items-center justify-center gap-1 mb-2">
              <Star size={20} className="text-yellow-400" fill="currentColor" />
              <span className="text-xl font-bold text-[var(--petmatch-text)]">
                {partner.rating.toFixed(1)}
              </span>
              <span className="text-sm text-[var(--petmatch-text-muted)]">
                ({partner.reviewCount} avaliações)
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-[var(--petmatch-text-muted)]">
              <MapPin size={16} />
              <span>{partner.location} • {partner.distance}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            {partner.delivery && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm">
                <Truck size={14} />
                <span>Entrega disponível</span>
              </div>
            )}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm">
              <Clock size={14} />
              <span>{partner.hours}</span>
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
            {partner.description}
          </p>
        </div>
      </div>

      {/* Products Section */}
      {partner.products && partner.products.length > 0 && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-[var(--petmatch-primary)]" />
                <h2 className="font-semibold text-[var(--petmatch-text)]">
                  Produtos
                </h2>
              </div>
              <span className="text-sm text-[var(--petmatch-text-muted)]">
                {partner.products.length}/10
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {partner.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
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
                {partner.rating.toFixed(1)}
              </div>
              <StarRating rating={partner.rating} size={18} />
              <p className="text-xs text-[var(--petmatch-text-muted)] mt-2">
                {partner.reviewCount} avaliações
              </p>
            </div>

            <div className="flex-1">
              <StarDistribution distribution={distribution} totalReviews={partner.reviewCount} />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {partner.reviews.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom z-10">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => onNavigate('create-partner-review', { partner })}
            className="flex-1 py-3 bg-yellow-400 text-[var(--petmatch-text)] font-semibold rounded-xl hover:bg-yellow-500 transition-colors"
          >
            Avaliar
          </button>
          
          {partner.showPhone && (
            <a
              href={`tel:${partner.phone}`}
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
