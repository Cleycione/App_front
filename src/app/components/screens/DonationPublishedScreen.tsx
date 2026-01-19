import React from 'react';
import { CheckCircle, Share2, Eye, Bell, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DonationPublishedScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function DonationPublishedScreen({ onBack, onNavigate }: DonationPublishedScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--app-secondary)] to-green-600 text-white px-4 py-12 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={64} className="text-[var(--app-secondary)]" />
        </div>
        <h1 className="mb-3">Doação publicada!</h1>
        <p className="text-white/90">
          Seu pet já está visível para adotantes
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Success Info */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell size={24} className="text-[var(--app-primary)]" />
            </div>
            <div className="flex-1">
              <h2 className="text-[var(--app-gray-900)] mb-2">
                Notificações enviadas
              </h2>
              <p className="text-sm text-[var(--app-gray-600)]">
                Usuários interessados em doação foram notificados sobre seu pet
              </p>
            </div>
          </div>

          <div className="bg-[var(--app-gray-50)] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--app-gray-600)]">Status</span>
              <span className="inline-flex items-center gap-2 text-[var(--app-secondary)]">
                <span className="w-2 h-2 bg-[var(--app-secondary)] rounded-full animate-pulse"></span>
                Ativa
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--app-gray-600)]">Visibilidade</span>
              <span className="text-[var(--app-gray-900)]">Pública</span>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6">
          <h2 className="text-[var(--app-gray-900)] mb-4">
            Próximos passos
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[var(--app-primary)]">1</span>
              </div>
              <div className="flex-1">
                <p className="text-[var(--app-gray-900)] mb-1">
                  Compartilhe nas redes sociais
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Ajude a encontrar um lar para o pet mais rapidamente
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[var(--app-primary)]">2</span>
              </div>
              <div className="flex-1">
                <p className="text-[var(--app-gray-900)] mb-1">
                  Responda aos interessados
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Você receberá mensagens de pessoas interessadas
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[var(--app-primary)]">3</span>
              </div>
              <div className="flex-1">
                <p className="text-[var(--app-gray-900)] mb-1">
                  Converse com os candidatos
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Certifique-se de que o adotante pode cuidar do pet
                </p>
              </div>
            </li>
          </ul>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => alert('Compartilhando...')}
          >
            <Share2 size={20} />
            Compartilhar agora
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md" onClick={() => onNavigate('donation-list')}>
              <Eye size={18} />
              Ver na lista
            </Button>
            <Button variant="outline" size="md" onClick={() => onNavigate('my-donations')}>
              Minhas doações
            </Button>
          </div>
        </div>

        {/* Info */}
        <Card className="p-4 bg-amber-50 border-amber-200">
          <p className="text-sm text-[var(--app-gray-700)]">
            <strong>Lembre-se:</strong> Você é responsável pela doação até encontrar um lar
            adequado. Avalie cuidadosamente os candidatos antes de decidir.
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" onClick={onBack}>
            Voltar ao perfil
          </Button>
          <Button variant="secondary" size="lg" onClick={() => onNavigate('home')}>
            <Home size={20} />
            Ir para Home
          </Button>
        </div>
      </div>
    </div>
  );
}