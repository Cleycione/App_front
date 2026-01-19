import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, Paperclip, Send, Image as ImageIcon, Video, X } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'caregiver';
  type: 'text' | 'image' | 'video';
  content: string;
  timestamp: Date;
}

interface ChatScreenProps {
  caregiver: any;
  onBack: () => void;
}

export function ChatScreen({ caregiver, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'caregiver',
      type: 'text',
      content: 'Olá! Obrigado pelo interesse. Como posso ajudar você e seu pet?',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      sender: 'user',
      type: 'text',
      content: 'Oi! Preciso de alguém para cuidar do meu cachorro por 3 dias. Você tem disponibilidade?',
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: '3',
      sender: 'caregiver',
      type: 'text',
      content: 'Sim, tenho disponibilidade! Qual o porte e raça do seu cachorro?',
      timestamp: new Date(Date.now() - 3400000)
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [showMediaPreview, setShowMediaPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        type: 'text',
        content: inputText.trim(),
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'caregiver',
          type: 'text',
          content: 'Entendi! Vou verificar e já te respondo.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      setPreviewFile({ type, url });
      setShowMediaPreview(true);
    }
  };

  const handleSendMedia = (caption: string = '') => {
    if (previewFile) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        type: previewFile.type,
        content: previewFile.url,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      
      if (caption) {
        const captionMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'user',
          type: 'text',
          content: caption,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, captionMessage]);
      }
      
      setShowMediaPreview(false);
      setPreviewFile(null);
      setInputText('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    }
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[var(--petmatch-bg-light)] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[var(--petmatch-border)] sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <img 
            src={caregiver.photo} 
            alt={caregiver.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-[var(--petmatch-text)]">
              {caregiver.name}
            </h2>
            <p className="text-xs text-green-600">
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
          
          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.type === 'text' ? (
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[var(--petmatch-primary)] text-white rounded-br-none'
                        : 'bg-white text-[var(--petmatch-text)] border border-[var(--petmatch-border)] rounded-bl-none'
                    }`}>
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                  ) : message.type === 'image' ? (
                    <div className="rounded-2xl overflow-hidden">
                      <img 
                        src={message.content} 
                        alt="Imagem enviada"
                        className="max-w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden bg-black">
                      <video 
                        src={message.content} 
                        controls
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                  <p className={`text-xs text-[var(--petmatch-text-muted)] mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action: Send Pet Update */}
      <div className="bg-blue-50 border-t border-blue-200 px-4 py-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-[var(--petmatch-primary)] font-medium hover:underline"
        >
          📸 Enviar atualização do pet
        </button>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[var(--petmatch-border)] p-4">
        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-500 hover:text-[var(--petmatch-primary)] transition flex-shrink-0"
          >
            <Paperclip size={24} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Digite uma mensagem..."
              className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)] max-h-24"
              rows={1}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-[var(--petmatch-primary)] text-white rounded-full p-3 hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Media Preview Modal */}
      {showMediaPreview && previewFile && (
        <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-white font-semibold">Prévia</h3>
            <button
              onClick={() => {
                setShowMediaPreview(false);
                setPreviewFile(null);
              }}
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            {previewFile.type === 'image' ? (
              <img 
                src={previewFile.url} 
                alt="Prévia"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video 
                src={previewFile.url} 
                controls
                className="max-w-full max-h-full"
              />
            )}
          </div>
          
          <div className="p-4 bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Adicione uma legenda..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
              />
              <button
                onClick={() => handleSendMedia(inputText)}
                className="bg-[var(--petmatch-primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
