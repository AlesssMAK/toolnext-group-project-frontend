import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
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


const Profile = async () => {

  const user = await getServerMe();
  console.log("PROFILE USER:", user);

  return (
      <main>
        <UserProfile name={user.name} avatar={user.avatar} />
        <ProfilePlaceHolder isOwner={true} />
      </main>
  );
};

export default Profile;
