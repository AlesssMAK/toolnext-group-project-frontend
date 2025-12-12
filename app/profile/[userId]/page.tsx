import { Metadata } from 'next';
import UserProfile from '@/components/UserProfile/UserProfile';
import ProfilePlaceHolder from '@/components/ProfilePlaceHolder/ProfilePlaceHolder';

// import { getUserById } from '@/lib/api/clientApi';

export const metadata: Metadata = {
  title: 'User Profile',
  description: '',
  icons: '',
  openGraph: {
    title: 'User Profile',
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

const ProfilePagePublic = async () => {
  // const { id } = params;

  // const user = await getUserById(id);

  const id = '123';
  const user = { username: 'Антон Петренко' };

  return (
    <main>
        <UserProfile username={user.username} />
        <ProfilePlaceHolder isOwner={false} />
    </main>
  );
};

export default ProfilePagePublic;
