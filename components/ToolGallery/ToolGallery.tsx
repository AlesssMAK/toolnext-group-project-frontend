import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import css from './ToolGallery.module.css';

type Props = {
  images: string[];
};

export default function ToolGallery({ images }: Props) {
  if (!images?.length) return null;

  const [mainImage, setMainImage] = useState(images[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const mainSrc = useMemo(() => {
    if (!mounted) return mainImage; // SSR + first client render = same
    return `${mainImage}?v=${Date.now()}`; // тільки після mount
  }, [mounted, mainImage]);

  if (!images?.length) return null;

  return (
    <div className={css.gallery}>
      <Image
        src={mainSrc}
        width={800}
        height={600}
        alt="Інструмент"
        className={css.mainImage}
        priority
      />

      {images.length > 1 && (
        <div className={css.thumbs}>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              width={64}
              height={64}
              alt="Мініатюра"
              className={`${css.thumb} ${mainImage === img ? css.activeThumb : ''}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
