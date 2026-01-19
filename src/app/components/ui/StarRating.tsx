import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 20, 
  interactive = false,
  onChange 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const fillPercentage = interactive 
          ? (hoverRating || rating) >= starValue ? 100 : 0
          : rating >= starValue 
            ? 100 
            : rating > index && rating < starValue 
              ? (rating - index) * 100 
              : 0;
        
        return (
          <div
            key={index}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          >
            <div className="relative" style={{ width: size, height: size }}>
              <Star 
                size={size} 
                className="text-gray-300" 
                fill="currentColor"
              />
              <div 
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star 
                  size={size} 
                  className="text-yellow-400" 
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
