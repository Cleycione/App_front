import React from 'react';
import { CheckCircle, Share2, Edit, MapPin, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LostPetAlertScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function LostPetAlertScreen({ onBack, onNavigate }: LostPetAlertScreenProps) {
  const alertRadius = 5; // km

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--app-secondary)] to-green-600 text-white px-4 py-12 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={64} className="text-[var(--app-secondary)]" />
        </div>
        <h1 className="mb-3">Alerta enviado!</h1>
        <p className="text-white/90">
          Sua comunidade já está ajudando a procurar
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Alert Info */}
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
                Usuários em até <strong>{alertRadius} km</strong> de distância foram
                notificados sobre o seu pet perdido
              </p>
            </div>
          </div>

          <div className="bg-[var(--app-gray-50)] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--app-gray-600)]">Raio do alerta</span>
              <span className="text-[var(--app-gray-900)]">{alertRadius} km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--app-gray-600)]">Status</span>
              <span className="inline-flex items-center gap-2 text-[var(--app-secondary)]">
                <span className="w-2 h-2 bg-[var(--app-secondary)] rounded-full animate-pulse"></span>
                Ativo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--app-gray-600)]">Visibilidade</span>
              <span className="text-[var(--app-gray-900)]">Público</span>
            </div>
          </div>
        </Card>

        {/* What's Next */}
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
                  Quanto mais pessoas souberem, maiores as chances de encontrar
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[var(--app-primary)]">2</span>
              </div>
              <div className="flex-1">
                <p className="text-[var(--app-gray-900)] mb-1">
                  Fique atento às notificações
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Você receberá alertas de possíveis avistamentos
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[var(--app-primary)]">3</span>
              </div>
              <div className="flex-1">
                <p className="text-[var(--app-gray-900)] mb-1">
                  Verifique o mapa regularmente
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Novos posts podem indicar a localização do seu pet
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
            onClick={() => {
              // In a real app, this would pass the post data
              onNavigate('share', { post: { id: 'new-lost-pet' } });
            }}
          >
            <Share2 size={20} />
            Compartilhar agora
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md" onClick={() => onNavigate('map')}>
              <MapPin size={18} />
              Ver no mapa
            </Button>
            <Button variant="outline" size="md" onClick={() => alert('Editar informações')}>
              <Edit size={18} />
              Editar
            </Button>
          </div>
        </div>

        {/* Info */}
        <Card className="p-4 bg-amber-50 border-amber-200">
          <p className="text-sm text-[var(--app-gray-700)]">
            <strong>Dica:</strong> Continue procurando ativamente na sua região e
            mantenha as informações atualizadas. A comunidade PetMatch está com você!
          </p>
        </Card>

        <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
          Voltar para Meus Pets
        </Button>
      </div>
    </div>
  );
}
