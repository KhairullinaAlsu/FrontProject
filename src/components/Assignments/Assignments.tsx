// app/page.tsx

import AddAssignmentForm from './AssignmentForm';
import AssignmentList from './AssignmentList';

export default function Home() {
  return (
      <div>
        <h1>Assignments</h1>
        <AddAssignmentForm />
        <AssignmentList />
      </div>
  );
}