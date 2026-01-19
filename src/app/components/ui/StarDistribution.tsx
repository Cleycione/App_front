import React from 'react';
import { Star } from 'lucide-react';

interface StarDistributionProps {
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
}

export function StarDistribution({ distribution, totalReviews }: StarDistributionProps) {
  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = distribution[stars as keyof typeof distribution];
        const percentage = getPercentage(count);
        
        return (
          <div key={stars} className="flex items-center gap-2">
            <div className="flex items-center gap-1 min-w-[60px]">
              <span className="text-sm font-medium text-[var(--petmatch-text)]">{stars}</span>
              <Star size={14} className="text-yellow-400" fill="currentColor" />
            </div>
            
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <span className="text-xs text-[var(--petmatch-text-muted)] min-w-[40px] text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
