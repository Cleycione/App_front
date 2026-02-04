import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowLeft, MapPin, Star, Phone, Clock, AlertCircle, PlusCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { vetsApi } from '../../api/endpoints';
import { toUiVet } from '../../api/mappers';

interface VetsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function VetsScreen({ onNavigate }: VetsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    emergency24h: false,
    emergencyAccepted: false,
    minRating: 0,
    type: 'all' as 'all' | 'vet' | 'clinic'
  });
  const [vets, setVets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVets = async () => {
      setIsLoading(true);
      try {
        const response = await vetsApi.list({
          page: 0,
          size: 50,
          lat: -23.5615,
          lng: -46.6559,
          radiusKm: 20,
        });
        setVets(response.content.map(toUiVet));
      } catch {
        setVets([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVets();
  }, []);

  const filteredVets = useMemo(() => {
    return vets.filter(vet => {
      if (searchQuery && !vet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !vet.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.emergency24h && !vet.emergency24h) return false;
      if (filters.emergencyAccepted && !vet.acceptsEmergency) return false;
      if (filters.minRating && vet.rating < filters.minRating) return false;
      if (filters.type !== 'all') {
        if (filters.type === 'vet' && vet.type !== 'Veterinário') return false;
        if (filters.type === 'clinic' && vet.type !== 'Clínica') return false;
      }
      return true;
    });
  }, [vets, searchQuery, filters]);

  const toggleFilter = (filterName: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => onNavigate('services-hub')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[var(--petmatch-text)]" />
            </button>
            <h1 className="text-2xl font-semibold text-[var(--petmatch-text)]">
              Vet & Clínicas
            </h1>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por bairro, especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 text-[var(--petmatch-text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => toggleFilter('emergency24h')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.emergency24h
                  ? 'bg-[var(--petmatch-primary)] text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              24h
            </button>
            <button
              onClick={() => toggleFilter('emergencyAccepted')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.emergencyAccepted
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Emergências
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === 4 ? 0 : 4 }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.minRating === 4
                  ? 'bg-yellow-400 text-[var(--petmatch-text)]'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              4+ ⭐
            </button>
            <button
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                type: prev.type === 'vet' ? 'all' : 'vet' 
              }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.type === 'vet'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Veterinário
            </button>
            <button
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                type: prev.type === 'clinic' ? 'all' : 'clinic' 
              }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.type === 'clinic'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Clínica
            </button>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-4 py-4 space-y-2">
        <button
          onClick={() => onNavigate('vet-signup')}
          className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
        >
          <PlusCircle size={20} />
          Cadastrar como Veterinário
        </button>
        <button
          onClick={() => onNavigate('clinic-signup')}
          className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
        >
          <PlusCircle size={20} />
          Cadastrar Clínica Veterinária
        </button>
      </div>

      {/* Results */}
      <div className="px-4 pb-6">
        <p className="text-sm text-[var(--petmatch-text-muted)] mb-4">
          {filteredVets.length} resultado(s) encontrado(s)
        </p>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-sm text-[var(--petmatch-text-muted)]">Carregando veterinários...</p>
            </div>
          ) : filteredVets.map(vet => (
            <div
              key={vet.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('vet-profile', { vet })}
            >
              <div className="flex gap-3 p-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <ImageWithFallback
                    src={vet.photo}
                    alt={vet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--petmatch-text)] line-clamp-1">
                      {vet.name}
                    </h3>
                    {vet.emergency24h && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
                        24h
                      </span>
                    )}
                  </div>

                  <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full mb-2">
                    {vet.type}
                  </span>

                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="text-sm font-semibold text-[var(--petmatch-text)]">
                      {vet.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-[var(--petmatch-text-muted)]">
                      ({vet.reviewCount} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[var(--petmatch-text-muted)] mb-1">
                    <MapPin size={12} />
                    <span>{vet.location} • {vet.distance}</span>
                  </div>

                  {vet.acceptsEmergency && (
                    <div className="flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={12} />
                      <span>Atende emergências</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Specialties */}
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-1">
                  {vet.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-[var(--petmatch-text-muted)] text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
