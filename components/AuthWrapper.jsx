// components/AuthWrapper.tsx
'use client';
import { useEffect, useState } from 'react';
import { validateEmail } from '../utils/auth';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('user-email');
    if (email && validateEmail(email)) setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div className="text-center p-10 text-red-500">
        Access Denied: Admins Only
      </div>
    );
  }

  return <>{children}</>;
};
