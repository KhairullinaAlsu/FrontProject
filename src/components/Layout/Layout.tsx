"use client"
import { FC, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import styles from './Layout.module.css';
import Link from "next/link";

interface User {
  name: string;
  email: string;
}

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Unauthorized');
  }

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  return res.json();
};

const Layout: FC = () => {
  const { data: user, error } = useSWR<User>('/api/auth/user', fetcher, { revalidateOnFocus: false });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else if (error) {
      setIsLoggedIn(false);
    }
  }, [user, error]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    await mutate('/api/auth/user');
  };

  if (error) {
    console.error('Failed to load user:', error);
    if (error.message === 'Unauthorized') {
      return (
          <div className={styles.container}>
            <div className={styles.box}>
                <a href="/">Main Page</a>
                <a href="/auth/signin" className="log_in">Log in</a>
            </div>
          </div>
      );
    }
    return <div>Failed to load</div>;
  }

  return (
      <div className={styles.container}>
        <div className={styles.box}>
          {isLoggedIn === null ? (
              <>
                <a href="/">Main Page</a>
                <a href="/auth/signin" className="log_in">Log in</a>
              </>
          ) : isLoggedIn ? (
              <>
                <a href="/assignments">Assignments</a>
                <a href="/classes">Classes</a>
                <a href="/">{user?.name}</a>
                <Link href="/auth/signin">
                  <button onClick={handleLogout} className={styles.logout}>Logout</button>
                </Link>
              </>
          ) : (
              <>
              <a href="/">Main Page</a>
                <a href="/auth/signin" className="log_in">Log in</a>
              </>
          )}
        </div>
      </div>
  );
};

export default Layout;