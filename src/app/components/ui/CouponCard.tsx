import React from 'react';
import { QrCode, Calendar, Store } from 'lucide-react';
import { Card } from './Card';

interface CouponCardProps {
  code: string;
  partnerName: string;
  discount: string;
  validUntil: string;
  onUse?: () => void;
}

export function CouponCard({ code, partnerName, discount, validUntil, onUse }: CouponCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-dashed border-[var(--app-primary)]">
      <div className="bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white p-6 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-4">
          <QrCode size={64} className="text-[var(--app-primary)]" />
        </div>
        <p className="text-3xl mb-2">{discount}</p>
        <p className="text-white/90">de desconto</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Store size={20} className="text-[var(--app-gray-500)] flex-shrink-0" />
          <div>
            <p className="text-sm text-[var(--app-gray-500)]">Válido em</p>
            <p className="text-[var(--app-gray-900)]">{partnerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={20} className="text-[var(--app-gray-500)] flex-shrink-0" />
          <div>
            <p className="text-sm text-[var(--app-gray-500)]">Válido até</p>
            <p className="text-[var(--app-gray-900)]">{validUntil}</p>
          </div>
        </div>

        <div className="bg-[var(--app-gray-100)] rounded-xl p-4 text-center">
          <p className="text-xs text-[var(--app-gray-500)] mb-2">Código do cupom</p>
          <p className="text-2xl font-mono tracking-wider text-[var(--app-primary)]">{code}</p>
        </div>

        <p className="text-xs text-center text-[var(--app-gray-500)]">
          Apresente este cupom na loja parceira ou use o código no checkout online
        </p>

        {onUse && (
          <button
            onClick={onUse}
            className="w-full bg-[var(--app-secondary)] text-white py-3 rounded-xl hover:bg-[var(--app-secondary-dark)] transition-colors"
          >
            Marcar como usado
          </button>
        )}
      </div>
    </Card>
  );
}
