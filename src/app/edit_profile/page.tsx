"use client"

import {FC, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const EditProfilePage: FC = () => {
  const [formData, setFormData] = useState({ name: '', course: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
              localStorage.removeItem('token');
              router.push('/login');
            } else {
              setFormData({ name: data.user.name, course: data.user.course });
              setLoading(false);
            }
          });
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('/api/update_profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/');
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
      <div>
        <h1 className="header">Edit Profile</h1>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.box}>
            <div className={styles.form}>
              <label>
                Name:
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                       required/>
              </label>
              <label>
                Course:
                <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange}
                       required/>
              </label>


            </div>
            <div className={styles.buttons}>
              <button type="submit">Save Changes</button>
              <button onClick={() => router.push('/')}>Cancel</button>
            </div>
          </form>
        </div>

        {error && <p>{error}</p>}
      </div>
  );
};

export default EditProfilePage;