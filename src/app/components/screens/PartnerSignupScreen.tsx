import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Shield, Info } from 'lucide-react';
import { PrivacyToggle } from '../ui/PrivacyToggle';

interface PartnerSignupScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function PartnerSignupScreen({ onBack, onNavigate }: PartnerSignupScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    logo: null as File | null,
    category: '' as 'Pet Shop' | 'Agropecuária' | 'Distribuidor de Ração' | 'Outros' | '',
    cnpj: '',
    description: '',
    phone: '',
    showPhone: true,
    email: '',
    hours: '',
    delivery: false,
    location: '',
    neighborhood: '',
    privacyConsent: false
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['Pet Shop', 'Agropecuária', 'Distribuidor de Ração', 'Outros'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      alert('Você precisa concordar com a política de privacidade');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('partners');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[var(--app-bg-light)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--petmatch-text)] mb-2">
            Cadastro Realizado!
          </h2>
          <p className="text-[var(--petmatch-text-muted)]">
            Seu negócio foi cadastrado com sucesso. Agora você pode adicionar produtos ao seu perfil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[var(--petmatch-text)]" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-[var(--petmatch-text)]">
                Cadastrar Parceiro
              </h1>
              <p className="text-xs text-[var(--petmatch-text-muted)]">
                Crie o perfil do seu negócio
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
            Logo / Imagem principal *
          </label>
          <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[var(--petmatch-primary)] transition-colors">
            <div className="text-center">
              <Camera className="mx-auto text-gray-400 mb-2" size={32} />
              <span className="text-xs text-gray-500">Adicionar logo</span>
            </div>
          </div>
        </div>

        {/* Public Data Section */}
        <div className="border-t-2 border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-[var(--petmatch-text)] mb-4">
            Dados da Empresa
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Nome fantasia / Razão social *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Pet Shop Feliz"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Categoria *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: category as any }))}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      formData.category === category
                        ? 'bg-[var(--petmatch-primary)] text-white'
                        : 'bg-gray-100 text-[var(--petmatch-text)]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Conte sobre seu negócio, produtos e diferenciais..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)] resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 98888-1234"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
              <PrivacyToggle
                id="showPhone"
                label="Exibir telefone publicamente"
                checked={formData.showPhone}
                onChange={(checked) => setFormData(prev => ({ ...prev, showPhone: checked }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                E-mail comercial
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contato@petshop.com.br"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Horários de funcionamento *
              </label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                placeholder="Ex: Seg-Sex 9h-19h, Sáb 9h-17h"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="delivery"
                checked={formData.delivery}
                onChange={(e) => setFormData(prev => ({ ...prev, delivery: e.target.checked }))}
                className="w-5 h-5 text-[var(--petmatch-primary)] rounded border-gray-300 focus:ring-[var(--petmatch-primary)]"
              />
              <label htmlFor="delivery" className="text-sm text-[var(--petmatch-text)]">
                Oferece entrega
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Bairro/Cidade *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                  placeholder="Ex: Perdizes, São Paulo"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                  required
                />
              </div>
              <p className="text-xs text-[var(--petmatch-text-muted)] mt-1">
                Apenas o bairro será exibido publicamente
              </p>
            </div>
          </div>
        </div>

        {/* Private Data Section */}
        <div className="border-t-2 border-gray-100 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-[var(--petmatch-primary)]" />
            <h2 className="text-lg font-semibold text-[var(--petmatch-text)]">
              Dados Privados
            </h2>
          </div>
          <p className="text-xs text-[var(--petmatch-text-muted)] mb-4">
            Estas informações não serão exibidas publicamente
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                CNPJ (opcional)
              </label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                placeholder="00.000.000/0000-00"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Endereço completo (privado)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Rua, número, complemento..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-[var(--petmatch-text)] mb-2 text-sm">
            📦 Produtos
          </h3>
          <p className="text-xs text-[var(--petmatch-text-muted)]">
            Após concluir o cadastro, você poderá adicionar até 10 produtos ao seu perfil através da área de gerenciamento.
          </p>
        </div>

        {/* LGPD Consent */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.privacyConsent}
              onChange={(e) => setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }))}
              className="mt-1 w-5 h-5 text-[var(--petmatch-primary)] rounded border-gray-300 focus:ring-[var(--petmatch-primary)]"
              required
            />
            <label htmlFor="privacy" className="flex-1 text-sm text-[var(--petmatch-text)]">
              Concordo com o tratamento dos dados da empresa para fins de cadastro e contato na plataforma PetMatch, conforme a{' '}
              <button type="button" className="text-[var(--petmatch-primary)] underline">
                Política de Privacidade
              </button>. *
            </label>
          </div>
          <p className="text-xs text-[var(--petmatch-text-muted)] mt-3 flex items-start gap-2">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              Você pode revogar este consentimento a qualquer momento através das configurações do perfil.
            </span>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Publicar perfil
        </button>
      </form>
    </div>
  );
}
