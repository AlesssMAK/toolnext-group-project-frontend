import { Metadata } from 'next';
import UserProfile from '@/components/UserProfile/UserProfile';
import ProfilePlaceHolder from '@/components/ProfilePlaceHolder/ProfilePlaceHolder';
import ToolsGrid from '@/components/ToolsGrid/ToolsGrid';

import { getServerMe, getToolsByUserId } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'My Profile',
  description: '',
};

const Profile = async () => {
  const user = await getServerMe();

  const { tools, pagination } = await getToolsByUserId(user.id, 1, 8);

  return (
    <main>
      <UserProfile name={user.name} avatar={user.avatar} />
      {tools.length > 0 ? (
        <ToolsGrid
          tools={tools}
          userId={user.id}
          initialPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          perPage={pagination.perPage}
        />
      ) : (
        <ProfilePlaceHolder isOwner={true} />
      )}
    </main>
  );
};

export default Profile;
