'use client';

import css from './AvatarPicker.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

type Props = {
  avatarUrl: string;
  onPick: (file: File | null) => void;
};

const AvatarPicker = ({ avatarUrl, onPick }: Props) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (avatarUrl) {
      setPreviewUrl(avatarUrl || '');
    }
  }, [avatarUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Тільки зображення');
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('Файл занадто великий (макс 1MB)');
      return;
    }

    onPick(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onPick(null);
  };

  const hasPreview = previewUrl.startsWith('http') || previewUrl.startsWith('data:image/');

  return (
    <div className={css.picker}>
      {hasPreview && (
        <div className={css.previewBox}>
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
            unoptimized
          />
        </div>
      )}
      <label
        className={hasPreview ? `${css.wrapper} ${css.reload}` : css.wrapper}
      >
        Натисніть і виберіть фото
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={css.input}
        />
      </label>
      {hasPreview && (
        <button type="button" className={css.remove} onClick={handleRemove}>
          <svg width="24" height="24">
            <use href="/sprite.svg#close" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AvatarPicker;
