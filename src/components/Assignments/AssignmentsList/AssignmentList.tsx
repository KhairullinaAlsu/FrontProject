import Link from 'next/link';
import useSWR from 'swr';
import { Assignment } from '../../Types/types';
import {FC} from "react";
import styles from './AssignmentsList.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AssignmentList:FC = () => {
  const { data: assignments, error } = useSWR<Assignment[]>('/api/assignments', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!assignments) return <div>Loading...</div>;

  return (
      <div className={styles.container}>
        {assignments.length === 0 ? (
            <div className={styles.initial}>
              <p>No assignments available. Please create a new assignments.</p>
              <Link href="/assignments/new">
                <button>Add New Assignments</button>
              </Link>
            </div>
        ) : (
            <div>
              {assignments.map((assignment) => (
                  <div key={assignment.id} className={styles.node}>
                    <h2>{assignment.courseName}</h2>
                    <span>{assignment.courseId}</span>
                    <span>{assignment.details}</span>
                    <Link href={`/assignments/${assignment.id}`}>
                      <button>View More</button>
                    </Link>
                  </div>
              ))}
              <Link href="/assignments/new" className={styles.add}>
                <button>Add Assignments</button>
              </Link>
            </div>
        )}
      </div>
  );
};

export default AssignmentList;
