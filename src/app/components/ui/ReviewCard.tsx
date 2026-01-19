import React from 'react';
import { StarRating } from './StarRating';

interface Review {
  id: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewCardProps {
  review: Review;
  onReport?: () => void;
}

export function ReviewCard({ review, onReport }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
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
      <p className="text-sm text-[var(--petmatch-text-muted)] mb-2">
        {review.comment}
      </p>
      {onReport && (
        <button 
          onClick={onReport}
          className="text-xs text-red-500 hover:underline"
        >
          Denunciar avaliação
        </button>
      )}
    </div>
  );
}
