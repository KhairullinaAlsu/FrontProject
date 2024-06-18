import React, {FC} from 'react';
import { Assignment } from '../../Types/types';


interface AssignmentsDetailsProps {
  assignments: Assignment;
  onClose: () => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: number) => void;
}

const AssignmentDetails: FC<AssignmentsDetailsProps> = ({ assignments, onClose, onEdit, onDelete }) => {
  return (
      <div>
        <h2>{assignments.courseName}</h2>
        <p>{assignments.details}</p>
        <p>{new Date(assignments.dueDate).toLocaleDateString()}</p>
        <p>{assignments.completed ? 'Completed' : 'Not Completed'}</p>
        <button onClick={() => onEdit(assignments)}>Edit</button>
        <button onClick={() => onDelete(assignments.id!)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
  );
};

export default AssignmentDetails;
