import React, { useEffect, useMemo, useState } from 'react';
import { Search, Filter, PlusCircle, Heart, Settings } from 'lucide-react';
import { PostCard } from '../PostCard';
import { Card } from '../ui/Card';
import { mapApi, postsApi } from '../../api/endpoints';
import { tokenStore } from '../../api/client';
import { toUiPost } from '../../api/mappers';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [radiusFilter, setRadiusFilter] = useState('5km');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const filterOptions = [
    { id: 'lost', label: 'Perdido' },
    { id: 'found', label: 'Encontrado' },
    { id: 'care', label: 'Sob cuidado' },
    { id: 'resolved', label: 'Resolvido' },
    { id: 'urgent', label: 'Urgente' },
  ];

  const radiusOptions = ['1km', '5km', '10km', '20km'];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const radiusKm = useMemo(() => Number(radiusFilter.replace('km', '')), [radiusFilter]);
  const statusFilter = activeFilters.length > 0 ? activeFilters.map((status) => status.toUpperCase()) : undefined;
  const statusParam = statusFilter?.join(',');
  const visiblePosts = useMemo(() => {
    let filtered = posts;
    if (activeFilters.length > 0) {
      filtered = filtered.filter((post) => activeFilters.includes(post.status));
    }
    if (!Number.isNaN(radiusKm)) {
      filtered = filtered.filter((post) => {
        if (typeof post.distanceKm !== 'number') {
          return true;
        }
        return post.distanceKm <= radiusKm;
      });
    }
    return filtered;
  }, [posts, activeFilters, radiusKm]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const hasToken = Boolean(tokenStore.getAccessToken());
        const params = {
          page: 0,
          size: 50,
          radiusKm,
          query: searchQuery || undefined,
          lat: -23.5615,
          lng: -46.6559,
          status: statusParam,
        };

        if (hasToken) {
          const response = await postsApi.list(params, { auth: true, skipRefresh: true });
          setPosts(response.content.map(toUiPost));
        } else {
          const response = await mapApi.posts(params, { auth: false, skipRefresh: true });
          setPosts(response.content.map(toUiPost));
        }
      } catch (error: any) {
        if (error?.status === 401) {
          try {
            const response = await mapApi.posts(
              {
                page: 0,
                size: 50,
                radiusKm,
                query: searchQuery || undefined,
                lat: -23.5615,
                lng: -46.6559,
                status: statusParam,
              },
              { auth: false, skipRefresh: true },
            );
            setPosts(response.content.map(toUiPost));
            setErrorMessage('');
          } catch {
            setErrorMessage('');
            setPosts([]);
          }
        } else {
          setErrorMessage(error?.message ?? 'Falha ao carregar posts.');
          setPosts([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [radiusKm, searchQuery, statusParam]);

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[var(--app-gray-900)]">
            PetMatch
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('register')}
              className="p-2 text-[var(--app-gray-600)] hover:text-[var(--app-primary)] hover:bg-[var(--app-gray-100)] rounded-lg transition-all"
              aria-label="Registrar animal"
            >
              <PlusCircle size={24} />
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 text-[var(--app-gray-600)] hover:text-[var(--app-primary)] hover:bg-[var(--app-gray-100)] rounded-lg transition-all"
              aria-label="Configurações"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-gray-400)]" size={20} />
          <input
            type="text"
            placeholder="Buscar por bairro, cidade, raça, cor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--app-gray-300)] focus:border-[var(--app-primary)] focus:ring-2 focus:ring-[var(--app-primary)]/20 outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter size={18} className="text-[var(--app-gray-600)] flex-shrink-0" />
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeFilters.includes(option.id)
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'bg-[var(--app-gray-200)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-300)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--app-gray-600)]">Raio:</span>
            {radiusOptions.map(radius => (
              <button
                key={radius}
                onClick={() => setRadiusFilter(radius)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  radiusFilter === radius
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'bg-[var(--app-gray-200)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-300)]'
                }`}
              >
                {radius}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Action: Donation */}
        <Card 
          onClick={() => onNavigate('donation-list')}
          className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[var(--app-gray-900)] mb-1">
                Pets para Doação
              </h3>
              <p className="text-sm text-[var(--app-gray-600)]">
                Veja pets disponíveis para adoção
              </p>
            </div>
            <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
              5
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-[var(--app-gray-500)]">Carregando posts...</p>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="text-center py-12">
              {errorMessage && (
                <p className="text-[var(--app-danger)] mb-2">{errorMessage}</p>
              )}
              <p className="text-[var(--app-gray-500)] mb-4">
                Nenhum animal encontrado com esses filtros
              </p>
              <button
                onClick={() => setActiveFilters([])}
                className="text-[var(--app-primary)] hover:text-[var(--app-primary-dark)]"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            visiblePosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onViewDetails={() => onNavigate('post-details', { post })}
                onShare={() => onNavigate('share', { post })}
                onContact={() => {
                  alert('Recurso de contato em desenvolvimento');
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
