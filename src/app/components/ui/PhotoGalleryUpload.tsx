import React, { useState } from 'react';
import { Camera, X, Plus } from 'lucide-react';

interface PhotoGalleryUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export function PhotoGalleryUpload({ 
  photos, 
  onPhotosChange, 
  maxPhotos = 10 
}: PhotoGalleryUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, maxPhotos - photos.length);
      const photoUrls = newPhotos.map(file => URL.createObjectURL(file));
      onPhotosChange([...photos, ...photoUrls]);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(updatedPhotos);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--petmatch-text-muted)]">
          Envie fotos do local onde o pet ficará (ambiente, quintal, tela, segurança)
        </p>
        <span className="text-sm font-medium text-[var(--petmatch-primary)]">
          {photos.length}/{maxPhotos}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={photo} 
              alt={`Foto ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <label className="relative aspect-square rounded-lg border-2 border-dashed border-[var(--petmatch-border)] bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Plus size={24} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Adicionar</span>
          </label>
        )}
      </div>

      {photos.length >= maxPhotos && (
        <p className="text-xs text-amber-600">
          Limite máximo de {maxPhotos} fotos atingido
        </p>
      )}
    </div>
  );
}
