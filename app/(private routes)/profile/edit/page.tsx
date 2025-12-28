'use client';

import Head from 'next/head';
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
      if (!user) return;
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
    <>
      <Head>
        <title>Редагування профілю | ToolNext</title>
        <meta
          name="description"
          content="Оновіть свій аватар та інформацію профілю на платформі ToolNext."
        />
        <meta property="og:title" content="Редагування профілю | ToolNext" />
        <meta
          property="og:description"
          content="Оновіть аватар та налаштуйте свій профіль на платформі ToolNext."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ToolNext" />
        <meta
          property="og:url"
          content="https://toolnext-group-project-frontend.vercel.app"
        />
      </Head>

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
    </>
  );
};

export default EditProfile;

