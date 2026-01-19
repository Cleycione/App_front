import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Calendar, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface ReportLostPetScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

const mockPets = [
  {
    id: '1',
    name: 'Thor',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Gata',
    breed: 'Siamês',
    photo: 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5d0?w=400',
  },
];

export function ReportLostPetScreen({ onBack, onNavigate }: ReportLostPetScreenProps) {
  const [step, setStep] = useState(1);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [photo, setPhoto] = useState<string>('');
  const [location, setLocation] = useState({
    address: '',
    reference: '',
    date: '',
    time: '',
  });

  const handlePhotoUpload = () => {
    setPhoto('https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400');
  };

  const handleUseCurrentLocation = () => {
    setLocation({
      ...location,
      address: 'Rua das Flores, 123 - Jardim Paulista, São Paulo - SP',
    });
  };

  const handlePublish = () => {
    onNavigate('lost-pet-alert', { pet: selectedPet, location });
  };

  // Step 1: Select Pet
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
            Perdi meu pet
          </h1>
          <p className="text-sm text-[var(--app-gray-600)]">
            Passo 1 de 4: Selecione o pet
          </p>
        </div>

        <div className="px-4 py-6 space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm text-[var(--app-gray-700)]">
              Vamos te ajudar a encontrar seu pet! Selecione o pet perdido ou cadastre um novo.
            </p>
          </div>

          <h2 className="text-[var(--app-gray-900)]">
            Meus pets cadastrados
          </h2>

          <div className="space-y-3">
            {mockPets.map((pet) => (
              <Card
                key={pet.id}
                onClick={() => {
                  setSelectedPet(pet);
                  setPhoto(pet.photo);
                  setStep(2);
                }}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--app-gray-100)]">
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--app-gray-900)] mb-1">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-[var(--app-gray-600)]">
                      {pet.species} • {pet.breed}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => onNavigate('pet-registration')}
          >
            Cadastrar novo pet
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Photo
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
            Perdi meu pet
          </h1>
          <p className="text-sm text-[var(--app-gray-600)]">
            Passo 2 de 4: Foto principal
          </p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-6">
            <h2 className="text-[var(--app-gray-900)] mb-4">
              Foto principal do pet
            </h2>

            {photo ? (
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={photo}
                    alt="Pet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" size="md" fullWidth onClick={handlePhotoUpload}>
                  Trocar foto
                </Button>
              </div>
            ) : (
              <button
                onClick={handlePhotoUpload}
                className="w-full aspect-square border-2 border-dashed border-[var(--app-gray-300)] rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[var(--app-primary)] hover:bg-blue-50 transition-colors"
              >
                <Camera size={48} className="text-[var(--app-gray-400)]" />
                <p className="text-[var(--app-gray-600)]">Adicionar foto</p>
              </button>
            )}

            <p className="text-xs text-[var(--app-gray-500)] mt-4">
              Use a foto mais recente e clara do seu pet
            </p>
          </Card>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep(3)}
            disabled={!photo}
          >
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Location
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
            Perdi meu pet
          </h1>
          <p className="text-sm text-[var(--app-gray-600)]">
            Passo 3 de 4: Última localização
          </p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-[var(--app-gray-900)]">
              Onde foi visto pela última vez?
            </h2>

            {/* Map Placeholder */}
            <div className="w-full h-48 bg-[var(--app-gray-200)] rounded-xl flex items-center justify-center relative overflow-hidden">
              <MapPin size={48} className="text-[var(--app-gray-400)]" />
              {location.address && (
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-3">
                  <p className="text-sm text-[var(--app-gray-700)]">{location.address}</p>
                </div>
              )}
            </div>

            <Button variant="outline" size="md" fullWidth onClick={handleUseCurrentLocation}>
              <MapPin size={18} />
              Usar minha localização atual
            </Button>

            <Input
              label="Endereço / Local de referência"
              placeholder="Ex: Rua das Flores, Jardim Paulista"
              value={location.reference}
              onChange={(e) => setLocation({ ...location, reference: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data"
                type="date"
                value={location.date}
                onChange={(e) => setLocation({ ...location, date: e.target.value })}
              />
              <Input
                label="Hora aproximada"
                type="time"
                value={location.time}
                onChange={(e) => setLocation({ ...location, time: e.target.value })}
              />
            </div>
          </Card>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep(4)}
            disabled={!location.date || !location.time}
          >
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  // Step 4: Review
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
          Perdi meu pet
        </h1>
        <p className="text-sm text-[var(--app-gray-600)]">
          Passo 4 de 4: Revisar e publicar
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Card className="p-6 space-y-6">
          <h2 className="text-[var(--app-gray-900)]">
            Revise as informações
          </h2>

          {/* Pet Info */}
          <div>
            <h3 className="text-sm text-[var(--app-gray-500)] mb-3">Pet perdido</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={photo} alt={selectedPet?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[var(--app-gray-900)] mb-1">
                  {selectedPet?.name}
                </p>
                <p className="text-sm text-[var(--app-gray-600)]">
                  {selectedPet?.species} • {selectedPet?.breed}
                </p>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div>
            <h3 className="text-sm text-[var(--app-gray-500)] mb-3">Última vez visto</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[var(--app-gray-500)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--app-gray-700)]">
                  {location.address || location.reference}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={16} className="text-[var(--app-gray-500)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--app-gray-700)]">
                  {new Date(location.date).toLocaleDateString('pt-BR')} às {location.time}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-[var(--app-primary)] mb-2">
            O que acontece ao publicar?
          </h3>
          <ul className="space-y-2 text-sm text-[var(--app-gray-700)]">
            <li>✓ Post criado automaticamente no feed</li>
            <li>✓ Pin adicionado no mapa</li>
            <li>✓ Alerta enviado para a comunidade</li>
            <li>✓ Notificações de possíveis matches</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button variant="primary" size="lg" fullWidth onClick={handlePublish}>
            <Check size={20} />
            Publicar alerta
          </Button>
          <Button variant="outline" size="lg" fullWidth onClick={() => setStep(3)}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
