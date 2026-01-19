import React from 'react';
import { ArrowLeft, Moon, Sun, Type, Info, Eye, Shield, Smartphone, Trash2 } from 'lucide-react';
import { Toggle } from '../ui/Toggle';
import { FontSizeControl } from '../ui/FontSizeControl';
import { useSettings } from '@/app/contexts/SettingsContext';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function SettingsScreen({ onNavigate, onBack }: SettingsScreenProps) {
  const { theme, fontSize, highContrast, toggleTheme, setFontSize, toggleHighContrast } = useSettings();
  
  const isTrustedDevice = localStorage.getItem('petmatch_trusted_device') === 'true';

  const fontSizeMap = {
    'small': { title: '16px', body: '13px' },
    'medium': { title: '18px', body: '14px' },
    'large': { title: '22px', body: '16px' },
    'extra-large': { title: '26px', body: '18px' },
  };

  const handleRemoveTrust = () => {
    if (confirm('Tem certeza que deseja remover a confiança deste dispositivo? Você precisará fazer login novamente.')) {
      localStorage.removeItem('petmatch_trusted_device');
      localStorage.removeItem('petmatch_user_name');
      onNavigate('login');
    }
  };

  const handleLogoutAllDevices = () => {
    if (confirm('Deseja sair de todos os dispositivos? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('petmatch_trusted_device');
      localStorage.removeItem('petmatch_user_name');
      alert('Você foi desconectado de todos os dispositivos.');
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-[var(--app-gray-700)] hover:text-[var(--app-gray-900)]"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[var(--app-gray-900)]">
            Configurações
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Seção: Aparência */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Moon size={20} className="text-[var(--app-gray-600)]" />
            <h2 className="text-lg font-semibold text-[var(--app-gray-900)]">
              Aparência
            </h2>
          </div>

          {/* Card: Modo Escuro */}
          <div className="bg-white rounded-2xl border-2 border-[var(--app-gray-200)] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--app-gray-900)] mb-1">
                  Modo escuro
                </h3>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Reduz o brilho e melhora o conforto à noite.
                </p>
              </div>
              <Toggle
                checked={theme === 'dark'}
                onChange={toggleTheme}
                label="Alternar modo escuro"
              />
            </div>

            {/* Preview do tema */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border-2 transition-all ${
                  theme === 'light'
                    ? 'border-[var(--app-primary)] ring-2 ring-[var(--app-primary)]/20'
                    : 'border-[var(--app-gray-300)]'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sun size={16} className="text-gray-700" />
                    <span className="text-xs font-medium text-gray-900">Padrão</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-[var(--app-primary)] ring-2 ring-[var(--app-primary)]/20'
                    : 'border-[var(--app-gray-300)]'
                }`}
              >
                <div className="bg-slate-800 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Moon size={16} className="text-slate-300" />
                    <span className="text-xs font-medium text-white">Escuro</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-slate-600 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-600 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção: Texto */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Type size={20} className="text-[var(--app-gray-600)]" />
            <h2 className="text-lg font-semibold text-[var(--app-gray-900)]">
              Texto
            </h2>
          </div>

          {/* Card: Tamanho da Fonte */}
          <div className="bg-white rounded-2xl border-2 border-[var(--app-gray-200)] p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--app-gray-900)] mb-1">
                Tamanho da fonte
              </h3>
              <p className="text-sm text-[var(--app-gray-600)]">
                Ajuste para leitura mais confortável.
              </p>
            </div>

            <FontSizeControl value={fontSize} onChange={setFontSize} />

            {/* Preview ao vivo */}
            <div className="mt-4 p-4 bg-[var(--app-gray-50)] rounded-xl border border-[var(--app-gray-200)]">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-[var(--app-primary)]" />
                <span className="text-xs font-medium text-[var(--app-gray-600)]">
                  Exemplo de visualização
                </span>
              </div>
              <h4
                className="font-semibold text-[var(--app-gray-900)] mb-2"
                style={{ fontSize: fontSizeMap[fontSize].title }}
              >
                Rex - Golden Retriever
              </h4>
              <p
                className="text-[var(--app-gray-700)] leading-relaxed"
                style={{ fontSize: fontSizeMap[fontSize].body }}
              >
                Cachorro de porte grande encontrado próximo ao Parque Ibirapuera.
                Animal dócil, usa coleira azul e aparenta estar bem cuidado.
              </p>
            </div>
          </div>
        </div>

        {/* Seção: Acessibilidade */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Eye size={20} className="text-[var(--app-gray-600)]" />
            <h2 className="text-lg font-semibold text-[var(--app-gray-900)]">
              Acessibilidade
            </h2>
          </div>

          {/* Card: Contraste Alto */}
          <div className="bg-white rounded-2xl border-2 border-[var(--app-gray-200)] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--app-gray-900)] mb-1">
                  Contraste alto
                </h3>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Aumenta o contraste de cores e reforça contornos para melhorar a leitura.
                </p>
              </div>
              <Toggle
                checked={highContrast}
                onChange={toggleHighContrast}
                label="Alternar contraste alto"
              />
            </div>

            {/* Preview do Contraste */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border-2 transition-all ${
                  !highContrast
                    ? 'border-[var(--app-primary)] ring-2 ring-[var(--app-primary)]/20'
                    : 'border-[var(--app-gray-300)]'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <span className="text-xs font-medium text-gray-900">Normal</span>
                  <div className="space-y-2">
                    <div className="h-6 bg-white rounded border border-gray-200 flex items-center px-2">
                      <span className="text-[10px] text-gray-600">Card</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-4 bg-blue-500 rounded px-2 flex items-center">
                        <span className="text-[9px] text-white">Chip</span>
                      </div>
                      <div className="h-4 bg-orange-500 rounded px-2 flex items-center">
                        <span className="text-[9px] text-white">Tag</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border-2 transition-all ${
                  highContrast
                    ? 'border-[var(--app-primary)] ring-2 ring-[var(--app-primary)]/20'
                    : 'border-[var(--app-gray-300)]'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <span className="text-xs font-bold text-black">Alto</span>
                  <div className="space-y-2">
                    <div className="h-6 bg-white rounded border-2 border-black flex items-center px-2">
                      <span className="text-[10px] text-black font-semibold">Card</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-4 bg-blue-600 border border-blue-900 rounded px-2 flex items-center">
                        <span className="text-[9px] text-white font-semibold">Chip</span>
                      </div>
                      <div className="h-4 bg-orange-600 border border-orange-900 rounded px-2 flex items-center">
                        <span className="text-[9px] text-white font-semibold">Tag</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview completo ao vivo */}
            <div className="mt-4 p-4 bg-[var(--app-gray-50)] rounded-xl border border-[var(--app-gray-200)]">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-[var(--app-primary)]" />
                <span className="text-xs font-medium text-[var(--app-gray-600)]">
                  Exemplo com suas configurações atuais
                </span>
              </div>
              
              <div 
                className={`bg-white rounded-xl p-4 space-y-3 ${
                  highContrast 
                    ? 'border-2 border-[var(--app-gray-900)]' 
                    : 'border border-[var(--app-gray-200)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className={`px-3 py-1 rounded-full text-xs ${
                      highContrast
                        ? 'bg-blue-600 text-white font-semibold border border-blue-900'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    Perdido
                  </div>
                  <div 
                    className={`px-3 py-1 rounded-full text-xs ${
                      highContrast
                        ? 'bg-orange-600 text-white font-semibold border border-orange-900'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    Urgente
                  </div>
                </div>
                
                <h4
                  className={`${highContrast ? 'font-bold text-black' : 'font-semibold text-[var(--app-gray-900)]'}`}
                  style={{ fontSize: fontSizeMap[fontSize].title }}
                >
                  Rex - Golden Retriever
                </h4>
                
                <p
                  className={`leading-relaxed ${
                    highContrast ? 'text-black' : 'text-[var(--app-gray-700)]'
                  }`}
                  style={{ fontSize: fontSizeMap[fontSize].body }}
                >
                  Cachorro encontrado próximo ao Parque Ibirapuera.
                </p>
                
                <button
                  className={`w-full py-2 rounded-lg text-sm transition-all ${
                    highContrast
                      ? 'bg-[var(--app-primary)] text-white font-semibold border-2 border-blue-900 shadow-md'
                      : 'bg-[var(--app-primary)] text-white'
                  }`}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="pt-4 px-2">
          <p className="text-xs text-center text-[var(--app-gray-500)]">
            As configurações são aplicadas imediatamente e permanecem salvas no app.
          </p>
        </div>

        {/* Seção: Segurança */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Shield size={20} className="text-[var(--app-gray-600)]" />
            <h2 className="text-lg font-semibold text-[var(--app-gray-900)]">
              Segurança
            </h2>
          </div>

          {/* Card: Dispositivos Confiáveis */}
          <div className="bg-white rounded-2xl border-2 border-[var(--app-gray-200)] p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--app-gray-900)] mb-1">
                Dispositivos confiáveis
              </h3>
              <p className="text-sm text-[var(--app-gray-600)]">
                Gerencie os dispositivos que podem acessar sua conta sem revalidar o login.
              </p>
            </div>

            {/* Status do dispositivo atual */}
            <div className={`p-4 rounded-xl border-2 ${
              isTrustedDevice 
                ? 'bg-green-50 border-[var(--app-success)]' 
                : 'bg-gray-50 border-[var(--app-gray-300)]'
            }`}>
              <div className="flex items-center gap-3">
                <Smartphone size={24} className={isTrustedDevice ? 'text-[var(--app-success)]' : 'text-[var(--app-gray-500)]'} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--app-gray-900)]">
                      Este aparelho
                    </span>
                    {isTrustedDevice && (
                      <span className="px-2 py-0.5 bg-[var(--app-success)] text-white text-xs rounded-full">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--app-gray-600)] mt-1">
                    {isTrustedDevice 
                      ? 'Dispositivo confiável - Acesso direto habilitado' 
                      : 'Dispositivo não confiável - Login necessário'}
                  </p>
                </div>
              </div>
            </div>

            {/* Avisos de segurança */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-[var(--app-primary)] mt-0.5 flex-shrink-0" />
                <div className="text-xs text-[var(--app-gray-700)]">
                  <p className="mb-2">
                    O identificador de dispositivo confiável permite acesso rápido sem login frequente.
                  </p>
                  <p className="font-semibold text-[var(--app-urgent)]">
                    ⚠️ Nunca marque dispositivos públicos como confiáveis!
                  </p>
                </div>
              </div>
            </div>

            {/* Ações de segurança */}
            <div className="space-y-3 pt-2">
              {isTrustedDevice && (
                <button
                  onClick={handleRemoveTrust}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--app-gray-100)] text-[var(--app-gray-700)] rounded-xl font-semibold hover:bg-[var(--app-gray-200)] transition-all"
                >
                  <Trash2 size={18} />
                  Remover confiança deste dispositivo
                </button>
              )}
              
              <button
                onClick={handleLogoutAllDevices}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-[var(--app-urgent)] rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-200"
              >
                <Shield size={18} />
                Sair de todos os dispositivos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}