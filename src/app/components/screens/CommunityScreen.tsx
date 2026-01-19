import React, { useState } from 'react';
import { Send, Image, AlertCircle, Info } from 'lucide-react';
import { Card } from '../ui/Card';

interface CommunityScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  mentions?: string[];
  imageUrl?: string;
  isPinned?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    userId: 'system',
    userName: 'PetMatch',
    message: '📌 Bem-vindos ao chat da comunidade! Aqui você pode conversar com outros membros, pedir ajuda e compartilhar dicas. Use @ para mencionar alguém.',
    timestamp: '10:00',
    isPinned: true,
  },
  {
    id: '2',
    userId: 'system',
    userName: 'PetMatch',
    message: '📌 Regras: Seja respeitoso, não compartilhe informações pessoais sensíveis, e ajude sempre que possível.',
    timestamp: '10:01',
    isPinned: true,
  },
  {
    id: '3',
    userId: '1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    message: 'Olá pessoal! Alguém viu um golden retriever na região do Jardim Paulista?',
    timestamp: '14:30',
  },
  {
    id: '4',
    userId: '2',
    userName: 'João Santos',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    message: '@Maria Silva Oi Maria! Vi sim, estava próximo ao parque ontem à tarde.',
    timestamp: '14:35',
    mentions: ['Maria Silva'],
  },
  {
    id: '5',
    userId: '3',
    userName: 'Ana Costa',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    message: 'Gente, acabei de encontrar um gatinho na rua. Já registrei no app!',
    timestamp: '15:20',
  },
  {
    id: '6',
    userId: '1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    message: '@João Santos Muito obrigada! Vou verificar lá 🙏',
    timestamp: '15:25',
    mentions: ['João Santos'],
  },
];

export function CommunityScreen({ onNavigate }: CommunityScreenProps) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);

  const currentUser = 'João Silva'; // Mock current user

  const pinnedMessages = messages.filter(m => m.isPinned);
  const regularMessages = messages.filter(m => !m.isPinned);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Extract mentions
    const mentions = messageInput.match(/@[\w\s]+/g)?.map(m => m.slice(1).trim()) || [];

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: 'current',
      userName: currentUser,
      message: messageInput,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      mentions,
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    setShowMentionSuggestions(false);
  };

  const handleInputChange = (value: string) => {
    setMessageInput(value);
    
    // Show mention suggestions if @ is typed
    const lastWord = value.split(' ').pop() || '';
    setShowMentionSuggestions(lastWord.startsWith('@') && lastWord.length > 1);
  };

  const handleImageAttach = () => {
    alert('Funcionalidade de anexar imagem em desenvolvimento');
  };

  const renderMessage = (message: Message) => {
    const isSystem = message.userId === 'system';
    const isCurrentUser = message.userName === currentUser;

    // Highlight mentions in message
    let messageText = message.message;
    if (message.mentions && message.mentions.length > 0) {
      message.mentions.forEach(mention => {
        const mentionRegex = new RegExp(`@${mention}`, 'g');
        messageText = messageText.replace(
          mentionRegex,
          `<span class="text-[var(--app-primary)] font-semibold">@${mention}</span>`
        );
      });
    }

    if (isSystem) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 my-2">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-[var(--app-primary)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--app-gray-700)]">{message.message}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex gap-3 mb-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        {!isCurrentUser && (
          <div className="w-10 h-10 rounded-full bg-[var(--app-gray-200)] flex-shrink-0 overflow-hidden">
            {message.userAvatar ? (
              <img src={message.userAvatar} alt={message.userName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-[var(--app-gray-600)]">
                {message.userName.charAt(0)}
              </div>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex-1 max-w-[75%] ${isCurrentUser ? 'items-end' : ''}`}>
          {!isCurrentUser && (
            <p className="text-sm text-[var(--app-gray-600)] mb-1">{message.userName}</p>
          )}
          <div
            className={`rounded-2xl px-4 py-2 ${
              isCurrentUser
                ? 'bg-[var(--app-primary)] text-white'
                : 'bg-white border border-[var(--app-gray-200)] text-[var(--app-gray-900)]'
            }`}
          >
            <p
              className="text-sm break-words"
              dangerouslySetInnerHTML={{ __html: messageText }}
            />
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                alt=""
                className="mt-2 rounded-lg max-w-full"
              />
            )}
          </div>
          <p className={`text-xs text-[var(--app-gray-500)] mt-1 ${isCurrentUser ? 'text-right' : ''}`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--app-gray-50)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[var(--app-gray-900)]">
              Comunidade
            </h1>
            <p className="text-sm text-[var(--app-gray-600)]">
              Chat público da comunidade
            </p>
          </div>
          <button
            onClick={() => onNavigate('mentions')}
            className="relative p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
          >
            <span className="text-2xl">@</span>
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--app-primary)] rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Pinned Messages */}
        {pinnedMessages.length > 0 && (
          <div className="mb-4">
            {pinnedMessages.map(message => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
          </div>
        )}

        {/* Regular Messages */}
        <div>
          {regularMessages.map(message => (
            <div key={message.id}>
              {renderMessage(message)}
            </div>
          ))}
        </div>
      </div>

      {/* Mention Suggestions */}
      {showMentionSuggestions && (
        <div className="px-4 pb-2">
          <Card className="p-2">
            <p className="text-xs text-[var(--app-gray-500)] px-2 py-1">Sugestões:</p>
            {['Maria Silva', 'João Santos', 'Ana Costa'].map(name => (
              <button
                key={name}
                onClick={() => {
                  const words = messageInput.split(' ');
                  words[words.length - 1] = `@${name} `;
                  setMessageInput(words.join(' '));
                  setShowMentionSuggestions(false);
                }}
                className="w-full text-left px-2 py-2 hover:bg-[var(--app-gray-100)] rounded-lg text-sm"
              >
                @{name}
              </button>
            ))}
          </Card>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-[var(--app-gray-200)] px-4 py-3">
        <div className="flex items-end gap-2">
          <button
            onClick={handleImageAttach}
            className="p-2 text-[var(--app-gray-500)] hover:text-[var(--app-primary)] transition-colors"
          >
            <Image size={24} />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Digite sua mensagem... (Use @ para mencionar)"
              className="w-full px-4 py-2 bg-[var(--app-gray-100)] rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)] focus:bg-white max-h-24"
              rows={1}
              style={{ minHeight: '40px' }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="p-2 bg-[var(--app-primary)] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--app-primary-dark)] transition-colors"
          >
            <Send size={20} />
          </button>
        </div>

        <p className="text-xs text-[var(--app-gray-500)] mt-2 text-center">
          Use @ para mencionar alguém e eles receberão uma notificação
        </p>
      </div>
    </div>
  );
}
