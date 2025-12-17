import Image from 'next/image';
import css from './ToolGallery.module.css';

type Props = {
  images: string[];
};

export default function ToolGallery({ images }: Props) {
  if (!images?.length) return null;

  return (
    <div className={css.gallery}>
      <Image
        src={images[0]}
        width={800}
        height={600}
        alt="Інструмент"
        className={css.mainImage}
        priority
      />

      {images.length > 1 && (
        <div className={css.thumbs}>
          {images.slice(1).map((img, i) => (
            <Image
              key={i}
              src={img}
              width={64}
              height={64}
              alt="Мініатюра"
              className={css.thumb}
            />
          ))}
        </div>
      )}
    </div>
  );
}
