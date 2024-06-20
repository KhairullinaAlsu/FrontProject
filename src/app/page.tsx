"use client"

import {FC, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { PrivateRoute } from '@/components';
import { MainPage } from '@/components';
import Link from "next/link";
import styles from './page.module.css';

const ProfilePage: FC = () => {
  const [user, setUser] = useState<{ name: string; course: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setUser(null);
      router.push('/');
    } else {
      fetch('/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 'Unauthorized') {
              localStorage.removeItem('token');
              setLoading(false);
              setUser(null);
              router.push('/');
            } else {
              setUser(data);
              setLoading(false);
            }
          });
    }
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/signin');
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/auth/delete_profile', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/signin');
  };

  if (loading) {
    return <div className='spinner'></div>;
  }

  if (!user) {
    return <MainPage />;
  }

  return (
      <PrivateRoute>
        <div>
          <h1 className="header">Profile</h1>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.text}>
                <p>Name: {user.name}</p>
                <p>Course: {user.course}</p>
              </div>
              <div className={styles.buttons}>
                <button onClick={handleDeleteProfile}>Delete Profile</button>
                <Link href="/edit_profile">
                  <button>Edit Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PrivateRoute>
  );
};

export default ProfilePage;