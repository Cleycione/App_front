import React from 'react';
import { Home, MapPin, PlusCircle, Bell, User, Briefcase, MessageCircle } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'map', icon: MapPin, label: 'Mapa' },
    { id: 'register', icon: PlusCircle, label: 'Registrar' },
    { id: 'services-hub', icon: Briefcase, label: 'Serviços' },
    { id: 'community', icon: MessageCircle, label: 'Comunidade' },
    { id: 'notifications', icon: Bell, label: 'Notif.' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--petmatch-border)] safe-area-bottom z-50 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 min-w-[50px] ${
                isActive
                  ? 'text-[var(--petmatch-primary)]'
                  : 'text-gray-900 hover:text-[var(--petmatch-primary)]'
              }`}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-transform duration-200 ${isActive ? 'scale-150' : 'scale-100'}`}
              />
              <span className={`text-[9px] transition-transform duration-200 ${isActive ? 'font-semibold scale-150' : 'scale-100'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}