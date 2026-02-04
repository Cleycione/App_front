import React from 'react';
import { MapPin, Clock, Share2, Phone } from 'lucide-react';
import { Card } from './ui/Card';
import { StatusChip } from './ui/StatusChip';
import { Button } from './ui/Button';

export interface Post {
  id: string;
  imageUrl: string;
  status: 'lost' | 'found' | 'care' | 'resolved' | 'urgent';
  location: string;
  distance: string;
  distanceKm?: number;
  date: string;
  animal: {
    species: string;
    size: string;
    color: string;
  };
  urgent?: boolean;
}

interface PostCardProps {
  post: Post;
  onViewDetails: () => void;
  onShare: () => void;
  onContact: () => void;
  compact?: boolean;
}

export function PostCard({ post, onViewDetails, onShare, onContact, compact = false }: PostCardProps) {
  if (compact) {
    return (
      <Card onClick={onViewDetails}>
        <div className="flex gap-3 p-3">
          <div className="relative flex-shrink-0">
            <img
              src={post.imageUrl}
              alt="Animal"
              className="w-20 h-20 object-cover rounded-xl"
            />
            {post.urgent && (
              <div className="absolute -top-1 -right-1 bg-[var(--app-alert)] text-white text-xs px-2 py-0.5 rounded-full">
                URGENTE
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <StatusChip status={post.status} />
            </div>
            <p className="text-sm text-[var(--app-gray-600)] flex items-center gap-1 truncate">
              <MapPin size={14} />
              {post.location} • {post.distance}
            </p>
            <p className="text-xs text-[var(--app-gray-500)] flex items-center gap-1 mt-1">
              <Clock size={12} />
              {post.date}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="relative">
        <img
          src={post.imageUrl}
          alt="Animal"
          className="w-full h-64 object-cover"
        />
        {post.urgent && (
          <div className="absolute top-3 right-3 bg-[var(--app-alert)] text-white px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-sm">⚠️ URGENTE</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StatusChip status={post.status} />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <p className="text-[var(--app-gray-700)] mb-1">
            {post.animal.species} • {post.animal.size} • {post.animal.color}
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--app-gray-600)]">
            <MapPin size={16} />
            <span>{post.location}</span>
            <span>•</span>
            <span>{post.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--app-gray-500)] mt-1">
            <Clock size={14} />
            <span>{post.date}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={onViewDetails}
          >
            Ver detalhes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="flex-shrink-0"
          >
            <Share2 size={18} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onContact}
            className="flex-shrink-0"
          >
            <Phone size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
