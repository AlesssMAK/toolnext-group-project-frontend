import css from './ProfilePage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: '',
  icons: '',
  openGraph: {
    title: 'Profile',
    description: '',
    url: '',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
  },
};

const Profile = async () => {
  return (
    <>
      <main className={css.mainContent}>Profile</main>
    </>
  );
};

export default Profile;
