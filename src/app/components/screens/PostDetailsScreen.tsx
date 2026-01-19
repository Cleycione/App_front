import React from 'react';
import { ArrowLeft, MapPin, Phone, Share2, Heart, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusChip } from '../ui/StatusChip';
import { Post } from '../PostCard';

interface PostDetailsScreenProps {
  post: Post;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function PostDetailsScreen({ post, onNavigate, onBack }: PostDetailsScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--app-gray-700)] hover:text-[var(--app-gray-900)]"
        >
          <ArrowLeft size={24} />
          <span>Voltar</span>
        </button>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <img
          src={post.imageUrl}
          alt="Animal"
          className="w-full h-96 object-cover"
        />
        {post.urgent && (
          <div className="absolute top-4 right-4 bg-[var(--app-alert)] text-white px-4 py-2 rounded-full flex items-center gap-2">
            <AlertCircle size={20} />
            <span>URGENTE</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <StatusChip status={post.status} />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Main Info */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[var(--app-gray-900)]">
              {post.animal.species} {post.status === 'lost' ? 'Perdido' : 'Encontrado'}
            </h1>
            <button className="p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-all">
              <Heart size={24} className="text-[var(--app-gray-600)]" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[var(--app-gray-200)] space-y-3">
            <div>
              <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Animal</h3>
              <p className="text-[var(--app-gray-900)]">
                {post.animal.species} • {post.animal.size} • {post.animal.color}
              </p>
            </div>

            <div className="border-t border-[var(--app-gray-200)] pt-3">
              <h3 className="text-sm text-[var(--app-gray-500)] mb-2">Localização</h3>
              <div className="flex items-start gap-2 text-[var(--app-gray-900)]">
                <MapPin size={20} className="flex-shrink-0 mt-0.5 text-[var(--app-primary)]" />
                <div>
                  <p>{post.location}</p>
                  <p className="text-sm text-[var(--app-gray-600)] mt-1">{post.distance} de você</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--app-gray-200)] pt-3">
              <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Visto há</h3>
              <p className="text-[var(--app-gray-900)]">{post.date}</p>
            </div>

            <div className="border-t border-[var(--app-gray-200)] pt-3">
              <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Características</h3>
              <p className="text-[var(--app-gray-900)]">
                Animal dócil, aparenta estar assustado. Possui pelagem bem cuidada.
              </p>
            </div>

            <div className="border-t border-[var(--app-gray-200)] pt-3">
              <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Observações</h3>
              <p className="text-[var(--app-gray-900)]">
                Sem coleira. Não aparenta estar ferido, mas está com fome.
              </p>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[var(--app-gray-200)]">
          <div className="h-48 bg-gradient-to-br from-[var(--app-gray-200)] to-[var(--app-gray-300)] relative">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-[var(--app-gray-400)]" style={{ top: `${i * 16.6}%` }} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-[var(--app-gray-400)]" style={{ left: `${i * 16.6}%` }} />
              ))}
            </div>
            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-lg">
                <path
                  d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z"
                  fill="var(--app-primary)"
                />
                <circle cx="20" cy="20" r="8" fill="white" />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <button className="text-[var(--app-primary)] hover:text-[var(--app-primary-dark)]">
              Ver no mapa completo →
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-4 border border-[var(--app-gray-200)]">
          <h3 className="mb-3 text-[var(--app-gray-900)]">
            Informações de contato
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[var(--app-gray-700)]">
              <Phone size={18} className="text-[var(--app-primary)]" />
              <span>(11) 98765-4321</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--app-gray-700)]">
              <MapPin size={18} className="text-[var(--app-primary)]" />
              <span>Rua das Flores, 123 - Jardim Paulista</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => alert('Iniciando contato via WhatsApp...')}
          >
            <Phone size={20} />
            Entrar em contato
          </Button>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => onNavigate('owner-claim', { post })}
          >
            <Heart size={20} />
            Eu sou o dono
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => alert('Recurso em desenvolvimento')}
          >
            Quero ajudar como cuidador
          </Button>

          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={() => onNavigate('share', { post })}
          >
            <Share2 size={20} />
            Compartilhar
          </Button>
        </div>

        {/* Timeline/Updates */}
        <div className="bg-white rounded-2xl p-4 border border-[var(--app-gray-200)]">
          <h3 className="mb-4 text-[var(--app-gray-900)]">
            Atualizações
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-[var(--app-success)] rounded-full"></div>
                <div className="w-0.5 h-full bg-[var(--app-gray-300)] mt-1"></div>
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm text-[var(--app-gray-900)] mb-1">Post publicado</p>
                <p className="text-xs text-[var(--app-gray-500)]">Hoje às 14:30</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-[var(--app-primary)] rounded-full"></div>
                <div className="w-0.5 h-full bg-[var(--app-gray-300)] mt-1"></div>
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm text-[var(--app-gray-900)] mb-1">12 pessoas compartilharam</p>
                <p className="text-xs text-[var(--app-gray-500)]">Hoje às 15:00</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-[var(--app-gray-300)] rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--app-gray-500)] mb-1">Aguardando mais atualizações...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="flex items-center gap-2 mb-2 text-amber-900">
            <AlertCircle size={20} />
            <span>Dicas de segurança</span>
          </h3>
          <ul className="text-sm text-amber-800 space-y-1 ml-7">
            <li>• Sempre se encontre em locais públicos</li>
            <li>• Leve alguém com você</li>
            <li>• Verifique a identificação do animal</li>
            <li>• Em caso de dúvidas, entre em contato conosco</li>
          </ul>
        </div>
      </div>
    </div>
  );
}