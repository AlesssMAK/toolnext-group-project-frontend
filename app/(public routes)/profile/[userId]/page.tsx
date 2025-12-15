import { Metadata } from 'next';
import UserProfile from '@/components/UserProfile/UserProfile';
import ProfilePlaceHolder from '@/components/ProfilePlaceHolder/ProfilePlaceHolder';

import { getUserById } from '@/lib/api/serverApi';

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


type Props = {
  params: Promise<{ userId: string }>;
};

const PublicProfile = async ({ params }: Props) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  return (
    <main>
        <UserProfile name={user.name} avatar={user.avatar} />
        <ProfilePlaceHolder isOwner={false} />
    </main>
  );
};

export default PublicProfile;

