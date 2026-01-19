import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, CheckCircle, MessageCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { StarRating } from '../ui/StarRating';

interface CaregiverProfileScreenProps {
  caregiver: any;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function CaregiverProfileScreen({ caregiver, onBack, onNavigate }: CaregiverProfileScreenProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 69 },
    { stars: 4, count: 32, percentage: 23 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 0 }
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === caregiver.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? caregiver.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-[var(--petmatch-bg-light)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--petmatch-border)] sticky top-0 z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-[var(--petmatch-text)]">
              Perfil do Cuidador
            </h1>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Denunciar
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex gap-4 mb-4">
            <div className="relative">
              <img 
                src={caregiver.photo} 
                alt={caregiver.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              {caregiver.verified && (
                <div className="absolute -bottom-1 -right-1 bg-[var(--petmatch-success)] rounded-full p-1">
                  <CheckCircle size={16} className="text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[var(--petmatch-text)] mb-1">
                {caregiver.name}
              </h2>
              <div className="flex items-center gap-1 text-[var(--petmatch-text-muted)] mb-2">
                <MapPin size={14} />
                <span className="text-sm">{caregiver.location}</span>
              </div>
              
              {caregiver.verified && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                  <CheckCircle size={12} />
                  Verificado
                </div>
              )}
            </div>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--petmatch-text)] mb-1">
                {caregiver.rating.toFixed(1)}
              </div>
              <StarRating rating={caregiver.rating} size={18} />
              <div className="text-xs text-[var(--petmatch-text-muted)] mt-1">
                {caregiver.reviewCount} avaliações
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--petmatch-text-muted)] w-6">
                    {item.stars}★
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--petmatch-text-muted)] w-8 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-[var(--petmatch-text)] mb-3">
            Fotos do Local
          </h3>
          
          {caregiver.photos && caregiver.photos.length > 0 && (
            <div className="relative">
              <img 
                src={caregiver.photos[currentPhotoIndex]} 
                alt={`Foto ${currentPhotoIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {caregiver.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentPhotoIndex + 1} / {caregiver.photos.length}
                  </div>
                </>
              )}
            </div>
          )}
          
          {caregiver.photos && caregiver.photos.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {caregiver.photos.map((photo: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    index === currentPhotoIndex ? 'ring-2 ring-[var(--petmatch-primary)]' : ''
                  }`}
                >
                  <img 
                    src={photo} 
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-[var(--petmatch-text)]">
            Sobre
          </h3>
          
          <div>
            <p className="text-sm font-medium text-[var(--petmatch-text)] mb-1">
              Experiência
            </p>
            <p className="text-sm text-[var(--petmatch-text-muted)]">
              {caregiver.experience}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--petmatch-text)] mb-1">
              Pets aceitos
            </p>
            <p className="text-sm text-[var(--petmatch-text-muted)]">
              {caregiver.petsAccepted?.join(', ')}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--petmatch-text)] mb-1">
              Porte aceito
            </p>
            <p className="text-sm text-[var(--petmatch-text-muted)]">
              {caregiver.sizeAccepted?.join(', ')}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--petmatch-text)] mb-1">
              Disponibilidade
            </p>
            <p className="text-sm text-[var(--petmatch-text-muted)]">
              {caregiver.availability}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--petmatch-text)] mb-1">
              Regras da casa
            </p>
            <p className="text-sm text-[var(--petmatch-text-muted)]">
              {caregiver.rules}
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--petmatch-text)]">
              Avaliações ({caregiver.reviews?.length || 0})
            </h3>
            <button
              onClick={() => onNavigate('create-review', { caregiver })}
              className="text-sm text-[var(--petmatch-primary)] font-medium hover:underline"
            >
              Avaliar
            </button>
          </div>

          <div className="space-y-4">
            {caregiver.reviews?.map((review: any) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm text-[var(--petmatch-text)]">
                      {review.userName}
                    </p>
                    <p className="text-xs text-[var(--petmatch-text-muted)]">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>
                <p className="text-sm text-[var(--petmatch-text-muted)]">
                  {review.comment}
                </p>
                <button className="text-xs text-red-500 hover:underline mt-2">
                  Denunciar avaliação
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--petmatch-border)] p-4 max-w-md mx-auto">
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('chat', { caregiver })}
            className="flex-1 py-3 bg-[var(--petmatch-primary)] text-white rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Abrir Chat
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 rounded-full p-2">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-lg">Denunciar Cuidador</h3>
            </div>
            
            <p className="text-sm text-[var(--petmatch-text-muted)] mb-4">
              Sua denúncia será analisada pela equipe PetMatch. Por favor, descreva o motivo:
            </p>
            
            <textarea
              className="w-full border border-[var(--petmatch-border)] rounded-lg p-3 mb-4 h-24 resize-none"
              placeholder="Descreva o motivo da denúncia..."
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  alert('Denúncia enviada. Obrigado!');
                }}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
