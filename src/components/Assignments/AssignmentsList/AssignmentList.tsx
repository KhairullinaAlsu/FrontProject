"use client"

import Link from 'next/link';
import useSWR from 'swr';
import {FC, useEffect} from 'react';
import styles from './AssignmentsList.module.css';
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

const AssignmentList: FC = () => {
  const router = useRouter();
  const { data: assignments, error } = useSWR('/api/assignments', fetcher);

  useEffect(() => {
    if (error && error.message === 'Unauthorized') {
      router.push('/auth/signin');
    }
  }, [error, router]);

  if (!assignments) return <div className="spinner"></div>;

  if (!Array.isArray(assignments)) {
    console.error('Unexpected response:', assignments);
    return <div>Unexpected response from server</div>;
  }

  return (
      <div className={styles.container}>
        {assignments.length === 0 ? (
            <div className={styles.initial}>
              <p>No assignments available. Please create a new assignment.</p>
              <Link href="/assignments/new">
                <button>Add Assignment</button>
              </Link>
            </div>
        ) : (
            <div>
              <div className={styles.block_node}>
                {assignments.map((assignment) => (
                    <div key={assignment.id} className={styles.box}>
                      <div className={styles.node}>
                        <div className={styles.info}>
                          <h1>{assignment.courseName}</h1>
                          <span>{assignment.name}</span>
                        </div>
                        <div className={styles.button}>
                          <Link href={`/assignments/${assignment.id}`}>
                            <button>View More</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
              <Link href="/assignments/new" className={styles.add}>
                <button>Add Assignment</button>
              </Link>
            </div>
        )}
      </div>
  );
};

export default AssignmentList;