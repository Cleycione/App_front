import React, { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Gift, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PatinhaCoin } from '../ui/PatinhaCoin';
import { walletApi } from '../../api/endpoints';
import { toUiTransaction } from '../../api/mappers';

interface PatinhasWalletScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Transaction {
  id: string;
  type: 'earn' | 'redeem';
  description: string;
  amount: number;
  date: string;
  caseId?: string;
  partnerName?: string;
}

export function PatinhasWalletScreen({ onBack, onNavigate }: PatinhasWalletScreenProps) {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalRedeemed, setTotalRedeemed] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      setIsLoading(true);
      try {
        const [wallet, transactionResponse] = await Promise.all([
          walletApi.getWallet(),
          walletApi.listTransactions({ page: 0, size: 50 }),
        ]);
        setCurrentBalance(wallet.balance);
        setTotalEarned(wallet.totalEarned);
        setTotalRedeemed(wallet.totalRedeemed);
        setTransactions(transactionResponse.content.map(toUiTransaction));
      } catch {
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--app-gray-50)] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white px-4 py-6">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="mb-6">Minhas Patinhas</h1>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
          <p className="text-white/90 mb-3">Saldo disponível</p>
          <div className="flex items-center justify-center mb-4">
            <PatinhaCoin count={currentBalance} size="lg" showLabel={false} />
            <span className="ml-3 text-4xl">{currentBalance}</span>
          </div>
          <p className="text-white/90 text-sm">
            {currentBalance === 1 ? 'Patinha' : 'Patinhas'} disponível{currentBalance !== 1 ? 's' : ''} para usar
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{totalEarned}</p>
            <p className="text-sm text-white/90">Ganhas</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl mb-1">{totalRedeemed}</p>
            <p className="text-sm text-white/90">Usadas</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Info Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Info size={24} className="text-[var(--app-primary)] flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-[var(--app-primary)] mb-2">
                Como funcionam as Patinhas?
              </h3>
              <ul className="space-y-2 text-sm text-[var(--app-gray-700)]">
                <li>• Cada pet devolvido ao dono = <strong>+1 Patinha 🐾</strong></li>
                <li>• Cada Patinha dá <strong>10% de desconto</strong> em compras/serviços</li>
                <li>• Use em parceiros cadastrados no app</li>
                <li>• Sujeito à disponibilidade do parceiro</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* CTA */}
        {currentBalance > 0 && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onNavigate('redeem-discount')}
          >
            <Gift size={20} />
            Resgatar desconto
          </Button>
        )}

        {/* Transactions History */}
        <div>
          <h2 className="text-[var(--app-gray-900)] mb-4">
            Histórico
          </h2>

          <div className="space-y-3">
            {isLoading ? (
              <Card className="p-8 text-center">
                <p className="text-[var(--app-gray-500)]">Carregando transações...</p>
              </Card>
            ) : transactions.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-[var(--app-gray-500)]">
                  Nenhuma transação ainda
                </p>
              </Card>
            ) : (
              transactions.map((transaction) => (
                <Card key={transaction.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === 'earn'
                          ? 'bg-green-100'
                          : 'bg-orange-100'
                      }`}
                    >
                      {transaction.type === 'earn' ? (
                        <TrendingUp size={20} className="text-green-600" />
                      ) : (
                        <TrendingDown size={20} className="text-orange-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="text-[var(--app-gray-900)]">
                            {transaction.description}
                          </p>
                          {transaction.caseId && (
                            <p className="text-xs text-[var(--app-gray-500)] mt-1">
                              ID: {transaction.caseId}
                            </p>
                          )}
                          {transaction.partnerName && (
                            <p className="text-xs text-[var(--app-gray-500)] mt-1">
                              {transaction.partnerName}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p
                            className={`font-semibold ${
                              transaction.type === 'earn'
                                ? 'text-green-600'
                                : 'text-orange-600'
                            }`}
                          >
                            {transaction.type === 'earn' ? '+' : '-'}
                            {transaction.amount}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--app-gray-500)]">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-[var(--app-gray-500)] pt-4">
          <p>
            As Patinhas não expiram e podem ser acumuladas sem limite!
          </p>
        </div>
      </div>
    </div>
  );
}
