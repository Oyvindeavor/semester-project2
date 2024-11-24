import { Suspense } from 'react';
import LoginForm from '@components/forms/LoginForm';

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
