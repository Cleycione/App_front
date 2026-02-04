import React, { useEffect, useState } from 'react';
import { User, MapPin, CreditCard, Briefcase, Phone, Mail, Edit, LogOut, PawPrint, Gift, Sparkles, Heart, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { PostCard } from '../PostCard';
import { PatinhaCoin } from '../ui/PatinhaCoin';
import { authApi, donationsApi, postsApi, usersApi, walletApi, petsApi } from '../../api/endpoints';
import { toUiPost } from '../../api/mappers';
import { userStore } from '../../api/userStore';

interface ProfileScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [user, setUser] = useState<any>(() => userStore.get());
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [patinhasBalance, setPatinhasBalance] = useState(0);
  const [myPetsCount, setMyPetsCount] = useState(0);
  const [myDonationsCount, setMyDonationsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draft, setDraft] = useState({
    name: '',
    address: '',
    profession: '',
    phone: '',
    email: '',
  });
  const careAnimals = userPosts.slice(2, 3);

  useEffect(() => {
    if (!user) return;
    setDraft({
      name: user.name ?? '',
      address: user.address ?? '',
      profession: user.profession ?? '',
      phone: user.phone ?? '',
      email: user.email ?? '',
    });
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const me = await usersApi.getMe();
        setUser(me);
        userStore.set(me);
      } catch (error: any) {
        if (error?.status === 401) {
          if (!user) {
            setErrorMessage('Sua sessão expirou. Faça login novamente.');
          }
          setIsLoading(false);
          return;
        }
        setErrorMessage(error?.message ?? 'Falha ao carregar seu perfil.');
        setIsLoading(false);
        return;
      }

      try {
        const [posts, wallet, pets, donations] = await Promise.allSettled([
          postsApi.list(
            { page: 0, size: 5, radiusKm: 5, lat: -23.5615, lng: -46.6559 },
            { auth: true, skipRefresh: true },
          ),
          walletApi.getWallet(),
          petsApi.list(),
          donationsApi.list({ page: 0, size: 10 }),
        ]);

        if (posts.status === 'fulfilled') {
          setUserPosts(posts.value.content.map(toUiPost));
        }
        if (wallet.status === 'fulfilled') {
          setPatinhasBalance(wallet.value.balance);
        }
        if (pets.status === 'fulfilled') {
          setMyPetsCount(pets.value.totalElements);
        }
        if (donations.status === 'fulfilled') {
          setMyDonationsCount(donations.value.totalElements);
        }
      } catch {
        // Ignore secondary errors to keep profile visible.
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  const handleStartEdit = () => {
    if (!user) return;
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (user) {
      setDraft({
        name: user.name ?? '',
        address: user.address ?? '',
        profession: user.profession ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
      });
    }
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!user) return;
    setIsSaving(true);
    setErrorMessage('');
    try {
      const payload = {
        name: draft.name.trim(),
        address: draft.address.trim() || undefined,
        profession: draft.profession.trim() || undefined,
        phone: draft.phone.trim() || undefined,
        email: draft.email.trim() || undefined,
      };
      await usersApi.updateMe(payload);
      const nextUser = { ...user, ...payload };
      setUser(nextUser);
      userStore.set(nextUser);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Falha ao salvar suas informações.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-[var(--app-primary)]" />
            </div>
            <div>
              <h1 className="mb-1">{user?.name ?? 'Usuário'}</h1>
              <p className="text-white/90">
                {user?.createdAt ? `Membro desde ${new Date(user.createdAt).getFullYear()}` : 'Membro'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-2xl mb-1">5</p>
              <p className="text-sm text-white/90">Posts</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-2xl mb-1">3</p>
              <p className="text-sm text-white/90">Ajudou</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-2xl mb-1">2</p>
              <p className="text-sm text-white/90">Reunidos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {(isLoading || errorMessage) && (
          <Card className="p-4">
            {isLoading && (
              <p className="text-sm text-[var(--app-gray-600)]">Carregando perfil...</p>
            )}
            {!isLoading && errorMessage && (
              <p className="text-sm text-[var(--app-danger)]">{errorMessage}</p>
            )}
          </Card>
        )}
        {/* Patinhas Card */}
        <Card 
          onClick={() => onNavigate('patinhas-wallet')}
          className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[var(--app-gray-900)]">
                  Minhas Patinhas
                </h2>
                <p className="text-sm text-[var(--app-gray-600)]">
                  Sistema de recompensas
                </p>
              </div>
            </div>
            <PatinhaCoin count={patinhasBalance} size="md" showLabel={false} />
          </div>
          
          <p className="text-sm text-[var(--app-gray-700)] mb-4">
            Cada pet devolvido ao dono = +1 patinha. Use para ganhar descontos em parceiros!
          </p>

          <Button variant="primary" size="sm" fullWidth onClick={(e) => {
            e.stopPropagation();
            onNavigate('redeem-discount');
          }}>
            <Gift size={16} />
            Resgatar desconto
          </Button>
        </Card>

        {/* My Pets Card */}
        <Card 
          onClick={() => onNavigate('my-pets')}
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <PawPrint size={24} className="text-[var(--app-primary)]" />
              </div>
              <div>
                <h2 className="text-[var(--app-gray-900)]">
                  Meus Pets
                </h2>
                <p className="text-sm text-[var(--app-gray-600)]">
                  {myPetsCount} pet{myPetsCount !== 1 ? 's' : ''} cadastrado{myPetsCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-[var(--app-primary)]">{myPetsCount}</p>
            </div>
          </div>
          
          <p className="text-sm text-[var(--app-gray-700)]">
            Gerencie os pets cadastrados e registre se algum se perder
          </p>
        </Card>

        {/* My Donations Card */}
        <Card 
          onClick={() => onNavigate('my-donations')}
          className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[var(--app-gray-900)]">
                  Minhas Doações
                </h2>
                <p className="text-sm text-[var(--app-gray-600)]">
                  {myDonationsCount} doaç{myDonationsCount !== 1 ? 'ões' : 'ão'} ativa{myDonationsCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-pink-500">{myDonationsCount}</p>
            </div>
          </div>
          
          <p className="text-sm text-[var(--app-gray-700)]">
            Ajude a encontrar um lar para pets que precisam
          </p>
        </Card>

        {/* Personal Info */}
        <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--app-gray-900)]">
            Informações Pessoais
          </h2>
          <button
            className="text-[var(--app-primary)] hover:text-[var(--app-primary-dark)] disabled:opacity-40"
            onClick={handleStartEdit}
            disabled={!user || isEditing}
          >
            <Edit size={20} />
          </button>
        </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Nome completo"
                value={draft.name}
                onChange={(e) => setDraft(prev => ({ ...prev, name: e.target.value }))}
                disabled={isSaving}
              />
              <Input
                label="Endereço"
                value={draft.address}
                onChange={(e) => setDraft(prev => ({ ...prev, address: e.target.value }))}
                disabled={isSaving}
              />
              <Input
                label="CPF"
                value={user?.cpf ?? ''}
                disabled
              />
              <Input
                label="Profissão"
                value={draft.profession}
                onChange={(e) => setDraft(prev => ({ ...prev, profession: e.target.value }))}
                disabled={isSaving}
              />
              <Input
                label="Telefone"
                value={draft.phone}
                onChange={(e) => setDraft(prev => ({ ...prev, phone: e.target.value }))}
                disabled={isSaving}
              />
              <Input
                label="E-mail"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft(prev => ({ ...prev, email: e.target.value }))}
                disabled={isSaving}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={isSaving || !draft.name.trim()}
                >
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User size={20} className="text-[var(--app-gray-500)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--app-gray-500)]">Nome completo</p>
                  <p className="text-[var(--app-gray-900)]">{user?.name ?? '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--app-gray-500)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--app-gray-500)]">Endereço</p>
                  <p className="text-[var(--app-gray-900)]">{user?.address ?? '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard size={20} className="text-[var(--app-gray-500)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--app-gray-500)]">CPF</p>
                  <p className="text-[var(--app-gray-900)]">{user?.cpf ?? '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase size={20} className="text-[var(--app-gray-500)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--app-gray-500)]">Profissão</p>
                  <p className="text-[var(--app-gray-900)]">{user?.profession ?? '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[var(--app-gray-500)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--app-gray-500)]">Telefone</p>
                  <p className="text-[var(--app-gray-900)]">{user?.phone ?? '—'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[var(--app-gray-500)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--app-gray-500)]">E-mail</p>
                  <p className="text-[var(--app-gray-900)]">{user?.email ?? '—'}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* My Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[var(--app-gray-900)]">
              Meus Posts
            </h2>
            <span className="text-sm text-[var(--app-gray-500)]">
              {userPosts.length} total
            </span>
          </div>
          
          <div className="space-y-3">
            {userPosts.length === 0 ? (
              <Card className="p-8 text-center">
                <PawPrint size={48} className="text-[var(--app-gray-300)] mx-auto mb-4" />
                <p className="text-[var(--app-gray-500)]">
                  Você ainda não tem posts
                </p>
                <Button
                  variant="primary"
                  size="md"
                  className="mt-4"
                  onClick={() => onNavigate('register')}
                >
                  Criar primeiro post
                </Button>
              </Card>
            ) : (
              userPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onViewDetails={() => onNavigate('post-details', { post })}
                  onShare={() => onNavigate('share', { post })}
                  onContact={() => alert('Este é o seu post')}
                  compact
                />
              ))
            )}
          </div>
        </div>

        {/* Animals Under Care */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[var(--app-gray-900)]">
              Animais Sob Meus Cuidados
            </h2>
            <span className="text-sm text-[var(--app-gray-500)]">
              {careAnimals.length} total
            </span>
          </div>
          
          <div className="space-y-3">
            {careAnimals.length === 0 ? (
              <Card className="p-8 text-center">
                <PawPrint size={48} className="text-[var(--app-gray-300)] mx-auto mb-4" />
                <p className="text-[var(--app-gray-500)]">
                  Nenhum animal sob seus cuidados no momento
                </p>
              </Card>
            ) : (
              careAnimals.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onViewDetails={() => onNavigate('post-details', { post })}
                  onShare={() => onNavigate('share', { post })}
                  onContact={() => alert('Recurso em desenvolvimento')}
                  compact
                />
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => onNavigate('settings')}
          >
            <Settings size={20} />
            Configurações
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleStartEdit}
            disabled={!user || isEditing}
          >
            <Edit size={20} />
            Editar Perfil
          </Button>

          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={() => {
              if (confirm('Tem certeza que deseja sair?')) {
                authApi.logout();
                userStore.set(null);
                onNavigate('welcome');
              }
            }}
          >
            <LogOut size={20} />
            Sair
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-[var(--app-gray-500)] pt-4">
          <p>PetMatch v1.0</p>
          <p className="mt-1">Conectando pets aos seus donos desde 2024 🐾</p>
        </div>
      </div>
    </div>
  );
}
