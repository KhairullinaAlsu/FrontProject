'use client';
import { useEffect, useState } from 'react';
import AssignmentForm from './AssignmentForm';
import AssignmentList from './AssignmentList';

const Assignments = () => {
  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchAssignments = async () => {
    const res = await fetch('/api/assignments');
    const data = await res.json();
    setAssignments(data);
  };

  const handleAdd = () => {
    fetchAssignments();
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/assignments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchAssignments();
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
      <div>
        <h1>Assignments</h1>
        <AssignmentForm onAdd={handleAdd} />
        <AssignmentList assignments={assignments} onDelete={handleDelete} />
      </div>
  );
};

export default Assignments;
