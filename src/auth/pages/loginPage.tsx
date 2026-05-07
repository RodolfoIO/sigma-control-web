import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
