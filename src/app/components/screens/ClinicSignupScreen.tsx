import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Shield, Info, Upload } from 'lucide-react';
import { PrivacyToggle } from '../ui/PrivacyToggle';
import { PhotoGalleryUpload } from '../ui/PhotoGalleryUpload';

interface ClinicSignupScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function ClinicSignupScreen({ onBack, onNavigate }: ClinicSignupScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    logo: null as File | null,
    cnpj: '',
    technicalManager: '',
    crmv: '',
    specialties: [] as string[],
    description: '',
    phone: '',
    showPhone: true,
    hours: '',
    emergency24h: false,
    acceptsEmergency: false,
    location: '',
    neighborhood: '',
    photos: [] as File[],
    privacyConsent: false
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const specialtyOptions = [
    'Clínica geral',
    'Emergências',
    'Cirurgia',
    'Internação',
    'Exames laboratoriais',
    'Raio-X',
    'Ultrassom',
    'Vacinas',
    'Banho e tosa',
    'Fisioterapia'
  ];

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      alert('Você precisa concordar com a política de privacidade');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('vets');
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
            Cadastro Enviado!
          </h2>
          <p className="text-[var(--petmatch-text-muted)]">
            O perfil da clínica está em análise. Você receberá uma notificação quando for aprovado.
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
                Cadastrar Clínica
              </h1>
              <p className="text-xs text-[var(--petmatch-text-muted)]">
                Crie o perfil da clínica veterinária
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
            Logo da clínica *
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
            Dados da Clínica
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Nome da clínica *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Clínica Veterinária Vida Animal"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Responsável técnico *
              </label>
              <input
                type="text"
                value={formData.technicalManager}
                onChange={(e) => setFormData(prev => ({ ...prev, technicalManager: e.target.value }))}
                placeholder="Dr(a). Nome do responsável"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Serviços oferecidos *
              </label>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => toggleSpecialty(specialty)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.specialties.includes(specialty)
                        ? 'bg-[var(--petmatch-primary)] text-white'
                        : 'bg-gray-100 text-[var(--petmatch-text)]'
                    }`}
                  >
                    {specialty}
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
                placeholder="Conte sobre a clínica, estrutura, equipe..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)] resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 3456-7890"
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
                Horários de funcionamento *
              </label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                placeholder="Ex: Seg-Dom 24 horas"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="emergency24h"
                  checked={formData.emergency24h}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergency24h: e.target.checked }))}
                  className="w-5 h-5 text-[var(--petmatch-primary)] rounded border-gray-300 focus:ring-[var(--petmatch-primary)]"
                />
                <label htmlFor="emergency24h" className="text-sm text-[var(--petmatch-text)]">
                  Funcionamento 24 horas
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="emergency"
                  checked={formData.acceptsEmergency}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptsEmergency: e.target.checked }))}
                  className="w-5 h-5 text-[var(--petmatch-primary)] rounded border-gray-300 focus:ring-[var(--petmatch-primary)]"
                />
                <label htmlFor="emergency" className="text-sm text-[var(--petmatch-text)]">
                  Atende emergências
                </label>
              </div>
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
                  placeholder="Ex: Pinheiros, São Paulo"
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

        {/* Photos */}
        <div className="border-t-2 border-gray-100 pt-6">
          <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
            Fotos da clínica (até 10 fotos)
          </label>
          <p className="text-xs text-[var(--petmatch-text-muted)] mb-3">
            Adicione fotos da recepção, consultórios, estrutura...
          </p>
          <PhotoGalleryUpload
            photos={formData.photos}
            onChange={(photos) => setFormData(prev => ({ ...prev, photos }))}
            maxPhotos={10}
          />
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
                CNPJ *
              </label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                placeholder="00.000.000/0000-00"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                CRMV do responsável técnico *
              </label>
              <input
                type="text"
                value={formData.crmv}
                onChange={(e) => setFormData(prev => ({ ...prev, crmv: e.target.value }))}
                placeholder="Ex: CRMV-SP 12345"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                required
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
              Concordo com o tratamento dos dados da clínica para fins de cadastro e contato na plataforma PetMatch, conforme a{' '}
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
          className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
        >
          Enviar para análise
        </button>
      </form>
    </div>
  );
}
