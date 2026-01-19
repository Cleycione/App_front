import React, { useState } from 'react';
import { ArrowLeft, Camera, Check, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface CreateDonationScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function CreateDonationScreen({ onBack, onNavigate }: CreateDonationScreenProps) {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    size: '',
    ageRange: '',
    dewormed: false,
    neutered: false,
    vaccinated: false,
    hasPreexistingCondition: false,
    conditionDetails: '',
    observations: '',
    temperament: '',
    goodWithKids: false,
    goodWithPets: false,
    showPhone: true,
  });

  const handlePhotoUpload = () => {
    const mockPhotos = [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
    ];
    setPhotos([...photos, mockPhotos[photos.length % mockPhotos.length]]);
  };

  const handlePublish = () => {
    onNavigate('donation-published');
  };

  const totalSteps = 4;

  // Step 1: Photos
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
        <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
          <button
            onClick={onBack}
            className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[var(--app-gray-900)] mb-1">
            Cadastrar Pet para Doação
          </h1>
          <p className="text-sm text-[var(--app-gray-600)]">
            Passo 1 de {totalSteps}: Fotos
          </p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-6">
            <h2 className="text-[var(--app-gray-900)] mb-4">
              Adicione fotos do pet
            </h2>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={photo}
                    alt={`Pet foto ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}

              {photos.length < 5 && (
                <button
                  onClick={handlePhotoUpload}
                  className="aspect-square border-2 border-dashed border-[var(--app-gray-300)] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[var(--app-primary)] hover:bg-blue-50 transition-colors"
                >
                  <Camera size={24} className="text-[var(--app-gray-400)]" />
                  <span className="text-xs text-[var(--app-gray-500)]">Adicionar</span>
                </button>
              )}
            </div>

            <p className="text-xs text-[var(--app-gray-500)]">
              Adicione de 1 a 5 fotos (recomendado: pelo menos 2 fotos)
            </p>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Info size={20} className="text-[var(--app-primary)] flex-shrink-0" />
              <p className="text-sm text-[var(--app-gray-700)]">
                Use fotos claras e recentes do pet. Mostre diferentes ângulos para ajudar
                futuros adotantes a conhecê-lo melhor.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep(2)}
            disabled={photos.length === 0}
          >
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Pet Info
  if (step === 2) {
    return (
      <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
        <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
          <button
            onClick={() => setStep(1)}
            className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[var(--app-gray-900)] mb-1">
            Cadastrar Pet para Doação
          </h1>
          <p className="text-sm text-[var(--app-gray-600)]">
            Passo 2 de {totalSteps}: Informações do pet
          </p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-[var(--app-gray-900)]">
              Dados do pet
            </h2>

            <Input
              label="Nome do pet *"
              placeholder="Ex: Thor"
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm text-[var(--app-gray-700)] mb-2">
                Espécie *
              </label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[var(--app-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)] focus:border-transparent"
                required
              >
                <option value="">Selecione</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[var(--app-gray-700)] mb-2">
                Porte *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Pequeno', 'Médio', 'Grande'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFormData({ ...formData, size })}
                    className={`py-2 rounded-xl text-sm transition-colors ${
                      formData.size === size
                        ? 'bg-[var(--app-primary)] text-white'
                        : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--app-gray-700)] mb-2">
                Faixa de idade *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Filhote', 'Adulto', 'Idoso'].map((age) => (
                  <button
                    key={age}
                    onClick={() => setFormData({ ...formData, ageRange: age })}
                    className={`py-2 rounded-xl text-sm transition-colors ${
                      formData.ageRange === age
                        ? 'bg-[var(--app-primary)] text-white'
                        : 'bg-[var(--app-gray-100)] text-[var(--app-gray-700)] hover:bg-[var(--app-gray-200)]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep(3)}
            disabled={!formData.petName || !formData.species || !formData.size || !formData.ageRange}
          >
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Health
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
        <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
          <button
            onClick={() => setStep(2)}
            className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[var(--app-gray-900)] mb-1">
            Cadastrar Pet para Doação
          </h1>
          <p className="text-sm text-[var(--app-gray-600)]">
            Passo 3 de {totalSteps}: Saúde e temperamento
          </p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-[var(--app-gray-900)]">
              Saúde do pet
            </h2>

            {[
              { key: 'vaccinated', label: 'Vacinado' },
              { key: 'neutered', label: 'Castrado' },
              { key: 'dewormed', label: 'Vermifugado' },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[item.key as keyof typeof formData] as boolean}
                  onChange={(e) =>
                    setFormData({ ...formData, [item.key]: e.target.checked })
                  }
                  className="w-5 h-5 text-[var(--app-primary)] rounded"
                />
                <span className="text-[var(--app-gray-700)]">{item.label}</span>
              </label>
            ))}

            <div className="pt-4 border-t border-[var(--app-gray-200)]">
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={formData.hasPreexistingCondition}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasPreexistingCondition: e.target.checked,
                      conditionDetails: e.target.checked ? formData.conditionDetails : '',
                    })
                  }
                  className="w-5 h-5 text-[var(--app-primary)] rounded"
                />
                <span className="text-[var(--app-gray-700)]">Possui doença preexistente</span>
              </label>

              {formData.hasPreexistingCondition && (
                <Input
                  label="Qual doença?"
                  placeholder="Descreva a condição de saúde..."
                  value={formData.conditionDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, conditionDetails: e.target.value })
                  }
                  required={formData.hasPreexistingCondition}
                />
              )}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-[var(--app-gray-900)]">
              Temperamento
            </h2>

            <Input
              label="Como é o temperamento?"
              placeholder="Ex: Dócil, brincalhão, energético..."
              value={formData.temperament}
              onChange={(e) => setFormData({ ...formData, temperament: e.target.value })}
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.goodWithKids}
                onChange={(e) => setFormData({ ...formData, goodWithKids: e.target.checked })}
                className="w-5 h-5 text-[var(--app-primary)] rounded"
              />
              <span className="text-[var(--app-gray-700)]">Convive bem com crianças</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.goodWithPets}
                onChange={(e) => setFormData({ ...formData, goodWithPets: e.target.checked })}
                className="w-5 h-5 text-[var(--app-primary)] rounded"
              />
              <span className="text-[var(--app-gray-700)]">Convive bem com outros pets</span>
            </label>

            <Textarea
              label="Observações adicionais (opcional)"
              placeholder="Informações importantes para o futuro adotante..."
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              rows={4}
            />
          </Card>

          <Button variant="primary" size="lg" fullWidth onClick={() => setStep(4)}>
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  // Step 4: Review & Publish
  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={() => setStep(3)}
          className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[var(--app-gray-900)] mb-1">
          Cadastrar Pet para Doação
        </h1>
        <p className="text-sm text-[var(--app-gray-600)]">
          Passo 4 de {totalSteps}: Revisar e publicar
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Card className="p-6 space-y-6">
          <h2 className="text-[var(--app-gray-900)]">
            Revise as informações
          </h2>

          {/* Photos */}
          <div>
            <h3 className="text-sm text-[var(--app-gray-500)] mb-3">Fotos</h3>
            <div className="flex gap-2 overflow-x-auto">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Pet ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Pet Info */}
          <div>
            <h3 className="text-sm text-[var(--app-gray-500)] mb-3">Informações do pet</h3>
            <div className="space-y-2 text-sm">
              <p className="text-[var(--app-gray-900)]">
                <strong>Nome:</strong> {formData.petName}
              </p>
              <p className="text-[var(--app-gray-900)]">
                <strong>Espécie:</strong> {formData.species}
              </p>
              <p className="text-[var(--app-gray-900)]">
                <strong>Porte:</strong> {formData.size}
              </p>
              <p className="text-[var(--app-gray-900)]">
                <strong>Idade:</strong> {formData.ageRange}
              </p>
            </div>
          </div>

          {/* Health */}
          <div>
            <h3 className="text-sm text-[var(--app-gray-500)] mb-3">Saúde</h3>
            <div className="flex flex-wrap gap-2">
              {formData.vaccinated && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  ✓ Vacinado
                </span>
              )}
              {formData.neutered && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  ✓ Castrado
                </span>
              )}
              {formData.dewormed && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  ✓ Vermifugado
                </span>
              )}
            </div>
          </div>

          {/* Donor Settings */}
          <div>
            <h3 className="text-sm text-[var(--app-gray-500)] mb-3">Privacidade</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showPhone}
                onChange={(e) => setFormData({ ...formData, showPhone: e.target.checked })}
                className="w-5 h-5 text-[var(--app-primary)] rounded"
              />
              <span className="text-[var(--app-gray-700)]">Exibir meu telefone publicamente</span>
            </label>
          </div>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-[var(--app-primary)] mb-2">
            O que acontece ao publicar?
          </h3>
          <ul className="space-y-2 text-sm text-[var(--app-gray-700)]">
            <li>✓ Doação visível na lista pública</li>
            <li>✓ Notificação enviada para a comunidade</li>
            <li>✓ Interessados poderão entrar em contato</li>
            <li>✓ Você pode pausar/encerrar a qualquer momento</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button variant="primary" size="lg" fullWidth onClick={handlePublish}>
            <Check size={20} />
            Publicar doação
          </Button>
          <Button variant="outline" size="lg" fullWidth onClick={() => setStep(3)}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
