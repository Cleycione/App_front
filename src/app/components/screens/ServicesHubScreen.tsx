import React, { useState } from 'react';
import { Heart, Stethoscope, Store, ArrowLeft } from 'lucide-react';

interface ServicesHubScreenProps {
  onNavigate: (screen: string) => void;
}

export function ServicesHubScreen({ onNavigate }: ServicesHubScreenProps) {
  const [activeTab, setActiveTab] = useState<'caregivers' | 'vets' | 'partners'>('caregivers');

  const handleTabSelect = (tab: 'caregivers' | 'vets' | 'partners') => {
    setActiveTab(tab);
    
    // Navigate to the appropriate screen
    if (tab === 'caregivers') {
      onNavigate('caregivers');
    } else if (tab === 'vets') {
      onNavigate('vets');
    } else if (tab === 'partners') {
      onNavigate('partners');
    }
  };

  const services = [
    {
      id: 'caregivers' as const,
      icon: Heart,
      title: 'Cuidadores',
      description: 'Encontre cuidadores de pets confiáveis e avaliados pela comunidade',
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
      buttonColor: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      id: 'vets' as const,
      icon: Stethoscope,
      title: 'Vet & Clínicas',
      description: 'Veterinários e clínicas especializadas com atendimento emergencial',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'partners' as const,
      icon: Store,
      title: 'Parceiros',
      description: 'Pet shops, agropecuárias, distribuidores e serviços para pets',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-semibold text-[var(--petmatch-text)]">
              Serviços
            </h1>
          </div>
          <p className="text-sm text-[var(--petmatch-text-muted)]">
            Conecte-se com profissionais e estabelecimentos da comunidade PetMatch
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="px-4 py-6 space-y-4">
        {services.map((service) => {
          const Icon = service.icon;
          
          return (
            <div
              key={service.id}
              className={`border-2 rounded-2xl p-6 ${service.color}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 bg-white rounded-xl ${service.iconColor}`}>
                  <Icon size={28} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[var(--petmatch-text)] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[var(--petmatch-text-muted)]">
                    {service.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleTabSelect(service.id)}
                className={`w-full py-3 text-white font-medium rounded-xl transition-colors ${service.buttonColor}`}
              >
                Explorar {service.title}
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="px-4 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-[var(--petmatch-text)] mb-2">
            💡 Sobre os Serviços
          </h3>
          <ul className="text-sm text-[var(--petmatch-text-muted)] space-y-1">
            <li>• Todos os profissionais são avaliados pela comunidade</li>
            <li>• Filtre por localização, especialidade e disponibilidade</li>
            <li>• Entre em contato diretamente pelo app</li>
            <li>• Compartilhe suas experiências através de avaliações</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
