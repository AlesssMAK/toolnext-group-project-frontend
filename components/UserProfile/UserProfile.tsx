import css from './UserProfile.module.css';
import Image from 'next/image';

interface UserProfileProps {
  name: string;
  avatar: string;
}

const UserProfile = ({ name, avatar }: UserProfileProps) => {

  const avatarSrc = avatar?.trim() || '';
  const hasImage = avatarSrc.startsWith('http');


  return (
    <section className={css.section}>
      <div className='container'>
        <div className={css.wrapper}>
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
          </div>
          <h1 className={css.username}>{name}</h1>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
