import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart, Home as HomeIcon } from 'lucide-react';
import { DonationCard } from '../ui/DonationCard';
import { mockDonations } from '../../data/mockDonationsData';

interface DonationListScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function DonationListScreen({ onNavigate }: DonationListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch =
      donation.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecies = selectedSpecies === 'all' || donation.species === selectedSpecies;
    const matchesSize = selectedSize === 'all' || donation.size === selectedSize;
    const matchesAge = selectedAge === 'all' || donation.ageRange === selectedAge;

    return (
      donation.status === 'active' &&
      matchesSearch &&
      matchesSpecies &&
      matchesSize &&
      matchesAge
    );
  });

  const activeFiltersCount = [selectedSpecies, selectedSize, selectedAge].filter(
    (f) => f !== 'all'
  ).length;

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart size={24} />
              </div>
              <div>
                <h1 className="mb-1">Pets para Doação</h1>
                <p className="text-white/90 text-sm">
                  {filteredDonations.length} pet{filteredDonations.length !== 1 ? 's' : ''}{' '}
                  disponível{filteredDonations.length !== 1 ? 'is' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="Voltar para Home"
            >
              <HomeIcon size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por espécie, porte, bairro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-[var(--app-gray-900)] focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Filters Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--app-gray-200)] rounded-xl hover:border-[var(--app-primary)] transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span className="text-sm font-medium">
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-1 text-[var(--app-primary)]">({activeFiltersCount})</span>
              )}
            </span>
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setSelectedSpecies('all');
                setSelectedSize('all');
                setSelectedAge('all');
              }}
              className="text-sm text-[var(--app-primary)] hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Filter Chips */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 space-y-4 border border-[var(--app-gray-200)]">
            {/* Species */}
            <div>
              <p className="text-sm text-[var(--app-gray-600)] mb-2">Espécie</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'Cachorro', 'Gato', 'Outro'].map((species) => (
                  <button
                    key={species}
                    onClick={() => setSelectedSpecies(species)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedSpecies === species
                        ? 'bg-[var(--app-primary)] text-white'
                        : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
                    }`}
                  >
                    {species === 'all' ? 'Todos' : species}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-sm text-[var(--app-gray-600)] mb-2">Porte</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'Pequeno', 'Médio', 'Grande'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedSize === size
                        ? 'bg-[var(--app-primary)] text-white'
                        : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
                    }`}
                  >
                    {size === 'all' ? 'Todos' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <p className="text-sm text-[var(--app-gray-600)] mb-2">Idade</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'Filhote', 'Adulto', 'Idoso'].map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedAge === age
                        ? 'bg-[var(--app-primary)] text-white'
                        : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
                    }`}
                  >
                    {age === 'all' ? 'Todos' : age}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Donations List */}
        <div className="space-y-4">
          {filteredDonations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={40} className="text-pink-500" />
              </div>
              <p className="text-[var(--app-gray-500)] mb-2">
                Nenhum pet para doação na sua região
              </p>
              <p className="text-sm text-[var(--app-gray-400)]">
                {activeFiltersCount > 0
                  ? 'Tente ajustar os filtros'
                  : 'Novos pets aparecerão aqui em breve'}
              </p>
            </div>
          ) : (
            filteredDonations.map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                onClick={() => onNavigate('donation-details', { donation })}
                showNewBadge
              />
            ))
          )}
        </div>

        {/* Info Card */}
        {filteredDonations.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-[var(--app-gray-700)]">
              <strong>Dica:</strong> Converse com o doador antes de adotar. Certifique-se de que
              você pode oferecer um lar adequado e permanente ao pet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}