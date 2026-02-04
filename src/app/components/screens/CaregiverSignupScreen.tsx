import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { PhotoGalleryUpload } from '../ui/PhotoGalleryUpload';
import { usersApi } from '../../api/endpoints';

interface CaregiverSignupScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function CaregiverSignupScreen({ onBack, onNavigate }: CaregiverSignupScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    experience: '',
    petsAccepted: [] as string[],
    sizesAccepted: [] as string[],
    availability: '',
    emergency: false,
    observations: ''
  });
  
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const me = await usersApi.getMe();
        setFormData((prev) => ({
          ...prev,
          name: me.name ?? '',
          phone: me.phone ?? '',
          email: me.email ?? '',
          address: me.address ?? '',
        }));
      } catch (error: any) {
        setErrorMessage(error?.message ?? 'Não foi possível carregar seus dados.');
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      alert('Por favor, adicione pelo menos uma foto do local');
      return;
    }
    setSubmitted(true);
  };

  const toggleArrayField = (field: 'petsAccepted' | 'sizesAccepted', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--petmatch-bg-light)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--petmatch-text)] mb-2">
            Cadastro Enviado!
          </h2>
          <p className="text-[var(--petmatch-text-muted)] mb-6">
            Seu perfil de cuidador está em análise. Você receberá uma notificação quando for aprovado.
          </p>
          <button
            onClick={() => onNavigate('caregivers')}
            className="w-full py-3 bg-[var(--petmatch-primary)] text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Voltar para Cuidadores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--petmatch-bg-light)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--petmatch-border)] sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-[var(--petmatch-text)]">
            Cadastro de Cuidador
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6 pb-24">
        {/* Personal Info */}
        <div className="bg-white rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[var(--petmatch-text)]">
              Informações Pessoais
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="text-sm text-[var(--petmatch-primary)] font-medium"
            >
              {isEditing ? 'Bloquear edição' : 'Editar'}
            </button>
          </div>

          {isLoading && (
            <p className="text-sm text-[var(--petmatch-text-muted)]">Carregando dados...</p>
          )}
          {!isLoading && errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Nome completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg"
              disabled={!isEditing}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg"
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Endereço <span className="text-xs text-gray-500">(apenas bairro será exibido)</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg"
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-xl p-4 space-y-4">
          <h2 className="font-semibold text-[var(--petmatch-text)] mb-3">
            Experiência e Serviços
          </h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Experiência com pets</label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="Conte sobre sua experiência cuidando de animais..."
              className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg h-24 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipos de pets aceitos</label>
            <div className="flex flex-wrap gap-2">
              {['Cães', 'Gatos', 'Coelhos', 'Outros'].map(pet => (
                <button
                  key={pet}
                  type="button"
                  onClick={() => toggleArrayField('petsAccepted', pet)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    formData.petsAccepted.includes(pet)
                      ? 'bg-[var(--petmatch-primary)] text-white border-[var(--petmatch-primary)]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--petmatch-primary)]'
                  }`}
                >
                  {pet}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Porte aceito</label>
            <div className="flex flex-wrap gap-2">
              {['Pequeno', 'Médio', 'Grande'].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleArrayField('sizesAccepted', size)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    formData.sizesAccepted.includes(size)
                      ? 'bg-[var(--petmatch-primary)] text-white border-[var(--petmatch-primary)]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[var(--petmatch-primary)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Disponibilidade</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              placeholder="Ex: Segunda a Sexta, 8h às 18h"
              className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="emergency"
              checked={formData.emergency}
              onChange={(e) => setFormData({...formData, emergency: e.target.checked})}
              className="w-5 h-5 text-[var(--petmatch-primary)]"
            />
            <label htmlFor="emergency" className="text-sm font-medium cursor-pointer">
              Aceito emergências
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Observações e regras da casa
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({...formData, observations: e.target.value})}
              placeholder="Ex: Tenho outro pet, quintal telado, aceito pets idosos..."
              className="w-full px-4 py-2 border border-[var(--petmatch-border)] rounded-lg h-24 resize-none"
            />
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-semibold text-[var(--petmatch-text)] mb-3">
            Fotos do Local *
          </h2>
          <PhotoGalleryUpload
            photos={photos}
            onPhotosChange={setPhotos}
            maxPhotos={10}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-[var(--petmatch-primary)] text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Enviar para Análise
        </button>
      </form>
    </div>
  );
}
