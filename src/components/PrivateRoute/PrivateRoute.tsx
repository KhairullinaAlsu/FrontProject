"use client"

import {FC, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetch('/api/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 'Unauthorized') {
              router.push('/login');
            } else {
              setIsAuthenticated(true);
              setLoading(false);
            }
          });
    }
  }, [router]);

  if (loading) {
    return <div className='spinner'></div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;