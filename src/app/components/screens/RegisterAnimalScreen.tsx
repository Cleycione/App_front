import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, MapPin, Navigation, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { postsApi, uploadsApi } from '../../api/endpoints';

interface RegisterAnimalScreenProps {
  onNavigate: (screen: string) => void;
}

export function RegisterAnimalScreen({ onNavigate }: RegisterAnimalScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    photo: null as string | null,
    photoFile: null as File | null,
    location: 'Jardim Paulista, São Paulo - SP',
    locationDetails: '',
    occurrenceType: 'found' as 'found' | 'lost',
    species: 'dog',
    size: 'medium',
    color: '',
    characteristics: '',
    hasCollar: '',
    isInjured: '',
    injuryDetails: '',
    contactAddress: '',
    contactPhone: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string, photoFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.photoFile) return;
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const locationParts = formData.location.split('-');
      const state = locationParts.length > 1 ? locationParts[1].trim() : '';
      const cityNeighborhood = locationParts[0].split(',');
      const neighborhood = cityNeighborhood[0]?.trim() ?? '';
      const city = cityNeighborhood[1]?.trim() ?? '';

      if (!neighborhood || !city || !state) {
        setErrorMessage('Informe o bairro, cidade e estado no formato "Bairro, Cidade - UF".');
        setIsSubmitting(false);
        return;
      }

      const upload = await uploadsApi.upload(formData.photoFile);
      const speciesMap: Record<string, string> = {
        dog: 'Cachorro',
        cat: 'Gato',
        other: 'Outro',
      };
      const sizeMap: Record<string, string> = {
        small: 'Pequeno',
        medium: 'Médio',
        large: 'Grande',
      };

      await postsApi.create({
        status: formData.occurrenceType === 'lost' ? 'LOST' : 'FOUND',
        photos: [upload.url],
        neighborhood,
        city,
        state,
        latitude: -23.5615,
        longitude: -46.6559,
        occurredAt: new Date().toISOString(),
        species: speciesMap[formData.species] ?? formData.species,
        size: sizeMap[formData.size] ?? formData.size,
        color: formData.color,
        characteristics: formData.characteristics,
        observations: formData.additionalInfo,
        hasCollar: formData.hasCollar === 'yes',
        injured: formData.isInjured === 'yes',
        injuryDetails: formData.injuryDetails,
        contactAddress: formData.contactAddress,
        contactPhone: formData.contactPhone,
        occurrenceType: formData.occurrenceType === 'lost' ? 'LOST' : 'FOUND',
      });

      alert('Animal registrado com sucesso!');
      onNavigate('home');
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Falha ao registrar animal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Foto' },
    { number: 2, title: 'Local' },
    { number: 3, title: 'Informações' },
    { number: 4, title: 'Revisão' },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-[var(--app-gray-700)] hover:text-[var(--app-gray-900)]"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-[var(--app-gray-900)]">
            Registrar Animal
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.number
                      ? 'bg-[var(--app-primary)] text-white'
                      : 'bg-[var(--app-gray-300)] text-[var(--app-gray-600)]'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span className={`text-xs ${currentStep >= step.number ? 'text-[var(--app-primary)]' : 'text-[var(--app-gray-500)]'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 rounded ${currentStep > step.number ? 'bg-[var(--app-primary)]' : 'bg-[var(--app-gray-300)]'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        {/* Step 1: Photo */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="mb-2 text-[var(--app-gray-900)]">
                Adicione uma foto
              </h2>
              <p className="text-[var(--app-gray-600)]">
                Foto nítida do rosto e do corpo do animal
              </p>
            </div>

            <div className="space-y-4">
              {formData.photo ? (
                <div className="relative">
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, photo: null }))}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[var(--app-gray-700)] px-4 py-2 rounded-xl hover:bg-white"
                  >
                    Trocar foto
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--app-gray-400)] rounded-2xl cursor-pointer hover:border-[var(--app-primary)] hover:bg-[var(--app-primary-light)] transition-all">
                    <Camera size={48} className="text-[var(--app-gray-400)] mb-4" />
                    <span className="text-[var(--app-gray-600)]">Tirar foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>

                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--app-gray-400)] rounded-2xl cursor-pointer hover:border-[var(--app-primary)] hover:bg-[var(--app-primary-light)] transition-all">
                    <Upload size={32} className="text-[var(--app-gray-400)] mb-2" />
                    <span className="text-[var(--app-gray-600)]">Escolher da galeria</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setCurrentStep(2)}
              disabled={!formData.photo}
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="mb-2 text-[var(--app-gray-900)]">
                Onde você viu o animal?
              </h2>
              <p className="text-[var(--app-gray-600)]">
                Marque o local mais próximo possível
              </p>
            </div>

            {/* Mock Map */}
            <div className="relative w-full h-80 bg-gradient-to-br from-[var(--app-gray-200)] to-[var(--app-gray-300)] rounded-2xl overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full h-px bg-[var(--app-gray-400)]" style={{ top: `${i * 12.5}%` }} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-px bg-[var(--app-gray-400)]" style={{ left: `${i * 12.5}%` }} />
                ))}
              </div>

              {/* Pin in center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-lg">
                  <path
                    d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z"
                    fill="var(--app-primary)"
                  />
                  <circle cx="20" cy="20" r="8" fill="white" />
                </svg>
              </div>

              <button
                onClick={() => alert('Ajustando localização...')}
                className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-[var(--app-gray-100)]"
              >
                <Navigation size={24} className="text-[var(--app-primary)]" />
              </button>
            </div>

            <div className="bg-[var(--app-primary-light)] border border-[var(--app-primary)] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--app-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm mb-1 text-[var(--app-gray-900)]">Local detectado:</p>
                  <p className="text-[var(--app-gray-700)]">{formData.location}</p>
                </div>
              </div>
            </div>

            <Input
              label="Complemento do local (opcional)"
              placeholder="Ex: Próximo ao parque, Rua sem saída..."
              value={formData.locationDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, locationDetails: e.target.value }))}
              helperText="Dica: quanto mais detalhes, mais fácil para os donos localizarem"
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setCurrentStep(1)}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setCurrentStep(3)}
              >
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="mb-2 text-[var(--app-gray-900)]">
                Informações do animal
              </h2>
              <p className="text-[var(--app-gray-600)]">
                Nos ajude a identificar o animal
              </p>
            </div>

            {/* Occurrence Type */}
            <div>
              <label className="block mb-3 text-[var(--app-gray-700)]">
                Tipo de ocorrência *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, occurrenceType: 'found' }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.occurrenceType === 'found'
                      ? 'border-[var(--app-primary)] bg-[var(--app-primary-light)]'
                      : 'border-[var(--app-gray-300)] hover:border-[var(--app-gray-400)]'
                  }`}
                >
                  <CheckCircle
                    size={24}
                    className={formData.occurrenceType === 'found' ? 'text-[var(--app-primary)] mx-auto mb-2' : 'text-[var(--app-gray-400)] mx-auto mb-2'}
                  />
                  <span className="block text-sm">Encontrei</span>
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, occurrenceType: 'lost' }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.occurrenceType === 'lost'
                      ? 'border-[var(--app-danger)] bg-red-50'
                      : 'border-[var(--app-gray-300)] hover:border-[var(--app-gray-400)]'
                  }`}
                >
                  <AlertCircle
                    size={24}
                    className={formData.occurrenceType === 'lost' ? 'text-[var(--app-danger)] mx-auto mb-2' : 'text-[var(--app-gray-400)] mx-auto mb-2'}
                  />
                  <span className="block text-sm">Perdi</span>
                </button>
              </div>
            </div>

            {/* Species */}
            <div>
              <label className="block mb-2 text-[var(--app-gray-700)]">
                Espécie *
              </label>
              <select
                value={formData.species}
                onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--app-gray-300)] focus:border-[var(--app-primary)] focus:ring-2 focus:ring-[var(--app-primary)]/20 outline-none"
              >
                <option value="dog">Cão</option>
                <option value="cat">Gato</option>
                <option value="other">Outro</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block mb-2 text-[var(--app-gray-700)]">
                Porte *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setFormData(prev => ({ ...prev, size }))}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      formData.size === size
                        ? 'border-[var(--app-primary)] bg-[var(--app-primary-light)] text-[var(--app-primary)]'
                        : 'border-[var(--app-gray-300)] text-[var(--app-gray-700)] hover:border-[var(--app-gray-400)]'
                    }`}
                  >
                    {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Cor predominante *"
              placeholder="Ex: Preto, Branco, Marrom..."
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              required
            />

            <Textarea
              label="Características"
              placeholder="Descreva características marcantes: manchas, pelagem, orelhas..."
              value={formData.characteristics}
              onChange={(e) => setFormData(prev => ({ ...prev, characteristics: e.target.value }))}
              rows={3}
            />

            {/* Collar */}
            <div>
              <label className="block mb-2 text-[var(--app-gray-700)]">
                Está com coleira?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['yes', 'no'].map(option => (
                  <button
                    key={option}
                    onClick={() => setFormData(prev => ({ ...prev, hasCollar: option }))}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      formData.hasCollar === option
                        ? 'border-[var(--app-primary)] bg-[var(--app-primary-light)] text-[var(--app-primary)]'
                        : 'border-[var(--app-gray-300)] text-[var(--app-gray-700)] hover:border-[var(--app-gray-400)]'
                    }`}
                  >
                    {option === 'yes' ? 'Sim' : 'Não'}
                  </button>
                ))}
              </div>
            </div>

            {/* Injured */}
            <div>
              <label className="block mb-2 text-[var(--app-gray-700)]">
                Está ferido?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['yes', 'no'].map(option => (
                  <button
                    key={option}
                    onClick={() => setFormData(prev => ({ ...prev, isInjured: option }))}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      formData.isInjured === option
                        ? 'border-[var(--app-primary)] bg-[var(--app-primary-light)] text-[var(--app-primary)]'
                        : 'border-[var(--app-gray-300)] text-[var(--app-gray-700)] hover:border-[var(--app-gray-400)]'
                    }`}
                  >
                    {option === 'yes' ? 'Sim' : 'Não'}
                  </button>
                ))}
              </div>
            </div>

            {formData.isInjured === 'yes' && (
              <Textarea
                label="Observações sobre ferimentos"
                placeholder="Descreva os ferimentos..."
                value={formData.injuryDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, injuryDetails: e.target.value }))}
                rows={3}
              />
            )}

            <Input
              label="Endereço de contato *"
              placeholder="Seu endereço ou local de referência"
              value={formData.contactAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, contactAddress: e.target.value }))}
              required
            />

            <Input
              label="Telefone de contato *"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.contactPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
              required
            />

            <Textarea
              label="Informações adicionais"
              placeholder="Alguma informação que possa ajudar..."
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              rows={3}
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setCurrentStep(2)}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setCurrentStep(4)}
                disabled={!formData.color || !formData.contactAddress || !formData.contactPhone}
              >
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="mb-2 text-[var(--app-gray-900)]">
                Revisar informações
              </h2>
              <p className="text-[var(--app-gray-600)]">
                Confira se está tudo correto antes de publicar
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[var(--app-gray-200)] overflow-hidden">
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Animal"
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Tipo</h3>
                  <p className="text-[var(--app-gray-900)]">
                    {formData.occurrenceType === 'found' ? 'Animal Encontrado' : 'Animal Perdido'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Animal</h3>
                  <p className="text-[var(--app-gray-900)]">
                    {formData.species === 'dog' ? 'Cão' : formData.species === 'cat' ? 'Gato' : 'Outro'} •{' '}
                    {formData.size === 'small' ? 'Pequeno' : formData.size === 'medium' ? 'Médio' : 'Grande'} •{' '}
                    {formData.color}
                  </p>
                </div>

                {formData.characteristics && (
                  <div>
                    <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Características</h3>
                    <p className="text-[var(--app-gray-900)]">{formData.characteristics}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Local</h3>
                  <p className="text-[var(--app-gray-900)]">
                    {formData.location}
                    {formData.locationDetails && ` - ${formData.locationDetails}`}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Contato</h3>
                  <p className="text-[var(--app-gray-900)]">
                    {formData.contactPhone}
                  </p>
                  <p className="text-[var(--app-gray-700)] text-sm mt-1">
                    {formData.contactAddress}
                  </p>
                </div>

                {formData.additionalInfo && (
                  <div>
                    <h3 className="text-sm text-[var(--app-gray-500)] mb-1">Informações adicionais</h3>
                    <p className="text-[var(--app-gray-900)]">{formData.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setCurrentStep(3)}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <CheckCircle size={20} />
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </Button>
              {errorMessage && (
                <p className="text-sm text-[var(--app-danger)] mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
