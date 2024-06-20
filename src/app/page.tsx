"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PrivateRoute } from '@/components';
import { MainPage } from '@/components';
import Link from "next/link";
import styles from './page.module.css';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; course: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
    } else {
      fetch('/api/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 'Unauthorized') {
              localStorage.removeItem('token');
              setLoading(false);
            } else {
              setUser(data.user);
              setLoading(false);
            }
          });
    }
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/delete_profile', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
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