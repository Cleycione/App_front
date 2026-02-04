import React, { useState } from 'react';
import { ArrowLeft, MapPin, Share2, AlertCircle, MessageCircle, User, Calendar, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { HealthChip } from '../ui/HealthChip';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { DonationUi } from '../../types/ui';

interface DonationDetailsScreenProps {
  donation: DonationUi;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function DonationDetailsScreen({ donation, onBack, onNavigate }: DonationDetailsScreenProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[var(--app-gray-900)]">
          Detalhes da Doação
        </h1>
      </div>

      <div className="space-y-6">
        {/* Photo Gallery */}
        <div className="relative">
          <div className="w-full h-80 bg-[var(--app-gray-200)]">
            <ImageWithFallback
              src={donation.photos[selectedPhotoIndex]}
              alt={donation.petName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo Indicators */}
          {donation.photos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {donation.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedPhotoIndex === index
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => alert('Adicionar aos favoritos')}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <Heart size={24} className="text-pink-500" />
          </button>
        </div>

        <div className="px-4 space-y-6">
          {/* Pet Info */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[var(--app-gray-900)] mb-2">
                  {donation.petName}
                </h2>
                <p className="text-[var(--app-gray-600)]">
                  {donation.species} • {donation.size} • {donation.ageRange}
                </p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Disponível
              </span>
            </div>

            {/* Health Status */}
            <div className="mb-6">
              <h3 className="text-sm text-[var(--app-gray-600)] mb-3">Saúde</h3>
              <div className="flex flex-wrap gap-2">
                <HealthChip label="Vacinado" status={donation.health.vaccinated} />
                <HealthChip label="Castrado" status={donation.health.neutered} />
                <HealthChip label="Vermifugado" status={donation.health.dewormed} />
              </div>

              {donation.health.hasPreexistingCondition && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 mb-1">
                        Condição preexistente
                      </p>
                      <p className="text-sm text-amber-700">
                        {donation.health.conditionDetails}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Temperament */}
            {(donation.temperament || donation.goodWithKids !== undefined || donation.goodWithPets !== undefined) && (
              <div>
                <h3 className="text-sm text-[var(--app-gray-600)] mb-3">Temperamento</h3>
                {donation.temperament && (
                  <p className="text-[var(--app-gray-700)] mb-3">{donation.temperament}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {donation.goodWithKids && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Ótimo com crianças
                    </span>
                  )}
                  {donation.goodWithPets && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      Convive com outros pets
                    </span>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Observations */}
          {donation.observations && (
            <Card className="p-6">
              <h3 className="text-sm text-[var(--app-gray-600)] mb-3">Observações</h3>
              <p className="text-[var(--app-gray-700)]">{donation.observations}</p>
            </Card>
          )}

          {/* Location */}
          <Card className="p-6">
            <h3 className="text-sm text-[var(--app-gray-600)] mb-3">Localização</h3>
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-[var(--app-gray-500)] flex-shrink-0" />
              <div>
                <p className="text-[var(--app-gray-900)]">
                  {donation.location.neighborhood}, {donation.location.city} - {donation.location.state}
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Aproximadamente {donation.location.distance} de você
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-32 bg-[var(--app-gray-200)] rounded-xl flex items-center justify-center">
              <MapPin size={32} className="text-[var(--app-gray-400)]" />
            </div>
          </Card>

          {/* Donor Info */}
          <Card className="p-6">
            <h3 className="text-sm text-[var(--app-gray-600)] mb-4">Sobre o doador</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--app-gray-200)] rounded-full flex items-center justify-center">
                <User size={24} className="text-[var(--app-gray-500)]" />
              </div>
              <div className="flex-1">
                <p className="text-[var(--app-gray-900)]">{donation.donor.name}</p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Membro desde {donation.donor.memberSince}
                </p>
              </div>
            </div>

            {donation.donor.showPhone && donation.donor.phone && (
              <div className="bg-[var(--app-gray-50)] rounded-xl p-3">
                <p className="text-sm text-[var(--app-gray-600)] mb-1">Telefone</p>
                <p className="text-[var(--app-gray-900)]">{donation.donor.phone}</p>
              </div>
            )}
          </Card>

          {/* Published Date */}
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--app-gray-500)]">
            <Calendar size={16} />
            <span>
              Publicado em {new Date(donation.publishedDate).toLocaleDateString('pt-BR')}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                // In real app, would navigate to chat with donor
                alert('Abrindo chat com o doador...');
              }}
            >
              <MessageCircle size={20} />
              Tenho interesse
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => alert('Compartilhando...')}
              >
                <Share2 size={18} />
                Compartilhar
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  if (confirm('Deseja denunciar esta doação?')) {
                    alert('Denúncia enviada para análise');
                  }
                }}
              >
                <AlertCircle size={18} />
                Denunciar
              </Button>
            </div>
          </div>

          {/* Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-[var(--app-gray-700)]">
              <strong>Lembre-se:</strong> Adotar um pet é uma responsabilidade permanente.
              Certifique-se de que pode oferecer os cuidados necessários antes de prosseguir.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
