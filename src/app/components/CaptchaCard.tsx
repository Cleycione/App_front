import React, { useState } from 'react';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface CaptchaCardProps {
  onVerify: (verified: boolean) => void;
  error?: boolean;
}

export function CaptchaCard({ onVerify, error }: CaptchaCardProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (isVerified) return;
    
    setIsVerifying(true);
    // Simular verificação de CAPTCHA
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      onVerify(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsVerified(false);
    onVerify(false);
  };

  return (
    <div className="space-y-2">
      <div
        className={`border-2 rounded-lg p-4 transition-all ${
          error
            ? 'border-[var(--app-urgent)] bg-red-50'
            : isVerified
            ? 'border-[var(--app-success)] bg-green-50'
            : 'border-[var(--app-gray-300)] bg-white hover:border-[var(--app-primary)]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={handleVerify}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                isVerified
                  ? 'bg-[var(--app-success)] border-[var(--app-success)]'
                  : 'border-[var(--app-gray-400)] hover:border-[var(--app-primary)]'
              }`}
            >
              {isVerifying ? (
                <RefreshCw size={14} className="text-[var(--app-primary)] animate-spin" />
              ) : isVerified ? (
                <CheckCircle size={14} className="text-white" />
              ) : null}
            </div>
            <span className="text-sm text-[var(--app-gray-900)]">
              Não sou um robô
            </span>
          </div>
          
          {isVerified && (
            <button
              onClick={handleReset}
              className="text-xs text-[var(--app-primary)] hover:text-[var(--app-primary-dark)] flex items-center gap-1"
            >
              <RefreshCw size={12} />
              Verificar novamente
            </button>
          )}
        </div>
        
        {isVerified && (
          <div className="mt-2 flex items-center gap-2">
            <CheckCircle size={16} className="text-[var(--app-success)]" />
            <span className="text-xs text-[var(--app-success)]">
              Verificado com sucesso
            </span>
          </div>
        )}
      </div>
      
      {error && !isVerified && (
        <div className="flex items-center gap-2 text-[var(--app-urgent)]">
          <AlertCircle size={16} />
          <span className="text-sm">
            Falha na verificação, tente novamente
          </span>
        </div>
      )}
    </div>
  );
}
