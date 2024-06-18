"use client"
// app/components/AssignmentList.tsx

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AssignmentList = () => {
  const { data: assignments, error, mutate } = useSWR('/api/assignments', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!assignments) return <div>Loading...</div>;

  const handleDelete = async (id: number) => {
    const response = await fetch('/api/assignments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      mutate(); // обновление данных после удаления
    }
  };

  return (
      <div>
        {assignments.map((assignment:any) => (
            <div key={assignment.id}>
              <h2>{assignment.name}</h2>
              <p>{assignment.details}</p>
              <p>{assignment.courseName}</p>
              <p>{new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p>{assignment.completed ? 'Completed' : 'Not Completed'}</p>
              <button onClick={() => handleDelete(assignment.id)}>Delete</button>
            </div>
        ))}
      </div>
  );
};

export default AssignmentList;