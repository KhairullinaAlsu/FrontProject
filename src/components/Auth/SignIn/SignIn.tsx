"use client"

import {FC, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './SignIn.module.css';

const LoginPage: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
      <div >
        <h1 className="header">Login</h1>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.box}>
            <div className={styles.form}>
              <label>
                Email:
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
              </label>
              <label>
                Password:
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
              </label>
            </div>
            <div className={styles.buttons}>
              <button type="submit">Login</button>
              <div className={styles.signup}>
                <span>
                Dont have an account?
              </span>
                <Link href="/auth/signup">
                  <button>
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
        {error && <p>{error}</p>}
      </div>
  );
};

export default LoginPage;