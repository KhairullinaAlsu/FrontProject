"use client"

import React, { FC, useEffect, useState } from 'react';
import { Course } from '../../Types/types';
import styles from './ClassesDetails.module.css';

interface ClassesDetailsProps {
  courseId: number;
  onClose: () => void;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const ClassesDetails: FC<ClassesDetailsProps> = ({ courseId, onClose, onEdit, onDelete }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/classes/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setError('Unauthorized');
        } else if (!response.ok) {
          setError('Failed to load course details');
        } else {
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="spinner"></div>;
  if (error) return <div>{error}</div>;

  if (!course) return <div>No course found</div>;

  return (
      <>
        <h1 className="header">Details</h1>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.text}>
              <h1>{course.name}</h1>
              <p>Course ID: {course.courseId}</p>
              {course.courseDescription && <p>Course Description: {course.courseDescription}</p>}
              <p>Category: {course.category}</p>
              <p>Schedule day: {course.scheduleDay}</p>
              <p>Period: {course.period}</p>
              <p>Hours: {course.hoursStart} - {course.hoursEnd}</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => onEdit(course)}>Edit</button>
              <button onClick={() => onDelete(course.id!)}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </>
  );
};

export default ClassesDetails;