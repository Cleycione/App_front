import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Post } from '../PostCard';
import { postsApi, uploadsApi } from '../../api/endpoints';

interface OwnerClaimScreenProps {
  post: Post;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function OwnerClaimScreen({ post, onBack, onNavigate }: OwnerClaimScreenProps) {
  const [formData, setFormData] = useState({
    petName: '',
    characteristics: '',
    lastSeen: '',
    proof: null as string | null,
    proofFile: null as File | null,
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, proof: reader.result as string, proofFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      let proofPhotoUrl: string | undefined;
      if (formData.proofFile) {
        const upload = await uploadsApi.upload(formData.proofFile);
        proofPhotoUrl = upload.url;
      }
      await postsApi.createClaim(post.id, {
        animalName: formData.petName,
        specificCharacteristics: formData.characteristics,
        lastSeenInfo: formData.lastSeen,
        proofPhotoUrl,
        additionalInfo: formData.additionalInfo || undefined,
      });
      setSubmitted(true);
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Falha ao enviar solicitação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--app-gray-50)] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          
          <h1 className="mb-4 text-[var(--app-gray-900)]">
            Solicitação Enviada!
          </h1>
          
          <p className="text-[var(--app-gray-600)] mb-8 leading-relaxed">
            Sua solicitação foi enviada ao cuidador temporário. Ele entrará em contato com você em breve para confirmar a identidade do animal.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
            <h3 className="flex items-center gap-2 mb-2 text-blue-900">
              <AlertCircle size={20} />
              <span>Próximos passos</span>
            </h3>
            <ol className="text-sm text-blue-800 space-y-2 ml-7">
              <li>1. O cuidador revisará suas informações</li>
              <li>2. Você receberá uma notificação quando houver uma resposta</li>
              <li>3. Combine um local seguro para o reencontro</li>
              <li>4. Lembre-se de levar documentos e fotos do animal</li>
            </ol>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => onNavigate('home')}
            >
              Voltar para Início
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => onNavigate('notifications')}
            >
              Ver Notificações
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--app-gray-700)] hover:text-[var(--app-gray-900)]"
        >
          <ArrowLeft size={24} />
          <span>Voltar</span>
        </button>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-[var(--app-gray-900)]">
            Comprove que é o dono
          </h1>
          <p className="text-[var(--app-gray-600)]">
            Preencha as informações abaixo para solicitar a reunião com seu animal
          </p>
        </div>

        {/* Post Preview */}
        <div className="bg-white rounded-2xl border-2 border-[var(--app-gray-200)] overflow-hidden mb-8">
          <img
            src={post.imageUrl}
            alt="Animal"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-[var(--app-gray-900)] mb-1">
              {post.animal.species} • {post.animal.size} • {post.animal.color}
            </p>
            <p className="text-sm text-[var(--app-gray-600)]">
              📍 {post.location}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="flex items-center gap-2 mb-2 text-amber-900">
              <AlertCircle size={20} />
              <span>Importante</span>
            </h3>
            <p className="text-sm text-amber-800">
              Forneça informações precisas que só o verdadeiro dono saberia. Isso ajuda a garantir que o animal seja devolvido à pessoa certa.
            </p>
          </div>

          <Input
            label="Nome do animal *"
            placeholder="Como você chama seu animal?"
            value={formData.petName}
            onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
            helperText="O nome que ele responde"
            required
          />

          <Textarea
            label="Características específicas *"
            placeholder="Descreva características únicas que só você saberia..."
            value={formData.characteristics}
            onChange={(e) => setFormData(prev => ({ ...prev, characteristics: e.target.value }))}
            helperText="Ex: manchas específicas, comportamentos, comandos que obedece, cicatrizes, etc."
            rows={4}
            required
          />

          <Input
            label="Quando e onde viu por último? *"
            placeholder="Ex: Dia 20/12, no parque da rua X"
            value={formData.lastSeen}
            onChange={(e) => setFormData(prev => ({ ...prev, lastSeen: e.target.value }))}
            required
          />

          {/* Photo Upload */}
          <div>
            <label className="block mb-2 text-[var(--app-gray-700)]">
              Foto do animal (opcional)
            </label>
            <p className="text-sm text-[var(--app-gray-600)] mb-3">
              Envie uma foto antiga do seu animal para comprovar a propriedade
            </p>
            
            {formData.proof ? (
              <div className="relative">
                <img
                  src={formData.proof}
                  alt="Comprovante"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, proof: null }))}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[var(--app-gray-700)] px-4 py-2 rounded-xl hover:bg-white"
                >
                  Remover
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[var(--app-gray-400)] rounded-xl cursor-pointer hover:border-[var(--app-primary)] hover:bg-[var(--app-primary-light)] transition-all">
                <Upload size={32} className="text-[var(--app-gray-400)] mb-2" />
                <span className="text-sm text-[var(--app-gray-600)]">Escolher foto</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            )}
          </div>

          <Textarea
            label="Informações adicionais"
            placeholder="Alguma informação extra que possa ajudar..."
            value={formData.additionalInfo}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
            rows={3}
          />

          {errorMessage && (
            <p className="text-sm text-[var(--app-danger)]">{errorMessage}</p>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Dica:</strong> Quanto mais detalhes específicos você fornecer, mais rápido será o processo de verificação.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!formData.petName || !formData.characteristics || !formData.lastSeen || isSubmitting}
          >
            <CheckCircle size={20} />
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
          </Button>
        </form>
      </div>
    </div>
  );
}
