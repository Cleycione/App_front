import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price?: string;
    availability: 'Em estoque' | 'Por encomenda';
    image: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, editable = false }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="relative aspect-square bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.availability === 'Em estoque' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            {product.availability}
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <p className="text-xs text-[var(--petmatch-text-muted)] mb-1">
          {product.category}
        </p>
        <h3 className="font-medium text-[var(--petmatch-text)] mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.price && (
          <p className="text-lg font-semibold text-[var(--petmatch-primary)] mb-2">
            {product.price}
          </p>
        )}
        
        {editable && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={onEdit}
              className="flex-1 px-3 py-1.5 bg-[var(--petmatch-primary)] text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              Remover
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
