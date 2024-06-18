"use client"

import AssignmentList from './AssignmentsList/AssignmentList';
import styles from './Assignments.module.css'

export default function Home() {

  return (
      <div>
        <h1 className={styles.header}>Assignments</h1>
        <AssignmentList />
      </div>
  );
}
