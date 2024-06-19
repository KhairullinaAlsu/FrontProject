import React, {FC} from 'react';
import { Assignment } from '../../Types/types';
import styles from "./AssignmentDetails.module.css"


interface AssignmentsDetailsProps {
  assignments: Assignment;
  onClose: () => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: number) => void;
}

const AssignmentDetails: FC<AssignmentsDetailsProps> = ({ assignments, onClose, onEdit, onDelete }) => {


  return (
      <>
        <h1 className="header">Details</h1>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.text}>
              <h1>{assignments.courseName}</h1>
              <p>Assigment: {assignments.name}</p>
              {assignments.details && <p>Assignment details: {assignments.details}</p>}
              <p>Course ID: {assignments.courseId}</p>
              <p>Due date: {new Date(assignments.dueDate).toLocaleDateString()}</p>
              <p>{assignments.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => onEdit(assignments)}>Edit</button>
              <button onClick={() => onDelete(assignments.id!)}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </>
  );
};

export default AssignmentDetails;
