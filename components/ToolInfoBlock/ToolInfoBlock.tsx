'use client';

import { useRouter } from 'next/navigation';
import css from './ToolInfoBlock.module.css';
import { User } from '@/types/user';
import Link from 'next/link';
// import AuthRequiredModal from '@/components/AuthRequiredModal';

export default function ToolInfoBlock({
  tool,
  owner,
}: {
  tool: any;
  owner: User;
}) {
  const router = useRouter();
  const isAuthorized = false; // з auth store / context

  const handleBookClick = () => {
    if (isAuthorized) {
      router.push(`/booking/${tool.id}`);
    } else {
      // open modal
    }
  };

  return (
    <div className={css.toolInfo}>
      <h1 className={css.toolTitle}>{tool.name}</h1>
      <p className={css.toolPrice}>{tool.pricePerDay} грн/день</p>
      {owner && (
        <div className={css.toolOwner}>
          <img
            src={owner.avatar || '/avatar-placeholder.png'}
            alt={owner.name}
            className={css.ownerAvatar}
          />
          <div className={css.ownerInfo}>
            <p className={css.ownerName}>{owner.name}</p>
            <Link href={`/profile/${owner.id}`} className={css.ownerLink}>
              Переглянути профіль
            </Link>
          </div>
        </div>
      )}

      <p className={css.toolDescr}>{tool.description}</p>
      <div className={css.toolSpec}>
        {Object.entries(tool.specifications).map(([key, value]) => (
          <p key={key}>
            <strong className={css.toolSpecTitle}>{key}: </strong>
            {String(value)}
          </p>
        ))}
      </div>
      <button className={css.toolBut} onClick={handleBookClick}>
        Забронювати
      </button>
    </div>
  );
}
