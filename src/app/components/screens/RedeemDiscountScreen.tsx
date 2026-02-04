import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, Store, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PatinhaCoin } from '../ui/PatinhaCoin';
import { CouponCard } from '../ui/CouponCard';
import { partnersApi, walletApi } from '../../api/endpoints';
import { toUiPartner } from '../../api/mappers';

interface RedeemDiscountScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function RedeemDiscountScreen({ onBack, onNavigate }: RedeemDiscountScreenProps) {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [couponGenerated, setCouponGenerated] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState<any>(null);
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [wallet, partnerResponse] = await Promise.all([
          walletApi.getWallet(),
          partnersApi.list({ page: 0, size: 50 }),
        ]);
        setCurrentBalance(wallet.balance);
        setPartners(partnerResponse.content.map(toUiPartner));
      } catch {
        setPartners([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateCoupon = async () => {
    if (!selectedPartner) return;

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    try {
      const coupon = await walletApi.createCoupon({
        partnerName: selectedPartner.name,
        discount: '10%',
        validUntil: validUntil.toISOString(),
      });
      setGeneratedCoupon({
        code: coupon.code,
        partnerName: coupon.partnerName,
        discount: coupon.discount,
        validUntil: new Date(coupon.validUntil).toLocaleDateString('pt-BR'),
      });
      setCouponGenerated(true);
      setCurrentBalance((prev) => Math.max(0, prev - 1));
    } catch {
      alert('Não foi possível gerar o cupom.');
    }
  };

  if (couponGenerated && generatedCoupon) {
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
            Cupom Gerado!
          </h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Success Message */}
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-[var(--app-gray-900)] mb-2">
              Cupom gerado com sucesso!
            </h2>
            <p className="text-[var(--app-gray-600)]">
              Seu saldo foi reduzido em 1 Patinha
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[var(--app-gray-100)] px-4 py-2 rounded-full">
              <span className="text-[var(--app-gray-600)]">Novo saldo:</span>
              <PatinhaCoin count={currentBalance - 1} size="sm" showLabel={false} />
              <span className="font-semibold text-[var(--app-gray-900)]">
                {currentBalance - 1}
              </span>
            </div>
          </div>

          {/* Coupon */}
          <CouponCard
            code={generatedCoupon.code}
            partnerName={generatedCoupon.partnerName}
            discount={generatedCoupon.discount}
            validUntil={generatedCoupon.validUntil}
            onUse={() => {
              alert('Cupom marcado como usado!');
              onBack();
            }}
          />

          {/* Info */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <p className="text-sm text-[var(--app-gray-700)]">
              <strong>Observação:</strong> O uso do cupom está sujeito à disponibilidade do
              parceiro. Apresente este cupom na loja ou use o código no checkout online.
            </p>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="outline" size="lg" fullWidth onClick={() => alert('Cupom compartilhado!')}>
              Compartilhar cupom
            </Button>
            <Button variant="secondary" size="lg" fullWidth onClick={onBack}>
              Voltar para carteira
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPartner) {
    return (
      <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
        {/* Header */}
        <div className="bg-white border-b border-[var(--app-gray-200)] px-4 py-4 sticky top-0 z-10">
          <button
            onClick={() => setSelectedPartner(null)}
            className="mb-2 p-2 hover:bg-[var(--app-gray-100)] rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[var(--app-gray-900)]">
            Confirmar resgate
          </h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Partner Info */}
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--app-gray-100)]">
                <img
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-[var(--app-gray-900)] mb-2">
                  {selectedPartner.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-[var(--app-gray-600)]">
                  <MapPin size={16} />
                  <span>{selectedPartner.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--app-gray-50)] rounded-xl p-4 space-y-3">
              <h3 className="text-[var(--app-gray-900)]">
                Detalhes do desconto
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[var(--app-gray-600)]">Desconto</span>
                <span className="text-2xl text-[var(--app-primary)]">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--app-gray-600)]">Custo</span>
                <PatinhaCoin count={1} size="sm" />
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--app-gray-200)]">
                <span className="text-[var(--app-gray-600)]">Saldo atual</span>
                <PatinhaCoin count={currentBalance} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--app-gray-600)]">Saldo após resgate</span>
                <PatinhaCoin count={currentBalance - 1} size="sm" />
              </div>
            </div>
          </Card>

          {/* Rules */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="text-[var(--app-primary)] mb-3">
              Regras de uso
            </h3>
            <ul className="space-y-2 text-sm text-[var(--app-gray-700)]">
              <li>• Válido por 30 dias após geração</li>
              <li>• Um cupom por compra</li>
              <li>• Não acumulável com outras promoções</li>
              <li>• Sujeito à disponibilidade do parceiro</li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleGenerateCoupon}
              disabled={currentBalance < 1}
            >
              Gerar cupom
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setSelectedPartner(null)}
            >
              Escolher outro parceiro
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-[var(--app-gray-900)] mb-4">
          Resgatar desconto
        </h1>

        {/* Balance */}
        <div className="flex items-center justify-between bg-[var(--app-gray-50)] rounded-xl p-3">
          <span className="text-[var(--app-gray-600)]">Saldo disponível</span>
          <PatinhaCoin count={currentBalance} size="sm" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--app-gray-400)]" size={20} />
          <input
            type="text"
            placeholder="Buscar parceiro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--app-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--app-primary)] focus:border-transparent"
          />
        </div>

        {/* Partners List */}
        <div>
          <h2 className="text-[var(--app-gray-900)] mb-4">
            Selecione um parceiro
          </h2>

          <div className="space-y-3">
            {isLoading ? (
              <Card className="p-4 text-center">
                <p className="text-sm text-[var(--app-gray-500)]">Carregando parceiros...</p>
              </Card>
            ) : filteredPartners.map((partner) => (
              <Card
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--app-gray-100)]">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[var(--app-gray-900)] mb-1">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--app-gray-600)] mb-2">
                      <Store size={14} />
                      <span className="truncate">{partner.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--app-gray-600)]">
                      <MapPin size={14} />
                      <span className="truncate">{partner.location}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl text-[var(--app-primary)] mb-1">10%</p>
                    <p className="text-xs text-[var(--app-gray-500)]">desconto</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
