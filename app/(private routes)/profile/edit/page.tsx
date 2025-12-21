// app/(private routes)/profile/edit/page.tsx

'use client';

import css from './EditPage.module.css';
import { useEffect, useState } from 'react';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMyAvatar } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getMe();
      if (!user) return; // або показати помилку/редірект
      setAvatarUrl(user.avatar ?? '');
    })();
  }, []);

  const handleSaveUser = async () => {
    if (!avatarFile) return;

    try {
      setLoading(true);
      await updateMyAvatar(avatarFile);
      toast.success('Аватар успішно оновлено👌');
      router.push('/profile');
      router.refresh();
    } catch (error) {
      toast.error('Упс, щось пішло не так...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className={css.section}>
        <div className="container">
          <h1 className={css.title}>Редагування профілю</h1>
          <div className={css.wrapper}>
            <AvatarPicker
              avatarUrl={avatarUrl}
              onPick={file => setAvatarFile(file)}
            />
            <div className={css.buttonWrap}>
              <button
                className={`button button--primary ${css.saveBtn}`}
                type="button"
                onClick={handleSaveUser}
                disabled={loading || !avatarFile}
              >
                {loading ? 'Завантаження' : 'Зберегти зміни'}
              </button>
              <button
                className={`button button--secondary ${css.backBtn}`}
                type="button"
                onClick={() => router.back()}
              >
                Повернутись назад
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditProfile;
