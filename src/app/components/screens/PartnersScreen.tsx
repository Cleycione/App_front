import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowLeft, MapPin, Star, Truck, PlusCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { partnersApi } from '../../api/endpoints';
import { toUiPartner } from '../../api/mappers';

interface PartnersScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function PartnersScreen({ onNavigate }: PartnersScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all' as 'all' | 'Pet Shop' | 'Agropecuária' | 'Distribuidor de Ração' | 'Outros',
    delivery: false,
    minRating: 0
  });
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        const response = await partnersApi.list({
          page: 0,
          size: 50,
          lat: -23.5615,
          lng: -46.6559,
          radiusKm: 20,
        });
        setPartners(response.content.map(toUiPartner));
      } catch {
        setPartners([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const filteredPartners = useMemo(() => {
    return partners.filter(partner => {
      if (searchQuery && !partner.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !partner.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.category !== 'all' && partner.category !== filters.category) return false;
      if (filters.delivery && !partner.delivery) return false;
      if (filters.minRating && partner.rating < filters.minRating) return false;
      return true;
    });
  }, [partners, searchQuery, filters]);

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
              Parceiros
            </h1>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar pet shop, ração, serviços..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 text-[var(--petmatch-text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                category: prev.category === 'Pet Shop' ? 'all' : 'Pet Shop' 
              }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.category === 'Pet Shop'
                  ? 'bg-[var(--petmatch-primary)] text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Pet Shop
            </button>
            <button
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                category: prev.category === 'Agropecuária' ? 'all' : 'Agropecuária' 
              }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.category === 'Agropecuária'
                  ? 'bg-[var(--petmatch-primary)] text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Agropecuária
            </button>
            <button
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                category: prev.category === 'Distribuidor de Ração' ? 'all' : 'Distribuidor de Ração' 
              }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.category === 'Distribuidor de Ração'
                  ? 'bg-[var(--petmatch-primary)] text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Distribuidor
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, delivery: !prev.delivery }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filters.delivery
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-[var(--petmatch-text)]'
              }`}
            >
              Entrega
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
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-4 py-4">
        <button
          onClick={() => onNavigate('partner-signup')}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Cadastrar seu Negócio
        </button>
      </div>

      {/* Results */}
      <div className="px-4 pb-6">
        <p className="text-sm text-[var(--petmatch-text-muted)] mb-4">
          {filteredPartners.length} resultado(s) encontrado(s)
        </p>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-sm text-[var(--petmatch-text-muted)]">Carregando parceiros...</p>
            </div>
          ) : filteredPartners.map(partner => (
            <div
              key={partner.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('partner-profile', { partner })}
            >
              <div className="flex gap-3 p-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <ImageWithFallback
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--petmatch-text)] line-clamp-1">
                      {partner.name}
                    </h3>
                    {partner.delivery && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                        <Truck size={12} />
                        <span>Entrega</span>
                      </div>
                    )}
                  </div>

                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-2">
                    {partner.category}
                  </span>

                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="text-sm font-semibold text-[var(--petmatch-text)]">
                      {partner.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-[var(--petmatch-text-muted)]">
                      ({partner.reviewCount} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[var(--petmatch-text-muted)]">
                    <MapPin size={12} />
                    <span>{partner.location} • {partner.distance}</span>
                  </div>
                </div>
              </div>

              {/* Products Preview */}
              {partner.products && partner.products.length > 0 && (
                <div className="px-4 pb-3 border-t border-gray-100 pt-3">
                  <p className="text-xs text-[var(--petmatch-text-muted)] mb-2">
                    {partner.products.length} produto(s) disponível(is)
                  </p>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {partner.products.slice(0, 3).map((product: any) => (
                      <div key={product.id} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
