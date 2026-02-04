import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Heart, Pause, Play, CheckCircle, Edit, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { donationsApi } from '../../api/endpoints';
import { toUiDonation } from '../../api/mappers';
import type { DonationUi } from '../../types/ui';

interface MyDonationsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function MyDonationsScreen({ onBack, onNavigate }: MyDonationsScreenProps) {
  const [myDonations, setMyDonations] = useState<DonationUi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      setIsLoading(true);
      try {
        const response = await donationsApi.list({ page: 0, size: 50 });
        setMyDonations(response.content.map(toUiDonation));
      } catch {
        setMyDonations([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonations();
  }, []);
  const activeDonations = myDonations.filter(d => d.status === 'active');
  const pausedDonations = myDonations.filter(d => d.status === 'paused');
  const completedDonations = myDonations.filter(d => d.status === 'completed');

  const handleToggleStatus = (donationId: string, currentStatus: string) => {
    if (currentStatus === 'active') {
      if (confirm('Deseja pausar esta doação temporariamente?')) {
        alert('Doação pausada');
      }
    } else if (currentStatus === 'paused') {
      if (confirm('Deseja reativar esta doação?')) {
        alert('Doação reativada');
      }
    }
  };

  const handleComplete = (donationId: string) => {
    if (confirm('Confirma que o pet foi adotado? Esta ação não pode ser desfeita.')) {
      alert('Parabéns! Doação encerrada com sucesso! 🎉');
    }
  };

  const renderDonationCard = (donation: DonationUi) => (
    <Card key={donation.id} className="p-4">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--app-gray-100)]">
          <ImageWithFallback
            src={donation.photos[0]}
            alt={donation.petName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-[var(--app-gray-900)] truncate">
                {donation.petName}
              </h3>
              <p className="text-sm text-[var(--app-gray-600)]">
                {donation.species} • {donation.size}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                donation.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : donation.status === 'paused'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {donation.status === 'active' ? 'Ativa' : donation.status === 'paused' ? 'Pausada' : 'Encerrada'}
            </span>
          </div>

          <p className="text-xs text-[var(--app-gray-500)] mb-3">
            Publicado em {new Date(donation.publishedDate).toLocaleDateString('pt-BR')}
          </p>

          <div className="flex flex-wrap gap-2">
            {donation.status !== 'completed' && (
              <>
                <button
                  onClick={() => alert('Editar doação')}
                  className="text-xs px-3 py-1.5 bg-[var(--app-gray-100)] text-[var(--app-gray-700)] rounded-lg hover:bg-[var(--app-gray-200)] transition-colors flex items-center gap-1"
                >
                  <Edit size={12} />
                  Editar
                </button>
                <button
                  onClick={() => handleToggleStatus(donation.id, donation.status)}
                  className="text-xs px-3 py-1.5 bg-[var(--app-gray-100)] text-[var(--app-gray-700)] rounded-lg hover:bg-[var(--app-gray-200)] transition-colors flex items-center gap-1"
                >
                  {donation.status === 'active' ? (
                    <>
                      <Pause size={12} />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play size={12} />
                      Reativar
                    </>
                  )}
                </button>
                {donation.status === 'active' && (
                  <button
                    onClick={() => handleComplete(donation.id)}
                    className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle size={12} />
                    Adotado
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white px-4 py-6">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mb-6">Minhas Doações</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{activeDonations.length}</p>
            <p className="text-sm text-white/90">Ativas</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{pausedDonations.length}</p>
            <p className="text-sm text-white/90">Pausadas</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{completedDonations.length}</p>
            <p className="text-sm text-white/90">Encerradas</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* CTA */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('create-donation')}
        >
          <Plus size={20} />
          Cadastrar nova doação
        </Button>

        {/* Active Donations */}
        {isLoading && (
          <Card className="p-6 text-center">
            <p className="text-[var(--app-gray-500)]">Carregando doações...</p>
          </Card>
        )}
        {activeDonations.length > 0 && (
          <div>
            <h2 className="text-[var(--app-gray-900)] mb-4">
              Doações Ativas
            </h2>
            <div className="space-y-3">
              {activeDonations.map(renderDonationCard)}
            </div>
          </div>
        )}

        {/* Paused Donations */}
        {pausedDonations.length > 0 && (
          <div>
            <h2 className="text-[var(--app-gray-900)] mb-4">
              Doações Pausadas
            </h2>
            <div className="space-y-3">
              {pausedDonations.map(renderDonationCard)}
            </div>
          </div>
        )}

        {/* Completed Donations */}
        {completedDonations.length > 0 && (
          <div>
            <h2 className="text-[var(--app-gray-900)] mb-4">
              Doações Encerradas
            </h2>
            <div className="space-y-3">
              {completedDonations.map(renderDonationCard)}
            </div>
          </div>
        )}

        {/* Empty State */}
        {myDonations.length === 0 && (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={40} className="text-pink-500" />
            </div>
            <p className="text-[var(--app-gray-500)] mb-4">
              Você ainda não tem doações cadastradas
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('create-donation')}
            >
              <Plus size={20} />
              Cadastrar primeira doação
            </Button>
          </Card>
        )}

        {/* Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-[var(--app-gray-700)]">
            <strong>Dica:</strong> Mantenha suas doações atualizadas. Pause temporariamente se
            não puder responder aos interessados, e marque como encerrada quando o pet for adotado.
          </p>
        </Card>

        {/* Back to Home */}
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => onNavigate('home')}
        >
          <Home size={20} />
          Voltar para a Home
        </Button>
      </div>
    </div>
  );
}
