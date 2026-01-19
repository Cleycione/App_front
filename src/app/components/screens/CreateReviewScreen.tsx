import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { StarRating } from '../ui/StarRating';

interface CreateReviewScreenProps {
  caregiver: any;
  onBack: () => void;
}

export function CreateReviewScreen({ caregiver, onBack }: CreateReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }
    if (comment.trim().length < 10) {
      alert('Por favor, escreva um comentário mais detalhado (mínimo 10 caracteres)');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--petmatch-bg-light)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--petmatch-text)] mb-2">
            Avaliação Publicada!
          </h2>
          <p className="text-[var(--petmatch-text-muted)] mb-6">
            Obrigado por compartilhar sua experiência. Sua avaliação ajuda outros tutores a escolher cuidadores de confiança.
          </p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-[var(--petmatch-primary)] text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--petmatch-bg-light)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--petmatch-border)] sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-[var(--petmatch-text)]">
            Avaliar Cuidador
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Caregiver Info */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={caregiver.photo} 
              alt={caregiver.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-[var(--petmatch-text)]">
                {caregiver.name}
              </h2>
              <p className="text-sm text-[var(--petmatch-text-muted)]">
                {caregiver.location}
              </p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6">
            <label className="block text-center mb-4">
              <span className="block font-semibold text-[var(--petmatch-text)] mb-3">
                Como foi sua experiência?
              </span>
              <div className="flex justify-center">
                <StarRating
                  rating={rating}
                  size={40}
                  interactive
                  onChange={setRating}
                />
              </div>
              {rating > 0 && (
                <p className="text-sm text-[var(--petmatch-text-muted)] mt-2">
                  {rating === 5 && 'Excelente! 🎉'}
                  {rating === 4 && 'Muito bom! 👍'}
                  {rating === 3 && 'Bom 👌'}
                  {rating === 2 && 'Regular 😐'}
                  {rating === 1 && 'Ruim 😞'}
                </p>
              )}
            </label>
          </div>

          <div className="bg-white rounded-xl p-4">
            <label className="block">
              <span className="block font-semibold text-[var(--petmatch-text)] mb-3">
                Conte sobre sua experiência
              </span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Como o cuidador tratou seu pet? O ambiente era seguro e limpo? Você recomendaria este cuidador?"
                className="w-full px-4 py-3 border border-[var(--petmatch-border)] rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
              <p className="text-xs text-[var(--petmatch-text-muted)] mt-2">
                Mínimo 10 caracteres • {comment.length} caracteres
              </p>
            </label>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Dica:</strong> Avaliações honestas e detalhadas ajudam outros tutores a tomar melhores decisões e incentivam cuidadores a manter um serviço de qualidade.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[var(--petmatch-primary)] text-white rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={rating === 0 || comment.trim().length < 10}
          >
            Publicar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
}
