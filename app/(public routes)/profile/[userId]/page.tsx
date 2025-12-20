import { Metadata } from 'next';
import UserProfile from '@/components/UserProfile/UserProfile';
import ProfilePlaceHolder from '@/components/ProfilePlaceHolder/ProfilePlaceHolder';
import ToolsGrid from '@/components/ToolsGrid/ToolsGrid';

import { getUserById, getToolsByUserId } from '@/lib/api/serverApi';

export const metadata = {
  title: 'Профіль користувача',
  description: 'Публічний профіль користувача',
};

interface Props {
  params: Promise<{ userId: string }>;
}

const PublicProfile = async ({ params }: Props) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  const { tools, pagination } = await getToolsByUserId(userId, 1, 8);

  return (
    <main>
      <UserProfile name={user.name} avatar={user.avatar} />
      {tools.length > 0 ? (
        <ToolsGrid
          tools={tools}
          userId={userId}
          initialPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          perPage={pagination.perPage}
        />
      ) : (
        <ProfilePlaceHolder isOwner={false} />
      )}
    </main>
  );
};

export default PublicProfile;
