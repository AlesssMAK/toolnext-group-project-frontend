import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import { login } from '@/lib/api/clientApi';
import { title } from 'process';

interface MetaDataProps {
  params: Promise<{ authType: string }>;
}

export async function generateMetadata({ params }: MetaDataProps) {
  const { authType } = await params;

  if (authType === 'login') {
    return {
      title: 'Увійти',
      description: 'Сторінка входу користувача.',
    };
  }
  if (authType === 'register') {
    return {
      title: 'Реєстрація',
      description: 'Створіть новий обліковий запис.',
    };
  }
  return {
    title: 'Сторінка не знайдена',
  };
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ authType: string }>;
}) {
  const { authType } = await params;

  if (authType === 'login') {
    return <LoginForm />;
  }

  if (authType === 'register') {
    return <RegistrationForm />;
  }

  return <h1>404 — Page not found</h1>;
}
