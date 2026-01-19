import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, CreditCard, Briefcase, Phone, Mail, Lock, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SignupScreenProps {
  onNavigate: (screen: string) => void;
}

export function SignupScreen({ onNavigate }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cpf: '',
    profession: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;
    return true; // Simplified validation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.address) newErrors.address = 'Endereço é obrigatório';
    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }
    if (!formData.profession) newErrors.profession = 'Profissão é obrigatória';
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    if (!formData.acceptTerms) {
      newErrors.terms = 'Você deve aceitar os termos';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock signup - navigate to home
    onNavigate('home');
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2 text-[var(--app-gray-700)] hover:text-[var(--app-gray-900)]"
        >
          <ArrowLeft size={24} />
          <span>Voltar</span>
        </button>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="mb-2 text-[var(--app-gray-900)]">
            Criar nova conta
          </h1>
          <p className="mb-8 text-[var(--app-gray-600)]">
            Junte-se à nossa comunidade e ajude animais a voltarem para casa
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nome completo *"
              placeholder="João da Silva"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              icon={<User size={20} />}
              error={errors.name}
              required
            />

            <Input
              label="Endereço *"
              placeholder="Rua, número, bairro"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              icon={<MapPin size={20} />}
              error={errors.address}
              required
            />

            <Input
              label="CPF *"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              icon={<CreditCard size={20} />}
              error={errors.cpf}
              required
            />

            <Input
              label="Profissão *"
              placeholder="Ex: Veterinário, Professor, etc."
              value={formData.profession}
              onChange={(e) => handleChange('profession', e.target.value)}
              icon={<Briefcase size={20} />}
              error={errors.profession}
              required
            />

            <Input
              label="Telefone *"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              icon={<Phone size={20} />}
              error={errors.phone}
              required
            />

            <Input
              label="E-mail *"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              icon={<Mail size={20} />}
              error={errors.email}
              required
            />

            <Input
              label="Senha *"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              icon={<Lock size={20} />}
              error={errors.password}
              helperText="Mínimo 6 caracteres"
              required
            />

            <Input
              label="Confirmar senha *"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              icon={<Lock size={20} />}
              error={errors.confirmPassword}
              required
            />

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-[var(--app-gray-300)] text-[var(--app-primary)] focus:ring-2 focus:ring-[var(--app-primary)]/20"
              />
              <label htmlFor="terms" className="text-sm text-[var(--app-gray-600)]">
                Aceito os termos de uso e política de privacidade
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-[var(--app-danger)]">{errors.terms}</p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth>
              <CheckCircle size={20} />
              Criar conta
            </Button>

            <div className="text-center">
              <span className="text-[var(--app-gray-600)]">Já tem uma conta? </span>
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-[var(--app-primary)] hover:text-[var(--app-primary-dark)]"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}