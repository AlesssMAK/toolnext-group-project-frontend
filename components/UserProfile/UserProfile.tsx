import css from './UserProfile.module.css';

interface UserProfileProps {
  name: string;
  avatar: string;
}

const UserProfile = ({ name, avatar }: UserProfileProps) => {

  return (
    <section className={css.section}>
      <div className='container'>
        <h1 className={css.title}>User Profile</h1>
        <div className={css.wrapper}>
          <div className={css.avatar}>{avatar}</div>
          <p className={css.username}>{name}</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
