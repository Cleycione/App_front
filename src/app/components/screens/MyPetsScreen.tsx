import React from 'react';
import { ArrowLeft, Plus, AlertTriangle, History, PawPrint } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PetCard } from '../ui/PetCard';

interface MyPetsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

const mockPets = [
  {
    id: '1',
    name: 'Thor',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    color: 'Dourado',
    size: 'Grande',
    photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Gata',
    breed: 'Siamês',
    color: 'Branco e marrom',
    size: 'Médio',
    photo: 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5d0?w=400',
  },
  {
    id: '3',
    name: 'Max',
    species: 'Cachorro',
    breed: 'Vira-lata',
    color: 'Preto e branco',
    size: 'Médio',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    isLost: true,
    lostDate: '10/01/2026',
    lastSeenLocation: 'Rua das Flores, Jardim Paulista',
  },
];

export function MyPetsScreen({ onBack, onNavigate }: MyPetsScreenProps) {
  const activePets = mockPets.filter(p => !p.isLost);
  const lostPets = mockPets.filter(p => p.isLost);

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white px-4 py-6">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mb-6">Meus Pets</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{activePets.length}</p>
            <p className="text-sm text-white/90">Cadastrados</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{lostPets.length}</p>
            <p className="text-sm text-white/90">Perdidos</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('pet-registration')}
          >
            <Plus size={18} />
            Cadastrar pet
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => onNavigate('report-lost-pet')}
          >
            <AlertTriangle size={18} />
            Perdi meu pet
          </Button>
        </div>

        {/* Lost Pets Alert */}
        {lostPets.length > 0 && (
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex gap-3">
              <AlertTriangle size={24} className="text-[var(--app-warning)] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-[var(--app-warning)] mb-2">
                  {lostPets.length} pet{lostPets.length > 1 ? 's' : ''} perdido{lostPets.length > 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-[var(--app-gray-700)]">
                  Continue divulgando e verificando o mapa para possíveis matches.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Lost Pets */}
        {lostPets.length > 0 && (
          <div>
            <h2 className="text-[var(--app-gray-900)] mb-4">
              Pets Perdidos
            </h2>
            <div className="space-y-3">
              {lostPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onClick={() => alert('Ver detalhes do caso')}
                  onOptionsClick={() => {
                    const action = confirm(
                      'Escolha uma ação:\n\nOK - Marcar como encontrado\nCancelar - Ver histórico'
                    );
                    if (action) {
                      alert('Pet marcado como encontrado!');
                    } else {
                      alert('Exibindo histórico do caso...');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Active Pets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[var(--app-gray-900)]">
              Meus Pets Cadastrados
            </h2>
            <span className="text-sm text-[var(--app-gray-500)]">
              {activePets.length} total
            </span>
          </div>

          {activePets.length === 0 ? (
            <Card className="p-8 text-center">
              <PawPrint size={48} className="text-[var(--app-gray-300)] mx-auto mb-4" />
              <p className="text-[var(--app-gray-500)] mb-4">
                Você ainda não tem pets cadastrados
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('pet-registration')}
              >
                <Plus size={20} />
                Cadastrar meu primeiro pet
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {activePets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onClick={() => onNavigate('pet-detail', { pet })}
                  onOptionsClick={() => {
                    const options = [
                      'Editar informações',
                      'Carteira de Saúde',
                      'Marcar como perdido',
                      'Ver histórico',
                      'Excluir',
                    ];
                    alert(`Opções do pet:\n\n${options.join('\n')}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* History Button */}
        <Button variant="outline" size="lg" fullWidth onClick={() => alert('Exibindo histórico completo')}>
          <History size={20} />
          Ver histórico completo
        </Button>

        {/* Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-[var(--app-gray-700)]">
            <strong>Dica:</strong> Mantenha as informações dos seus pets sempre atualizadas.
            Isso facilita a identificação caso eles se percam.
          </p>
        </Card>
      </div>
    </div>
  );
}