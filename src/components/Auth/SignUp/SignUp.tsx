"use client"
import {FC, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from "./SignUp.module.css"

const RegisterPage:FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    course: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/auth/signin');
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
      <div>
        <h1 className="header">Register</h1>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.box}>
            <div className={styles.form}>
              <label>Email:
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
              </label>
              <label>
                Password:
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
              </label>
              <label>
                Name:
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required/>
              </label>
              <label>
                Course:
                <input type="text" name="course" placeholder="Course" onChange={handleChange} required/>
              </label>
            </div>
            <div className={styles.buttons}>
            <button type="submit">Sign Up</button>
              <div className={styles.signup}>
                <span>Do have an account?</span>
                <Link href={'/auth/signin'}>
                  <button>
                    Sign In
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

export default RegisterPage;