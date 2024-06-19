import Link from 'next/link';
import useSWR from 'swr';
import { Course } from '../../Types/types';
import {FC} from "react";
import styles from './Classes.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClassesList:FC = () => {
  const { data: classes, error } = useSWR<Course[]>('/api/classes', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!classes) return <div className="spinner"></div>;

  return (
      <div className={styles.container}>
        {classes.length === 0 ? (
            <div className={styles.initial}>
              <p>No courses available. Please create a new course.</p>
              <Link href="/classes/new">
                <button>Add Course</button>
              </Link>
            </div>
        ) : (
            <div>
              <div className={styles.block_node}>
                {classes.map((course) => (
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
