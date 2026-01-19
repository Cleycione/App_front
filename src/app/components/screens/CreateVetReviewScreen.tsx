import React, { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { StarRating } from '../ui/StarRating';

interface CreateVetReviewScreenProps {
  vet: any;
  onBack: () => void;
}

export function CreateVetReviewScreen({ vet, onBack }: CreateVetReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Por favor, selecione uma classificação');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[var(--app-bg-light)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={40} className="text-green-600" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--petmatch-text)] mb-2">
            Avaliação enviada!
          </h2>
          <p className="text-[var(--petmatch-text-muted)]">
            Obrigado por compartilhar sua experiência com a comunidade.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[var(--petmatch-text)]" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-[var(--petmatch-text)]">
                Avaliar
              </h1>
              <p className="text-sm text-[var(--petmatch-text-muted)]">
                {vet.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-8 space-y-8">
        {/* Rating */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--petmatch-text)] mb-2 text-center">
            Como foi sua experiência?
          </h2>
          <p className="text-sm text-[var(--petmatch-text-muted)] mb-6 text-center">
            Sua avaliação ajuda outros tutores
          </p>

          <div className="flex justify-center mb-2">
            <StarRating
              rating={rating}
              size={48}
              interactive
              onChange={setRating}
            />
          </div>

          {rating > 0 && (
            <p className="text-center font-medium text-[var(--petmatch-text)]">
              {rating === 5 && '⭐ Excelente!'}
              {rating === 4 && '😊 Muito bom'}
              {rating === 3 && '😐 Bom'}
              {rating === 2 && '😕 Regular'}
              {rating === 1 && '😞 Ruim'}
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
            Conte sobre sua experiência (opcional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Como foi o atendimento? O que mais gostou?"
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)] resize-none"
          />
          <p className="text-xs text-[var(--petmatch-text-muted)] mt-2">
            Compartilhe detalhes para ajudar outros tutores a tomarem melhores decisões
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-[var(--petmatch-text)] mb-2 text-sm">
            📝 Dicas para sua avaliação
          </h3>
          <ul className="text-xs text-[var(--petmatch-text-muted)] space-y-1">
            <li>• Seja honesto e construtivo</li>
            <li>• Descreva o atendimento recebido</li>
            <li>• Mencione pontos positivos e a melhorar</li>
            <li>• Evite informações pessoais sensíveis</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rating === 0}
          className="w-full py-4 bg-[var(--petmatch-primary)] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Enviar avaliação
        </button>
      </form>
    </div>
  );
}
