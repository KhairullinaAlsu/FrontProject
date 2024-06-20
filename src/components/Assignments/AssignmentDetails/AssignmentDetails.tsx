"use client"

import React, { FC, useEffect, useState } from 'react';
import { Assignment } from '../../Types/types';
import styles from './AssignmentDetails.module.css';

interface AssignmentDetailsProps {
  assignmentId: number;
  onClose: () => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: number) => void;
}

const AssignmentDetails: FC<AssignmentDetailsProps> = ({ assignmentId, onClose, onEdit, onDelete }) => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/assignments/${assignmentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          setError('Unauthorized');
        } else if (response.status === 400) {
          setError('Bad Request');
        } else if (!response.ok) {
          setError('Failed to load assignment details');
        } else {
          const data = await response.json();
          setAssignment(data);
        }
      } catch (error) {
        setError('Failed to load assignment details');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  if (loading) return <div className="spinner"></div>;
  if (error) return <div>{error}</div>;

  if (!assignment) return <div>No assignment found</div>;
  return (
      <>
        <h1 className="header">Details</h1>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.text}>
              <h1>{assignment.courseName}</h1>
              <p>Assigment: {assignment.name}</p>
              {assignment.details && <p>Assignment details: {assignment.details}</p>}
              <p>Course ID: {assignment.courseId}</p>
              <p>Due date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p>{assignment.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => onEdit(assignment)}>Edit</button>
              <button onClick={() => onDelete(assignment.id!)}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </>
  );
};

export default AssignmentDetails;
