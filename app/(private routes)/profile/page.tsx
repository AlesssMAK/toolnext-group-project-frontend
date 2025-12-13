import { Metadata } from 'next';
// import { getServerMe } from '@/lib/api/serverApi';
import UserProfile from '@/components/UserProfile/UserProfile';
import ProfilePlaceHolder from '@/components/ProfilePlaceHolder/ProfilePlaceHolder';

export const metadata: Metadata = {
  title: 'My Profile',
  description: '',
  icons: '',
  openGraph: {
    title: 'My Profile',
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

async function getServerMe() {
  return {
    id: "123",
    username: "Антон Петренко",
    email: "test@example.com",
  };
}

const Profile = async () => {

  const user = await getServerMe();

  return (
      <main>
        <UserProfile username={user.username} />
        <ProfilePlaceHolder isOwner={true} />
      </main>
  );
};

export default Profile;
