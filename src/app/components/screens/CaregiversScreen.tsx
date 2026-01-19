import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, UserPlus } from 'lucide-react';
import { CaregiverCard, Caregiver } from '../CaregiverCard';
import { mockCaregiversData } from '../../data/mockCaregiversData';

interface CaregiversScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function CaregiversScreen({ onNavigate }: CaregiversScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const filters = [
    '1km', '5km', '10km', '20km',
    'Aceita emergências',
    'Tem quintal',
    'Apartamento',
    'Casa',
    '24h',
    '4+ estrelas'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredCaregiversData = mockCaregiversData.filter(caregiver => {
    // Search filter
    if (searchQuery && !caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !caregiver.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Rating filter
    if (selectedFilters.includes('4+ estrelas') && caregiver.rating < 4) {
      return false;
    }
    
    // Emergency filter
    if (selectedFilters.includes('Aceita emergências') && !caregiver.acceptsEmergency) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--petmatch-bg-light)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[var(--petmatch-border)] sticky top-0 z-10">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-[var(--petmatch-text)] mb-4">
            Cuidadores
          </h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por bairro, cidade, nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[var(--petmatch-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter size={18} className="text-gray-500 flex-shrink-0" />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedFilters.includes(filter)
                    ? 'bg-[var(--petmatch-primary)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* CTA to become caregiver */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-lg p-2">
              <UserPlus size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Seja um Cuidador PetMatch</h3>
              <p className="text-sm text-blue-50 mb-3">
                Ajude pets que precisam de um lar temporário e ganhe renda extra
              </p>
              <button
                onClick={() => onNavigate('caregiver-signup')}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition"
              >
                Quero me cadastrar
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--petmatch-text-muted)]">
            {filteredCaregiversData.length} cuidadores encontrados
          </p>
        </div>

        {/* Caregivers list */}
        {filteredCaregiversData.length > 0 ? (
          filteredCaregiversData.map(caregiver => (
            <CaregiverCard
              key={caregiver.id}
              caregiver={caregiver}
              onViewProfile={() => onNavigate('caregiver-profile', { caregiver })}
              onOpenChat={() => onNavigate('chat', { caregiver })}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-[var(--petmatch-text)] mb-2">
              Nenhum cuidador encontrado
            </h3>
            <p className="text-sm text-[var(--petmatch-text-muted)]">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
