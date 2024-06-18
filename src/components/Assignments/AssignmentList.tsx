const AssignmentList = ({ assignments, onDelete }: { assignments: any[], onDelete: (id: string) => void }) => {
  return (
      <ul>
        {assignments.map((assignment) => (
            <li key={assignment.id}>
              {assignment.name} - {assignment.details} - {assignment.courseName} - {assignment.dueDate} - {assignment.completed}
              <button onClick={() => onDelete(assignment.id)}>Delete</button>
            </li>
        ))}
      </ul>
  );
};

export default AssignmentList;
