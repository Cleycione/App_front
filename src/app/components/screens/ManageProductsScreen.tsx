import React, { useState } from 'react';
import { ArrowLeft, Plus, Camera } from 'lucide-react';
import { ProductCard } from '../ui/ProductCard';

interface ManageProductsScreenProps {
  partner: any;
  onBack: () => void;
}

export function ManageProductsScreen({ partner, onBack }: ManageProductsScreenProps) {
  const [products, setProducts] = useState(partner.products || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    availability: 'Em estoque' as 'Em estoque' | 'Por encomenda',
    image: null as File | null
  });

  const MAX_PRODUCTS = 10;
  const canAddMore = products.length < MAX_PRODUCTS;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canAddMore) {
      alert('Você atingiu o limite de 10 produtos');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: formData.price,
      availability: formData.availability,
      image: 'https://images.unsplash.com/photo-1684882726821-2999db517441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    };

    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      category: '',
      price: '',
      availability: 'Em estoque',
      image: null
    });
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Deseja remover este produto?')) {
      setProducts(products.filter((p: any) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg-light)] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[var(--petmatch-text)]" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-[var(--petmatch-text)]">
                Gerenciar Produtos
              </h1>
              <p className="text-xs text-[var(--petmatch-text-muted)]">
                {partner.name}
              </p>
            </div>
            <div className="text-right">
              <span className={`text-sm font-semibold ${
                products.length >= MAX_PRODUCTS ? 'text-red-600' : 'text-[var(--petmatch-primary)]'
              }`}>
                {products.length}/{MAX_PRODUCTS}
              </span>
              <p className="text-xs text-[var(--petmatch-text-muted)]">
                produtos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Info Box */}
        {products.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-[var(--petmatch-text)] mb-2 text-sm">
              📦 Adicione seus produtos
            </h3>
            <p className="text-xs text-[var(--petmatch-text-muted)]">
              Você pode adicionar até 10 produtos ou serviços para exibir no seu perfil. Mostre o que você oferece!
            </p>
          </div>
        )}

        {/* Add Product Button */}
        {canAddMore && !showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-xl text-[var(--petmatch-text)] hover:border-[var(--petmatch-primary)] hover:text-[var(--petmatch-primary)] transition-colors mb-4"
          >
            <Plus size={20} />
            <span className="font-medium">Adicionar produto</span>
          </button>
        )}

        {!canAddMore && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-orange-700">
              ⚠️ Você atingiu o limite de 10 produtos. Remova um produto para adicionar outro.
            </p>
          </div>
        )}

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border-2 border-[var(--petmatch-primary)] p-4 mb-4">
            <h2 className="font-semibold text-[var(--petmatch-text)] mb-4">
              Novo Produto
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                  Foto do produto *
                </label>
                <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[var(--petmatch-primary)] transition-colors">
                  <div className="text-center">
                    <Camera className="mx-auto text-gray-400 mb-1" size={24} />
                    <span className="text-xs text-gray-500">Foto</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                  Nome do produto *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Ração Premium Golden 15kg"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                  Categoria *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Ração, Acessórios, Serviços..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                  Preço (opcional)
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Ex: R$ 189,90"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--petmatch-text)] mb-2">
                  Disponibilidade *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, availability: 'Em estoque' }))}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      formData.availability === 'Em estoque'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-[var(--petmatch-text)]'
                    }`}
                  >
                    Em estoque
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, availability: 'Por encomenda' }))}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      formData.availability === 'Por encomenda'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-[var(--petmatch-text)]'
                    }`}
                  >
                    Por encomenda
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({
                      name: '',
                      category: '',
                      price: '',
                      availability: 'Em estoque',
                      image: null
                    });
                  }}
                  className="flex-1 py-3 bg-gray-200 text-[var(--petmatch-text)] font-medium rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[var(--petmatch-primary)] text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div>
            <h2 className="font-semibold text-[var(--petmatch-text)] mb-3">
              Seus Produtos
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  editable
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
