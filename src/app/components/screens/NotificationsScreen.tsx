import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, CheckCircle, MapPin, AtSign, Gift } from 'lucide-react';
import { Card } from '../ui/Card';

interface NotificationsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Notification {
  id: string;
  type: 'match' | 'comment' | 'help' | 'resolved' | 'mention' | 'community' | 'patinha' | 'donation';
  title: string;
  message: string;
  time: string;
  read: boolean;
  imageUrl?: string;
  priority?: 'high' | 'normal';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'mention',
    title: 'Você foi mencionado',
    message: 'Maria Silva mencionou você no chat da comunidade.',
    time: 'Há 15 minutos',
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'donation',
    title: 'Nova doação na sua região',
    message: 'Um Golden Retriever está disponível para adoção a 1.2 km de você.',
    time: 'Há 20 minutos',
    read: false,
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=100',
  },
  {
    id: '3',
    type: 'match',
    title: 'Possível match encontrado!',
    message: 'Um animal semelhante ao que você perdeu foi encontrado a 1.2km de distância.',
    time: 'Há 30 minutos',
    read: false,
    imageUrl: 'https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?w=100',
  },
  {
    id: '4',
    type: 'patinha',
    title: 'Você ganhou uma Patinha! 🐾',
    message: 'Parabéns! Você ganhou +1 Patinha por devolver um pet ao dono.',
    time: 'Há 1 hora',
    read: false,
  },
  {
    id: '5',
    type: 'donation',
    title: 'Interesse na sua doação',
    message: 'Ana Costa demonstrou interesse no pet que você está doando.',
    time: 'Há 2 horas',
    read: true,
  },
  {
    id: '6',
    type: 'comment',
    title: 'Nova solicitação: "Eu sou o dono"',
    message: 'Maria Silva enviou uma solicitação dizendo ser dona do pet que você encontrou.',
    time: 'Há 2 horas',
    read: false,
  },
  {
    id: '7',
    type: 'community',
    title: 'Nova mensagem na comunidade',
    message: 'Há 3 novas mensagens no chat da comunidade.',
    time: 'Há 3 horas',
    read: true,
  },
  {
    id: '8',
    type: 'help',
    title: 'Alguém quer ajudar!',
    message: 'João Santos se ofereceu para ser cuidador temporário.',
    time: 'Há 5 horas',
    read: true,
  },
  {
    id: '9',
    type: 'resolved',
    title: 'Animal reunido com o dono!',
    message: 'Parabéns! O animal que você ajudou foi reunido com seu dono.',
    time: 'Há 1 dia',
    read: true,
  },
  {
    id: '10',
    type: 'match',
    title: 'Atualização do caso',
    message: 'O post que você compartilhou teve 15 novas visualizações.',
    time: 'Há 2 dias',
    read: true,
  },
];

type TabType = 'all' | 'mentions';

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <MapPin size={24} className="text-[var(--app-primary)]" />;
      case 'comment':
        return <MessageCircle size={24} className="text-[var(--app-secondary)]" />;
      case 'help':
        return <Heart size={24} className="text-pink-500" />;
      case 'resolved':
        return <CheckCircle size={24} className="text-green-500" />;
      case 'mention':
        return <AtSign size={24} className="text-[var(--app-primary)]" />;
      case 'community':
        return <MessageCircle size={24} className="text-blue-500" />;
      case 'patinha':
        return <Gift size={24} className="text-amber-500" />;
      default:
        return <Bell size={24} className="text-[var(--app-gray-500)]" />;
    }
  };

  const filteredNotifications = activeTab === 'mentions' 
    ? mockNotifications.filter(n => n.type === 'mention')
    : mockNotifications;

  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const unreadMentions = mockNotifications.filter(n => n.type === 'mention' && !n.read).length;

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[var(--app-gray-900)]">
            Notificações
          </h1>
          {unreadCount > 0 && (
            <div className="bg-[var(--app-primary)] text-white px-3 py-1 rounded-full text-sm">
              {unreadCount} nova{unreadCount > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-[var(--app-primary)] text-white'
                : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
            }`}
          >
            Tudo
          </button>
          <button
            onClick={() => setActiveTab('mentions')}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors relative ${
              activeTab === 'mentions'
                ? 'bg-[var(--app-primary)] text-white'
                : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <AtSign size={16} />
              Menções
            </span>
            {unreadMentions > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--app-warning)] text-white text-xs rounded-full flex items-center justify-center">
                {unreadMentions}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-6 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="text-[var(--app-gray-300)] mx-auto mb-4" />
            <p className="text-[var(--app-gray-500)]">
              {activeTab === 'mentions' ? 'Nenhuma menção ainda' : 'Nenhuma notificação ainda'}
            </p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <Card
              key={notification.id}
              onClick={() => {
                // Navigate to relevant screen based on notification type
                if (notification.type === 'mention' || notification.type === 'community') {
                  onNavigate('community');
                } else if (notification.type === 'patinha') {
                  onNavigate('patinhas-wallet');
                } else {
                  onNavigate('home');
                }
              }}
              className={`${!notification.read ? 'border-l-4 border-l-[var(--app-primary)]' : ''} ${
                notification.priority === 'high' ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-4 p-4">
                <div className="flex-shrink-0">
                  {notification.imageUrl ? (
                    <img
                      src={notification.imageUrl}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--app-gray-100)] flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`flex items-center gap-2 ${!notification.read ? 'text-[var(--app-gray-900)]' : 'text-[var(--app-gray-700)]'}`}>
                      {notification.priority === 'high' && notification.type === 'mention' && (
                        <AtSign size={16} className="text-[var(--app-primary)]" />
                      )}
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[var(--app-primary)] rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-[var(--app-gray-600)] mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-[var(--app-gray-500)]">
                    {notification.time}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Mark all as read */}
      {unreadCount > 0 && (
        <div className="fixed bottom-24 left-0 right-0 px-4">
          <button
            onClick={() => alert('Todas as notificações marcadas como lidas')}
            className="w-full max-w-md mx-auto bg-white border-2 border-[var(--app-primary)] text-[var(--app-primary)] py-3 rounded-xl hover:bg-[var(--app-primary-light)] transition-all shadow-lg"
          >
            Marcar todas como lidas
          </button>
        </div>
      )}
    </div>
  );
}