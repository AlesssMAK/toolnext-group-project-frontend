import css from './UserProfile.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfileProps {
  name: string;
  avatar: string;
  isOwner?: boolean;
}

const UserProfile = ({ name, avatar, isOwner }: UserProfileProps) => {
  const avatarSrc = avatar?.trim() || '';
  const hasImage = avatarSrc.startsWith('http');

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.avatarWrap}>
            <div className={css.avatar}>
              {hasImage ? (
                <Image
                  src={avatarSrc}
                  alt={`${name} avatar`}
                  width={129}
                  height={129}
                  className={css.avatarImg}
                  priority
                />
              ) : (
                <div className={css.avatarPlaceholder} aria-hidden="true">
                  {avatar}
                </div>
              )}
              {isOwner && (
                <Link href="/profile/edit" className={css.manageBtn}>
                  <svg width="18" height="18" aria-hidden="true">
                    <use href="/sprite.svg#manage_accounts" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <h1 className={css.username}>{name}</h1>
        </div>

        <h2 className={css.title}>Інструменти</h2>
      </div>
    </section>
  );
};

export default UserProfile;
