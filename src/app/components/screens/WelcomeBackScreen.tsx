import React from 'react';
import { CheckCircle, LogOut } from 'lucide-react';

interface WelcomeBackScreenProps {
  onNavigate: (screen: string) => void;
}

export function WelcomeBackScreen({ onNavigate }: WelcomeBackScreenProps) {
  const handleContinue = () => {
    onNavigate('home');
  };

  const handleSwitchAccount = () => {
    // Limpar dispositivo confiável e ir para login
    localStorage.removeItem('petmatch_trusted_device');
    onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card Principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Ícone de verificação */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--app-success)] to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>

          {/* Título */}
          <div className="text-center space-y-2">
            <h1 className="text-[var(--app-gray-900)]">
              Bem-vindo de volta!
            </h1>
            <p className="text-lg text-[var(--app-gray-700)]">
              Olá, <span className="font-semibold text-[var(--app-primary)]">Cleycione</span>
            </p>
          </div>

          {/* Avatar do usuário */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              C
            </div>
          </div>

          {/* Mensagem de dispositivo confiável */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-center text-[var(--app-gray-700)]">
              Este dispositivo é confiável. Para sua segurança, você pode sair a qualquer momento nas configurações.
            </p>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full bg-[var(--app-primary)] text-white py-4 rounded-xl font-semibold hover:bg-[var(--app-primary-dark)] transition-all shadow-lg active:scale-95"
            >
              Continuar
            </button>

            <button
              onClick={handleSwitchAccount}
              className="w-full bg-[var(--app-gray-100)] text-[var(--app-gray-700)] py-4 rounded-xl font-semibold hover:bg-[var(--app-gray-200)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Trocar conta
            </button>
          </div>

          {/* Informação adicional */}
          <div className="text-center">
            <p className="text-xs text-[var(--app-gray-500)]">
              Não está em um dispositivo público?
            </p>
          </div>
        </div>

        {/* Link para voltar ao login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('login')}
            className="text-white/90 hover:text-white text-sm underline"
          >
            Fazer login com outra conta
          </button>
        </div>
      </div>
    </div>
  );
}
