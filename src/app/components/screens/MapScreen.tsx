import React, { useEffect, useState } from 'react';
import { Navigation, Filter } from 'lucide-react';
import { PostCard } from '../PostCard';
import { mapApi } from '../../api/endpoints';
import { toUiPost } from '../../api/mappers';

interface MapScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function MapScreen({ onNavigate }: MapScreenProps) {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterOptions = [
    { id: 'lost', label: 'Perdido', color: 'var(--status-lost)' },
    { id: 'found', label: 'Encontrado', color: 'var(--status-found)' },
    { id: 'care', label: 'Sob cuidado', color: 'var(--status-care)' },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const statusFilter = activeFilters.length > 0 ? activeFilters.map((status) => status.toUpperCase()).join(',') : undefined;

  useEffect(() => {
    const fetchMapPosts = async () => {
      setIsLoading(true);
      try {
        const response = await mapApi.posts({
          page: 0,
          size: 50,
          radiusKm: 20,
          lat: -23.5615,
          lng: -46.6559,
          status: statusFilter,
        });
        setPosts(response.content.map(toUiPost));
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMapPosts();
  }, [statusFilter]);

  const selectedPost = selectedPin ? posts.find(p => p.id === selectedPin) : null;

  // Mock map coordinates for pins
  const pins = posts.map((post, index) => ({
    id: post.id,
    top: 20 + (index * 15) + Math.random() * 10,
    left: 15 + (index * 20) + Math.random() * 15,
    status: post.status,
  }));

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4">
        <h1 className="mb-4 text-[var(--app-gray-900)]">
          Mapa de Ocorrências
        </h1>
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={18} className="text-[var(--app-gray-600)] flex-shrink-0" />
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => toggleFilter(option.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeFilters.includes(option.id)
                  ? 'bg-[var(--app-primary)] text-white'
                  : 'bg-[var(--app-gray-200)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-300)]'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        {/* Mock Map Background */}
        <div className="w-full h-[60vh] bg-gradient-to-br from-[var(--app-gray-200)] to-[var(--app-gray-300)] relative overflow-hidden">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full h-px bg-[var(--app-gray-400)]" style={{ top: `${i * 10}%` }} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full w-px bg-[var(--app-gray-400)]" style={{ left: `${i * 10}%` }} />
            ))}
          </div>

          {/* Map Label */}
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
            <p className="text-sm text-[var(--app-gray-700)]">São Paulo, SP</p>
          </div>

          {/* Location Button */}
          <button
            onClick={() => alert('Usando sua localização atual')}
            className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-[var(--app-gray-100)] transition-all"
          >
            <Navigation size={24} className="text-[var(--app-primary)]" />
          </button>

          {/* Pins */}
          {isLoading ? null : pins.map(pin => {
            const isSelected = selectedPin === pin.id;
            const pinColors = {
              lost: 'var(--status-lost)',
              found: 'var(--status-found)',
              care: 'var(--status-care)',
              resolved: 'var(--status-resolved)',
            };

            return (
              <button
                key={pin.id}
                onClick={() => setSelectedPin(pin.id === selectedPin ? null : pin.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-full transition-all ${
                  isSelected ? 'scale-125 z-10' : 'scale-100 hover:scale-110'
                }`}
                style={{
                  top: `${pin.top}%`,
                  left: `${pin.left}%`,
                }}
              >
                <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-lg">
                  <path
                    d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z"
                    fill={pinColors[pin.status as keyof typeof pinColors]}
                  />
                  <circle cx="20" cy="20" r="8" fill="white" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Selected Pin Info */}
        {selectedPost && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--app-gray-200)] p-4 shadow-lg">
            <PostCard
              post={selectedPost}
              onViewDetails={() => onNavigate('post-details', { post: selectedPost })}
              onShare={() => onNavigate('share', { post: selectedPost })}
              onContact={() => alert('Recurso de contato em desenvolvimento')}
              compact
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-4 border border-[var(--app-gray-200)]">
          <h3 className="mb-2 text-[var(--app-gray-900)]">
            Sobre o Mapa
          </h3>
          <p className="text-sm text-[var(--app-gray-600)] leading-relaxed">
            Toque nos pins coloridos para ver informações sobre animais perdidos ou encontrados próximos a você. 
            Use os filtros acima para visualizar apenas ocorrências específicas.
          </p>
        </div>
      </div>
    </div>
  );
}
