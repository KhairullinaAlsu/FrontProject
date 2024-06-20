"use client"

import Link from 'next/link';
import useSWR from 'swr';
import {FC, useEffect} from "react";
import styles from './Classes.module.css'
import {useRouter} from "next/navigation";

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Unauthorized');
  }

  let res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  return await res.json();
};

const ClassesList: FC = () => {
  const router = useRouter();
  const { data: course, error } = useSWR('/api/classes', fetcher);

  useEffect(() => {
    if (error && error.message === 'Unauthorized') {
      router.push('/auth/signin');
    }
  }, [error, router]);

  if (!course) return <div className="spinner"></div>;

  if (!Array.isArray(course)) {
    console.error('Unexpected response:', course);
    return <div>Unexpected response from server</div>;
  }


  return (
      <div className={styles.container}>
        {course.length === 0 ? (
            <div className={styles.initial}>
              <p>No courses available. Please create a new course.</p>
              <Link href="/classes/new">
                <button>Add Course</button>
              </Link>
            </div>
        ) : (
            <div>
              <div className={styles.block_node}>
                {course.map((course) => (
                  <div key={course.id} className={styles.box}>
                    <div className={styles.node}>
                      <div className={styles.info}>
                        <h1>{course.name}</h1>
                        <span>{course.courseId}</span>
                      </div>
                      <div className={styles.button}>
                      <Link href={`/classes/${course.id}`}>
                          <button>View More</button>
                      </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/classes/new" className={styles.add}>
                <button>Add Course</button>
              </Link>
            </div>
        )}
      </div>
  );
};

export default ClassesList;
