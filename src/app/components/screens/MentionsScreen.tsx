import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface MentionsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Mention {
  id: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const mockMentions: Mention[] = [
  {
    id: '1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    message: '@João Silva Obrigada pela ajuda! Consegui encontrar meu pet graças às suas dicas.',
    timestamp: 'Há 2 horas',
    isRead: false,
  },
  {
    id: '2',
    userName: 'Ana Costa',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    message: '@João Silva Você poderia me ajudar a identificar a raça desse cachorro que encontrei?',
    timestamp: 'Há 5 horas',
    isRead: false,
  },
  {
    id: '3',
    userName: 'Carlos Oliveira',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    message: '@João Silva Vi que você é veterinário. Tem alguma dica para cuidados com gatos resgatados?',
    timestamp: 'Há 1 dia',
    isRead: true,
  },
  {
    id: '4',
    userName: 'Beatriz Santos',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    message: '@João Silva Parabéns por devolver aquele golden retriever! Você é incrível! 🎉',
    timestamp: 'Há 2 dias',
    isRead: true,
  },
];

export function MentionsScreen({ onBack, onNavigate }: MentionsScreenProps) {
  const unreadCount = mockMentions.filter(m => !m.isRead).length;

  const handleMentionClick = (mention: Mention) => {
    // In a real app, this would navigate to the specific message in the chat
    alert(`Abrindo conversa com ${mention.userName}...`);
    onNavigate('community');
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[var(--app-gray-900)]">
              Menções
            </h1>
            <p className="text-sm text-[var(--app-gray-600)]">
              Mensagens onde você foi mencionado
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="bg-[var(--app-primary)] text-white px-3 py-1 rounded-full text-sm">
              {unreadCount} nova{unreadCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6 space-y-3">
        {mockMentions.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-[var(--app-gray-300)] mx-auto mb-4" />
            <p className="text-[var(--app-gray-500)]">
              Nenhuma menção ainda
            </p>
            <p className="text-sm text-[var(--app-gray-400)] mt-2">
              Quando alguém te mencionar no chat, aparecerá aqui
            </p>
          </div>
        ) : (
          <>
            {/* Unread Mentions */}
            {unreadCount > 0 && (
              <div className="mb-6">
                <h2 className="text-sm text-[var(--app-gray-500)] mb-3 px-1">
                  Não lidas
                </h2>
                <div className="space-y-3">
                  {mockMentions
                    .filter(m => !m.isRead)
                    .map(mention => (
                      <Card
                        key={mention.id}
                        onClick={() => handleMentionClick(mention)}
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-[var(--app-primary)]"
                      >
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-full bg-[var(--app-gray-200)] flex-shrink-0 overflow-hidden">
                            {mention.userAvatar ? (
                              <img
                                src={mention.userAvatar}
                                alt={mention.userName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg text-[var(--app-gray-600)]">
                                {mention.userName.charAt(0)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="text-[var(--app-gray-900)]">
                                {mention.userName}
                              </h3>
                              <div className="w-2 h-2 bg-[var(--app-primary)] rounded-full flex-shrink-0 mt-1.5" />
                            </div>
                            <p className="text-sm text-[var(--app-gray-700)] mb-2 line-clamp-2">
                              {mention.message.replace(/@\w+\s\w+/g, (match) => {
                                return match;
                              })}
                            </p>
                            <p className="text-xs text-[var(--app-gray-500)]">
                              {mention.timestamp}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* Read Mentions */}
            {mockMentions.some(m => m.isRead) && (
              <div>
                <h2 className="text-sm text-[var(--app-gray-500)] mb-3 px-1">
                  Anteriores
                </h2>
                <div className="space-y-3">
                  {mockMentions
                    .filter(m => m.isRead)
                    .map(mention => (
                      <Card
                        key={mention.id}
                        onClick={() => handleMentionClick(mention)}
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-full bg-[var(--app-gray-200)] flex-shrink-0 overflow-hidden">
                            {mention.userAvatar ? (
                              <img
                                src={mention.userAvatar}
                                alt={mention.userName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg text-[var(--app-gray-600)]">
                                {mention.userName.charAt(0)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-[var(--app-gray-700)] mb-1">
                              {mention.userName}
                            </h3>
                            <p className="text-sm text-[var(--app-gray-600)] mb-2 line-clamp-2">
                              {mention.message}
                            </p>
                            <p className="text-xs text-[var(--app-gray-500)]">
                              {mention.timestamp}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mark all as read */}
      {unreadCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4">
          <button
            onClick={() => alert('Todas as menções marcadas como lidas')}
            className="w-full max-w-md mx-auto bg-white border-2 border-[var(--app-primary)] text-[var(--app-primary)] py-3 rounded-xl hover:bg-[var(--app-primary-light)] transition-all shadow-lg"
          >
            Marcar todas como lidas
          </button>
        </div>
      )}
    </div>
  );
}
