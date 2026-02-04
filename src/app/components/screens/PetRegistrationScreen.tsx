import React, { useRef, useState } from 'react';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { petsApi, uploadsApi } from '../../api/endpoints';

interface PetRegistrationScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function PetRegistrationScreen({ onBack, onNavigate }: PetRegistrationScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    size: '',
    color: '',
    age: '',
    characteristics: '',
    hasCollar: 'no',
    hasMicrochip: 'no',
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.species || !formData.size || !formData.color) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const uploads = await Promise.all(photoFiles.map((file) => uploadsApi.upload(file)));
      const uploadedUrls = uploads.map((u) => u.url);
      await petsApi.create({
        name: formData.name,
        species: formData.species,
        breed: formData.breed || undefined,
        size: formData.size,
        color: formData.color,
        age: formData.age || undefined,
        photoUrl: uploadedUrls[0],
      });
      alert('Pet cadastrado com sucesso!');
      onBack();
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Falha ao cadastrar pet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPhotos((prev) => [...prev, previewUrl]);
    setPhotoFiles((prev) => [...prev, file]);
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[var(--app-gray-900)]">
          Cadastrar Pet
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Photos */}
        <div>
          <label className="block text-sm text-[var(--app-gray-700)] mb-3">
            Fotos do pet <span className="text-[var(--app-gray-500)]">(opcional, mas recomendado)</span>
          </label>
          
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`Pet foto ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            
            {photos.length < 5 && (
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="aspect-square border-2 border-dashed border-[var(--app-gray-300)] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[var(--app-primary)] hover:bg-blue-50 transition-colors"
              >
                <Camera size={24} className="text-[var(--app-gray-400)]" />
                <span className="text-xs text-[var(--app-gray-500)]">Adicionar</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-xs text-[var(--app-gray-500)] mt-2">
            Você pode adicionar até 5 fotos
          </p>
        </div>

        {/* Basic Info */}
        <Card className="p-6 space-y-4">
          <h2 className="text-[var(--app-gray-900)]">
            Informações Básicas
          </h2>

          <Input
            label="Nome do pet *"
            placeholder="Ex: Thor"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
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
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[var(--app-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)] focus:border-transparent"
                required
              >
                <option value="">Selecione</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          <Input
            label="Raça"
            placeholder="Ex: Golden Retriever (opcional)"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          />

          <Input
            label="Cor *"
            placeholder="Ex: Dourado, Preto e branco"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />

          <Input
            label="Idade aproximada"
            placeholder="Ex: 3 anos (opcional)"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </Card>

        {/* Characteristics */}
        <Card className="p-6 space-y-4">
          <h2 className="text-[var(--app-gray-900)]">
            Características Marcantes
          </h2>

          <Textarea
            label="Descreva características únicas"
            placeholder="Ex: Mancha branca no peito, orelha rasgada, muito brincalhão..."
            value={formData.characteristics}
            onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
            rows={4}
          />
        </Card>

        {/* Identification */}
        <Card className="p-6 space-y-4">
          <h2 className="text-[var(--app-gray-900)]">
            Identificação
          </h2>

          <div>
            <label className="block text-sm text-[var(--app-gray-700)] mb-3">
              Possui coleira?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasCollar"
                  value="yes"
                  checked={formData.hasCollar === 'yes'}
                  onChange={(e) => setFormData({ ...formData, hasCollar: e.target.value })}
                  className="w-4 h-4 text-[var(--app-primary)]"
                />
                <span className="text-[var(--app-gray-700)]">Sim</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasCollar"
                  value="no"
                  checked={formData.hasCollar === 'no'}
                  onChange={(e) => setFormData({ ...formData, hasCollar: e.target.value })}
                  className="w-4 h-4 text-[var(--app-primary)]"
                />
                <span className="text-[var(--app-gray-700)]">Não</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[var(--app-gray-700)] mb-3">
              Possui microchip?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasMicrochip"
                  value="yes"
                  checked={formData.hasMicrochip === 'yes'}
                  onChange={(e) => setFormData({ ...formData, hasMicrochip: e.target.value })}
                  className="w-4 h-4 text-[var(--app-primary)]"
                />
                <span className="text-[var(--app-gray-700)]">Sim</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasMicrochip"
                  value="no"
                  checked={formData.hasMicrochip === 'no'}
                  onChange={(e) => setFormData({ ...formData, hasMicrochip: e.target.value })}
                  className="w-4 h-4 text-[var(--app-primary)]"
                />
                <span className="text-[var(--app-gray-700)]">Não</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            <Check size={20} />
            {isSubmitting ? 'Salvando...' : 'Salvar pet'}
          </Button>
          <Button type="button" variant="outline" size="lg" fullWidth onClick={onBack}>
            Cancelar
          </Button>
          {errorMessage && (
            <p className="text-sm text-[var(--app-danger)]">{errorMessage}</p>
          )}
        </div>

        {/* Required Fields Notice */}
        <p className="text-xs text-center text-[var(--app-gray-500)]">
          * Campos obrigatórios
        </p>
      </form>
    </div>
  );
}
