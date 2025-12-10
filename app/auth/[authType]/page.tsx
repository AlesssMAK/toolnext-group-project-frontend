import LoginForm from "@/components/LoginForm/LoginForm";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default async function AuthPage({ params }: {params: Promise<{authType: string}> }) {
  const { authType } = await params;

  if (authType === "login") {
    return <LoginForm />;
  }

  if (authType === "register") {
    return <RegistrationForm />;
  }

  return <h1>404 — Page not found</h1>;
}