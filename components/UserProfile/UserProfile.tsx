import css from './UserProfile.module.css';

interface UserProfileProps {
  username?: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
  //оминула необов'язкове ім'я
  const safeUsername = username ?? '';
  const firstLetter = safeUsername.charAt(0).toUpperCase();

  return (
    <section className={css.section}>
      <div className='container'>
        <h1 className={css.title}>User Profile</h1>
        <div className={css.wrapper}>
          <div className={css.avatar}>{firstLetter}</div>
          <p className={css.username}>{safeUsername}</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
