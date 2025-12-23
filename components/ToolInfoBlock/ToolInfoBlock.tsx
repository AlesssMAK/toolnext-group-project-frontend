'use client';

import { useRouter } from 'next/navigation';
import css from './ToolInfoBlock.module.css';
import { User } from '@/types/user';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { Tool } from '@/types/tool';
import { useState } from 'react';
import AuthRequiredModal from '../AuthRequiredModal/AuthRequiredModal';

export default function ToolInfoBlock({
  tool,
  owner,
}: {
  tool: Tool;
  owner?: User;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleBookClick = () => {
    if (isAuthenticated) {
      router.push(`/manage-tools/${tool._id}/booking`);
    } else {
      router.push('/confirm/auth-request');
    }
  };

  return (
    <section className={css.toolInfo}>
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
            <Link
              href={`/profile/${owner.id}`}
              className={`${css.ownerLink} button button--secondary`}
            >
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
            {value}
          </p>
        ))}
        {tool.rentalTerms && (
          <p key="rentalTerms">
            <strong className={css.toolSpecTitle}>Умови оренди: </strong>
            {tool.rentalTerms}
          </p>
        )}
      </div>
      <button
        className={`${css.toolBut} button button--primary`}
        onClick={handleBookClick}
      >
        Забронювати
      </button>
      
    </section>
  );
}
