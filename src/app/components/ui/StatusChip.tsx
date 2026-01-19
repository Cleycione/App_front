import React from 'react';
import { useHighContrastStyles } from '@/app/hooks/useHighContrastStyles';

interface StatusChipProps {
  status: 'lost' | 'found' | 'care' | 'resolved' | 'urgent';
  className?: string;
}

export function StatusChip({ status, className = '' }: StatusChipProps) {
  const { highContrast, chipClass } = useHighContrastStyles();

  const statusConfig = {
    lost: {
      label: 'Perdido',
      className: 'status-lost',
      baseColor: 'blue',
    },
    found: {
      label: 'Encontrado',
      className: 'status-found',
      baseColor: 'green',
    },
    care: {
      label: 'Sob Cuidado',
      className: 'status-care',
      baseColor: 'orange',
    },
    resolved: {
      label: 'Resolvido',
      className: 'status-resolved',
      baseColor: 'gray',
    },
    urgent: {
      label: 'Urgente',
      className: 'status-urgent',
      baseColor: 'orange',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.className} ${chipClass(config.baseColor)} ${className}`}
    >
      {config.label}
    </span>
  );
}