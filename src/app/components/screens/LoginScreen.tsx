import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CaptchaCard } from '../CaptchaCard';
import { authApi, usersApi } from '../../api/endpoints';
import { userStore } from '../../api/userStore';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getDeviceId = () => {
    const key = 'petmatch_device_id';
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const newId = crypto.randomUUID();
    localStorage.setItem(key, newId);
    return newId;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Verificar CAPTCHA
    if (!isCaptchaVerified) {
      setShowCaptchaError(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const deviceId = getDeviceId();
      await authApi.login({
        login: email,
        password,
        deviceId,
        trusted: trustDevice,
      });

      try {
        const me = await usersApi.getMe();
        userStore.set(me);
      } catch {
        // Falha ao buscar perfil não deve bloquear o login.
      }

      if (trustDevice) {
        localStorage.setItem('petmatch_trusted_device', 'true');
        try {
          await usersApi.addTrustedDevice({ deviceId, trusted: true });
        } catch {
          // Backend pode não ter implementado ainda.
        }
      }

      onNavigate('home');
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Falha ao entrar. Verifique seus dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaVerify = (verified: boolean) => {
    setIsCaptchaVerified(verified);
    if (verified) {
      setShowCaptchaError(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4">
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
            Bem-vindo de volta
          </h1>
          <p className="mb-8 text-[var(--app-gray-600)]">
            Entre para continuar ajudando nossa comunidade
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              label="E-mail ou telefone"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              required
            />

            <Input
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              required
            />

            <button
              type="button"
              className="text-[var(--app-primary)] hover:text-[var(--app-primary-dark)] text-sm"
            >
              Esqueci minha senha
            </button>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <CaptchaCard onVerify={handleCaptchaVerify} error={showCaptchaError} />
            </div>

            {errorMessage && (
              <div className="text-sm text-[var(--app-danger)]">
                {errorMessage}
              </div>
            )}

            {/* Checkbox confiar neste dispositivo */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trustDevice}
                  onChange={(e) => setTrustDevice(e.target.checked)}
                  className="mt-1 w-5 h-5 text-[var(--app-primary)] border-[var(--app-gray-300)] rounded focus:ring-[var(--app-primary)]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[var(--app-primary)]" />
                    <span className="text-sm font-semibold text-[var(--app-gray-900)]">
                      Confiar neste dispositivo
                    </span>
                  </div>
                  <p className="text-xs text-[var(--app-gray-600)] mt-1">
                    Ao ativar, este dispositivo poderá acessar sua conta sem revalidar o login em próximos acessos. Não use em dispositivos públicos.
                  </p>
                </div>
              </label>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
              disabled={!isCaptchaVerified || isSubmitting}
              className={!isCaptchaVerified || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-center">
              <span className="text-[var(--app-gray-600)]">Não tem uma conta? </span>
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-[var(--app-primary)] hover:text-[var(--app-primary-dark)]"
              >
                Criar conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
