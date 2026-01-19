import React, { useState } from 'react';
import { ArrowLeft, Edit, AlertTriangle, History, Heart, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PetDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  pet: {
    id: string;
    name: string;
    species: string;
    breed: string;
    color: string;
    size: string;
    sex?: string;
    age?: string;
    photo?: string;
    isLost?: boolean;
  };
}

type TabType = 'dados' | 'carteira' | 'historico';

export function PetDetailScreen({ onBack, onNavigate, pet }: PetDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dados');

  const tabs = [
    { id: 'dados' as TabType, label: 'Dados', icon: FileText },
    { id: 'carteira' as TabType, label: 'Carteira de Saúde', icon: Heart },
    { id: 'historico' as TabType, label: 'Histórico', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white px-4 pt-6 pb-20">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-4 border-white/30">
            {pet.photo ? (
              <ImageWithFallback
                src={pet.photo}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl">
                🐾
              </div>
            )}
          </div>
          <h1 className="mb-1">{pet.name}</h1>
          <p className="text-white/90">
            {pet.species} • {pet.breed}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-14 mb-6">
        <Card className="p-1 bg-white shadow-lg">
          <div className="grid grid-cols-3 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[var(--app-primary)] text-white shadow-md'
                      : 'text-[var(--app-gray-600)] hover:bg-[var(--app-gray-50)]'
                  }`}
                >
                  <Icon size={20} className="mx-auto mb-1" />
                  <p className="text-xs font-medium">{tab.label}</p>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tab Content */}
      <div className="px-4 space-y-4">
        {activeTab === 'dados' && (
          <DadosTab pet={pet} onNavigate={onNavigate} />
        )}
        {activeTab === 'carteira' && (
          <CarteiraTab pet={pet} onNavigate={onNavigate} />
        )}
        {activeTab === 'historico' && (
          <HistoricoTab pet={pet} />
        )}
      </div>
    </div>
  );
}

function DadosTab({ pet, onNavigate }: { pet: any; onNavigate: (screen: string, data?: any) => void }) {
  return (
    <>
      <Card className="p-4">
        <h3 className="text-[var(--app-gray-900)] mb-4">Informações Básicas</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[var(--app-gray-600)]">Nome:</span>
            <span className="text-[var(--app-gray-900)] font-medium">{pet.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--app-gray-600)]">Espécie:</span>
            <span className="text-[var(--app-gray-900)] font-medium">{pet.species}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--app-gray-600)]">Raça:</span>
            <span className="text-[var(--app-gray-900)] font-medium">{pet.breed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--app-gray-600)]">Cor:</span>
            <span className="text-[var(--app-gray-900)] font-medium">{pet.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--app-gray-600)]">Porte:</span>
            <span className="text-[var(--app-gray-900)] font-medium">{pet.size}</span>
          </div>
          {pet.sex && (
            <div className="flex justify-between">
              <span className="text-[var(--app-gray-600)]">Sexo:</span>
              <span className="text-[var(--app-gray-900)] font-medium">{pet.sex}</span>
            </div>
          )}
          {pet.age && (
            <div className="flex justify-between">
              <span className="text-[var(--app-gray-600)]">Idade:</span>
              <span className="text-[var(--app-gray-900)] font-medium">{pet.age}</span>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('pet-health-card', { pet })}
        >
          <Heart size={20} />
          Acessar Carteira de Saúde
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => onNavigate('edit-pet', { pet })}
        >
          <Edit size={20} />
          Editar Informações
        </Button>

        {!pet.isLost && (
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={() => onNavigate('report-lost-pet', { pet })}
          >
            <AlertTriangle size={20} />
            Marcar como Perdido
          </Button>
        )}
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-[var(--app-gray-700)]">
          <strong>Dica:</strong> Mantenha a Carteira de Saúde sempre atualizada com as vacinas e informações médicas do seu pet.
        </p>
      </Card>
    </>
  );
}

function CarteiraTab({ pet, onNavigate }: { pet: any; onNavigate: (screen: string, data?: any) => void }) {
  return (
    <>
      <Card className="p-6 text-center">
        <Heart size={48} className="text-[var(--app-primary)] mx-auto mb-4" />
        <h3 className="text-[var(--app-gray-900)] mb-2">Carteira de Saúde</h3>
        <p className="text-[var(--app-gray-600)] mb-6">
          Registre e acompanhe todas as informações de saúde de {pet.name}
        </p>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNavigate('pet-health-card', { pet })}
        >
          <FileText size={20} />
          Abrir Carteira de Saúde
        </Button>
      </Card>

      <Card className="p-4 bg-green-50 border-green-200">
        <p className="text-sm text-[var(--app-gray-700)]">
          <strong>Importante:</strong> A Carteira de Saúde contém informações privadas e não são compartilhadas publicamente.
        </p>
      </Card>
    </>
  );
}

function HistoricoTab({ pet }: { pet: any }) {
  return (
    <Card className="p-6 text-center">
      <History size={48} className="text-[var(--app-gray-400)] mx-auto mb-4" />
      <h3 className="text-[var(--app-gray-900)] mb-2">Histórico</h3>
      <p className="text-[var(--app-gray-600)]">
        Nenhum registro de atividade para {pet.name}
      </p>
    </Card>
  );
}
