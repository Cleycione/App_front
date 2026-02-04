import React, { useEffect, useState } from 'react';
import { ArrowLeft, Camera, Plus, Trash2, Upload, FileText, Shield, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { petsApi } from '../../api/endpoints';

interface PetHealthCardScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  pet: {
    id: string;
    name: string;
    species: string;
    breed: string;
    color: string;
    sex?: string;
    photo?: string;
  };
}

interface Vaccine {
  id: string;
  name: string;
  appliedDate: string;
  nextDose?: string;
  notes?: string;
  proofUploaded: boolean;
}

interface Disease {
  id: string;
  name: string;
  inTreatment: boolean;
  medication?: string;
  startDate?: string;
}

export function PetHealthCardScreen({ onBack, onNavigate, pet }: PetHealthCardScreenProps) {
  const [birthDate, setBirthDate] = useState('');
  const [isEstimatedDate, setIsEstimatedDate] = useState(false);
  const [isCastrated, setIsCastrated] = useState(false);
  const [hasMicrochip, setHasMicrochip] = useState(false);
  const [microchipCode, setMicrochipCode] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  const [diseases, setDiseases] = useState<Disease[]>([]);

  const [showAddVaccine, setShowAddVaccine] = useState(false);
  const [showAddDisease, setShowAddDisease] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const availableVaccines = [
    'Raiva',
    'V8 (Cães)',
    'V10 (Cães)',
    'V3 (Gatos)',
    'V4 (Gatos)',
    'V5 (Gatos)',
    'Cinomose',
    'Parvovirose',
    'Leptospirose',
    'Gripe Canina',
    'Giárdia',
  ];

  useEffect(() => {
    const fetchHealthCard = async () => {
      setIsLoading(true);
      try {
        const healthCard = await petsApi.getHealthCard(pet.id);
        setBirthDate(healthCard.birthDate ?? '');
        setIsEstimatedDate(healthCard.isEstimatedDate);
        setIsCastrated(healthCard.isCastrated);
        setHasMicrochip(healthCard.hasMicrochip);
        setMicrochipCode(healthCard.microchipCode ?? '');
        setAddress(healthCard.address ?? '');
        setVaccines(
          (healthCard.vaccines ?? []).map((v, index) => ({
            id: `${index}-${v.name}`,
            name: v.name,
            appliedDate: v.appliedDate ?? '',
            nextDose: v.nextDose ?? '',
            notes: v.notes ?? '',
            proofUploaded: !!v.proofUploaded,
          })),
        );
        setDiseases(
          (healthCard.conditions ?? []).map((d, index) => ({
            id: `${index}-${d.name}`,
            name: d.name,
            inTreatment: d.inTreatment,
            medication: d.medication ?? '',
            startDate: d.startDate ?? '',
          })),
        );
      } catch {
        // Keep defaults if backend not ready
      } finally {
        setIsLoading(false);
      }
    };
    fetchHealthCard();
  }, [pet.id]);

  const handleSave = async () => {
    await petsApi.putHealthCard(pet.id, {
      birthDate: birthDate || undefined,
      isEstimatedDate,
      isCastrated,
      hasMicrochip,
      microchipCode: microchipCode || undefined,
      address,
      vaccines: vaccines.map((v) => ({
        name: v.name,
        appliedDate: v.appliedDate || undefined,
        nextDose: v.nextDose || undefined,
        notes: v.notes || undefined,
        proofUploaded: v.proofUploaded,
      })),
      conditions: diseases.map((d) => ({
        name: d.name,
        inTreatment: d.inTreatment,
        medication: d.medication || undefined,
        startDate: d.startDate || undefined,
      })),
    });
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const addVaccine = (vaccineName: string) => {
    const newVaccine: Vaccine = {
      id: Date.now().toString(),
      name: vaccineName,
      appliedDate: '',
      proofUploaded: false,
    };
    setVaccines([...vaccines, newVaccine]);
    setShowAddVaccine(false);
  };

  const removeVaccine = (id: string) => {
    setVaccines(vaccines.filter(v => v.id !== id));
  };

  const addDisease = () => {
    const newDisease: Disease = {
      id: Date.now().toString(),
      name: '',
      inTreatment: false,
    };
    setDiseases([...diseases, newDisease]);
  };

  const removeDisease = (id: string) => {
    setDiseases(diseases.filter(d => d.id !== id));
  };

  const updateDisease = (id: string, field: keyof Disease, value: any) => {
    setDiseases(diseases.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-[var(--app-primary)] text-white px-4 py-6 sticky top-0 z-10 shadow-lg">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex items-center gap-4">
          <Shield size={32} />
          <div>
            <h1 className="mb-1">Carteira de Saúde</h1>
            <p className="text-white/90">{pet.name}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSaveSuccess && (
        <div className="mx-4 mt-4">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-600" />
              <p className="text-green-800 font-medium">Carteira de Saúde salva com sucesso!</p>
            </div>
          </Card>
        </div>
      )}

      <div className="px-4 py-6 space-y-6">
        {/* Seção 1: Dados do Pet */}
        <Card className="p-4">
          <h3 className="text-[var(--app-gray-900)] mb-4 flex items-center gap-2">
            <FileText size={20} className="text-[var(--app-primary)]" />
            Dados do Animal
          </h3>

          <div className="space-y-4">
            {/* Foto do Pet */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--app-gray-100)] flex-shrink-0">
                {pet.photo ? (
                  <ImageWithFallback
                    src={pet.photo}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    🐾
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Camera size={16} />
                Alterar foto
              </Button>
            </div>

            {/* Nome e Dados Básicos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--app-gray-600)] mb-1">Nome</label>
                <input
                  type="text"
                  value={pet.name}
                  disabled
                  className="w-full px-3 py-2 bg-[var(--app-gray-100)] text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--app-gray-600)] mb-1">Espécie</label>
                <input
                  type="text"
                  value={pet.species}
                  disabled
                  className="w-full px-3 py-2 bg-[var(--app-gray-100)] text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--app-gray-600)] mb-1">Raça</label>
                <input
                  type="text"
                  value={pet.breed}
                  disabled
                  className="w-full px-3 py-2 bg-[var(--app-gray-100)] text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--app-gray-600)] mb-1">Cor</label>
                <input
                  type="text"
                  value={pet.color}
                  disabled
                  className="w-full px-3 py-2 bg-[var(--app-gray-100)] text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
            </div>

            {/* Data de Nascimento */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-[var(--app-gray-600)]">Data de Nascimento</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEstimatedDate}
                    onChange={(e) => setIsEstimatedDate(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs text-[var(--app-gray-600)]">Data estimada</span>
                </label>
              </div>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--app-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)]"
              />
              {isEstimatedDate && (
                <p className="text-xs text-[var(--app-gray-500)] mt-1">
                  ℹ️ Data aproximada baseada em avaliação
                </p>
              )}
            </div>

            {/* Castrado */}
            <div className="flex items-center justify-between p-3 bg-[var(--app-gray-50)] rounded-lg">
              <div>
                <p className="text-[var(--app-gray-900)] font-medium">Castrado</p>
                <p className="text-xs text-[var(--app-gray-600)]">Animal foi castrado?</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCastrated}
                  onChange={(e) => setIsCastrated(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--app-gray-300)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--app-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--app-primary)]"></div>
              </label>
            </div>

            {/* Microchip */}
            <div className="border border-[var(--app-gray-200)] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-[var(--app-gray-900)] font-medium">Microchip</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Recomendado</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMicrochip}
                    onChange={(e) => setHasMicrochip(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[var(--app-gray-300)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--app-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--app-primary)]"></div>
                </label>
              </div>
              {hasMicrochip && (
                <input
                  type="text"
                  value={microchipCode}
                  onChange={(e) => setMicrochipCode(e.target.value)}
                  placeholder="Código do microchip (15 dígitos)"
                  className="w-full px-3 py-2 border border-[var(--app-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)]"
                  maxLength={15}
                />
              )}
              <p className="text-xs text-[var(--app-gray-500)] mt-2">
                ℹ️ O microchip facilita a identificação e recuperação do pet em caso de perda
              </p>
            </div>
          </div>
        </Card>

        {/* Seção 2: Vacinas */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--app-gray-900)] flex items-center gap-2">
              <Shield size={20} className="text-green-600" />
              Vacinas Aplicadas
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddVaccine(!showAddVaccine)}
            >
              <Plus size={16} />
              Adicionar
            </Button>
          </div>

          {showAddVaccine && (
            <Card className="p-3 bg-blue-50 border-blue-200 mb-4">
              <p className="text-sm text-[var(--app-gray-700)] mb-3 font-medium">Selecione a vacina:</p>
              <div className="grid grid-cols-2 gap-2">
                {availableVaccines.map((vac) => (
                  <button
                    key={vac}
                    onClick={() => addVaccine(vac)}
                    className="px-3 py-2 bg-white border border-[var(--app-gray-200)] rounded-lg text-sm text-[var(--app-gray-900)] hover:bg-[var(--app-primary)] hover:text-white transition-colors"
                  >
                    {vac}
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setShowAddVaccine(false)}
                className="mt-3"
              >
                Cancelar
              </Button>
            </Card>
          )}

          {vaccines.length === 0 ? (
            <div className="text-center py-8">
              <Shield size={40} className="text-[var(--app-gray-300)] mx-auto mb-3" />
              <p className="text-[var(--app-gray-500)]">Nenhuma vacina registrada</p>
            </div>
          ) : (
            <div className="space-y-3">
              {vaccines.map((vaccine) => (
                <VaccineCard
                  key={vaccine.id}
                  vaccine={vaccine}
                  onRemove={() => removeVaccine(vaccine.id)}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Seção 3: Doenças/Tratamentos */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[var(--app-gray-900)] flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-600" />
              Doenças / Tratamentos
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addDisease}
            >
              <Plus size={16} />
              Adicionar
            </Button>
          </div>

          {diseases.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <p className="text-[var(--app-gray-500)]">Nenhuma condição registrada</p>
              <p className="text-xs text-[var(--app-gray-400)] mt-1">Pet está saudável! 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              {diseases.map((disease) => (
                <DiseaseCard
                  key={disease.id}
                  disease={disease}
                  onUpdate={updateDisease}
                  onRemove={() => removeDisease(disease.id)}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Seção 4: Local do Animal */}
        <Card className="p-4 border-2 border-[var(--app-primary)]">
          <h3 className="text-[var(--app-gray-900)] mb-3 flex items-center gap-2">
            <Shield size={20} className="text-[var(--app-primary)]" />
            Local onde o animal é mantido
          </h3>
          
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Endereço residencial completo"
            rows={3}
            className="w-full px-3 py-2 border border-[var(--app-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)]"
          />

          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 flex items-start gap-2">
              <Shield size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                <strong>Privacidade:</strong> Este dado não é publicado e fica visível apenas para você. 
                Usado para referência do tutor.
              </span>
            </p>
          </div>
        </Card>

        {/* Seção 5: Dados do Tutor */}
        <Card className="p-4 bg-[var(--app-gray-50)]">
          <h3 className="text-[var(--app-gray-900)] mb-3 flex items-center gap-2">
            <FileText size={20} className="text-[var(--app-gray-600)]" />
            Dados do Tutor (Somente leitura)
          </h3>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[var(--app-gray-600)] mb-1">Nome</label>
                <input
                  type="text"
                  value="João Silva"
                  disabled
                  className="w-full px-3 py-2 bg-white text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--app-gray-600)] mb-1">Telefone</label>
                <input
                  type="text"
                  value="(11) 98765-4321"
                  disabled
                  className="w-full px-3 py-2 bg-white text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[var(--app-gray-600)] mb-1">E-mail</label>
              <input
                type="text"
                value="joao.silva@email.com"
                disabled
                className="w-full px-3 py-2 bg-white text-[var(--app-gray-900)] rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[var(--app-gray-600)] mb-1">CPF</label>
                <input
                  type="text"
                  value="***.***.***-**"
                  disabled
                  className="w-full px-3 py-2 bg-white text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--app-gray-600)] mb-1">Profissão</label>
                <input
                  type="text"
                  value="Engenheiro"
                  disabled
                  className="w-full px-3 py-2 bg-white text-[var(--app-gray-900)] rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 flex items-start gap-2">
              <Shield size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                <strong>LGPD:</strong> Dados do tutor são privados e não são exibidos publicamente. 
                Usados apenas para controle interno da carteira de saúde.
              </span>
            </p>
          </div>
        </Card>

        {/* Ações */}
        <div className="space-y-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleSave}
          >
            <CheckCircle size={20} />
            Salvar Carteira de Saúde
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            disabled
          >
            <Upload size={20} />
            Exportar/Compartilhar (em breve)
          </Button>
        </div>

        {/* Info LGPD */}
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm text-green-800">
            <strong>✓ Segurança:</strong> Todas as informações da Carteira de Saúde são privadas 
            e criptografadas. Apenas você tem acesso aos dados do seu pet.
          </p>
        </Card>
      </div>
    </div>
  );
}

// Componente de Card de Vacina
function VaccineCard({ vaccine, onRemove }: { vaccine: Vaccine; onRemove: () => void }) {
  return (
    <div className="border border-[var(--app-gray-200)] rounded-lg p-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-[var(--app-gray-900)] font-medium">{vaccine.name}</h4>
          {vaccine.notes && (
            <p className="text-xs text-[var(--app-gray-600)] mt-1">{vaccine.notes}</p>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="block text-xs text-[var(--app-gray-600)] mb-1">Data de aplicação</label>
          <input
            type="date"
            value={vaccine.appliedDate}
            className="w-full px-2 py-1 text-sm border border-[var(--app-gray-200)] rounded"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--app-gray-600)] mb-1">Próxima dose</label>
          <input
            type="date"
            value={vaccine.nextDose || ''}
            className="w-full px-2 py-1 text-sm border border-[var(--app-gray-200)] rounded"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-2 bg-[var(--app-gray-50)] rounded">
        <div className="flex items-center gap-2">
          <Upload size={16} className="text-[var(--app-gray-500)]" />
          <span className="text-xs text-[var(--app-gray-700)]">
            {vaccine.proofUploaded ? 'Comprovante anexado' : 'Sem comprovante'}
          </span>
        </div>
        {vaccine.proofUploaded ? (
          <CheckCircle size={16} className="text-green-600" />
        ) : (
          <Button variant="ghost" size="sm">
            <Upload size={14} />
            Upload
          </Button>
        )}
      </div>
    </div>
  );
}

// Componente de Card de Doença
function DiseaseCard({ 
  disease, 
  onUpdate, 
  onRemove 
}: { 
  disease: Disease; 
  onUpdate: (id: string, field: keyof Disease, value: any) => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-[var(--app-gray-200)] rounded-lg p-3">
      <div className="flex items-start justify-between mb-3">
        <input
          type="text"
          value={disease.name}
          onChange={(e) => onUpdate(disease.id, 'name', e.target.value)}
          placeholder="Nome da doença/condição"
          className="flex-1 px-3 py-2 border border-[var(--app-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)]"
        />
        <button
          onClick={onRemove}
          className="ml-2 text-red-500 hover:text-red-700 p-2"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center justify-between p-2 bg-[var(--app-gray-50)] rounded-lg mb-3">
        <span className="text-sm text-[var(--app-gray-700)]">Em tratamento?</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={disease.inTreatment}
            onChange={(e) => onUpdate(disease.id, 'inTreatment', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[var(--app-gray-300)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--app-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
        </label>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-xs text-[var(--app-gray-600)] mb-1">Medicação/Observações</label>
          <textarea
            value={disease.medication || ''}
            onChange={(e) => onUpdate(disease.id, 'medication', e.target.value)}
            placeholder="Descreva o tratamento, medicamentos, etc."
            rows={2}
            className="w-full px-3 py-2 text-sm border border-[var(--app-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)]"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--app-gray-600)] mb-1">Data de início</label>
          <input
            type="date"
            value={disease.startDate || ''}
            onChange={(e) => onUpdate(disease.id, 'startDate', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-[var(--app-gray-200)] rounded"
          />
        </div>
      </div>
    </div>
  );
}
