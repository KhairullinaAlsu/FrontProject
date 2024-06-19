import React, {FC} from 'react';
import { Course } from '../../Types/types';
import styles from "./ClassesDetails.module.css"


interface ClassesDetailsProps {
  courses: Course;
  onClose: () => void;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const ClassesDetails: FC<ClassesDetailsProps> = ({ courses, onClose, onEdit, onDelete }) => {
  

  return (
      <>
        <h1 className="header">Details</h1>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.text}>
              <h1>{courses.name}</h1>
              <p>Course ID: {courses.courseId}</p>
              {courses.courseDescription && <p>Course Description: {courses.courseDescription}</p>}
              <p>Category: {courses.category}</p>
              <p>Schedule day: {courses.scheduleDay}</p>
              <p>Period: {courses.period}</p>
              <p>Hours: {courses.hoursStart} - {courses.hoursEnd}</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => onEdit(courses)}>Edit</button>
              <button onClick={() => onDelete(courses.id!)}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </>
  );
};

export default ClassesDetails;
