"use client"
import { FC, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import styles from './Layout.module.css';

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
  const { data: user, error } = useSWR<User>('/api/auth/user', fetcher);

  useEffect(() => {
    const links = document.querySelectorAll(`.${styles.box} a`);
    const currentPath = window.location.pathname;

    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add(styles.active);
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    mutate('/api/auth/user'); // Обновляем данные пользователя
  };

  if (error) {
    console.error('Failed to load user:', error);
    if (error.message === 'Unauthorized') {
      return (
          <div className={styles.container}>
            <div className={styles.box}>
              <a href="/" className="main">Main page</a>
              <a href="/assignments" className="assignments">Assignments</a>
              <a href="/classes" className="classes">Classes</a>
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
          {user ? (
              <>
                <a href="/">Profile</a>
                <a href="/assignments">Assignments</a>
                <a href="/classes">Classes</a>
                <a href="/">{user.name}</a>
                <a href="/auth/signin" onClick={handleLogout} className={styles.logout}>Logout</a>
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