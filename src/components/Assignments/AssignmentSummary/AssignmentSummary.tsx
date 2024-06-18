import React, {FC} from 'react';
import { Assignment } from '../.././Types/types';

interface CourseSummaryProps {
  course: Assignment;
  onShowDetails: (course: Assignment) => void;
}

const AssignmentSummary:FC<CourseSummaryProps> = ({ course, onShowDetails }) => {
  return (
      <div>
        <h2>{course.courseName}</h2>
        <button onClick={() => onShowDetails(course)}>Show Details</button>
      </div>
  );
};

export default AssignmentSummary;
