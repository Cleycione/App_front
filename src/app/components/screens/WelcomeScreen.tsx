import React from 'react';
import { Heart, PawPrint } from 'lucide-react';
import { Button } from '../ui/Button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-6">
      <div className="text-center mb-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="relative">
            <PawPrint size={64} className="text-[var(--petmatch-primary)]" strokeWidth={2.5} />
            <Heart size={24} className="absolute -top-2 -right-2 text-[var(--petmatch-urgent)] fill-[var(--petmatch-urgent)]" />
          </div>
        </div>
        
        <h1 className="text-4xl mb-4 text-[var(--petmatch-text)]">
          PetMatch
        </h1>
        
        <p className="text-lg text-[var(--petmatch-text-muted)] max-w-sm mx-auto">
          Comunidade que conecta pets perdidos aos seus donos
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('login')}
        >
          Entrar
        </Button>
        
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('signup')}
        >
          Criar conta
        </Button>
        
        <button
          onClick={() => onNavigate('home')}
          className="w-full text-center py-3 text-[var(--petmatch-text-muted)] hover:text-[var(--petmatch-text)] transition-colors"
        >
          Continuar como visitante
        </button>
      </div>

      <div className="mt-12 text-center text-sm text-[var(--petmatch-text-muted)]">
        <p>Uma comunidade de amor e cuidado</p>
        <p className="flex items-center justify-center gap-2 mt-2">
          <PawPrint size={16} />
          Conectando pets aos seus tutores
          <PawPrint size={16} />
        </p>
      </div>
    </div>
  );
}