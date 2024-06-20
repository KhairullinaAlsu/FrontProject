"use client"

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { AssignmentDetails } from '@/components';
import { Assignment } from '@/components/Types/types';
import {FC} from "react";

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  let res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await res.json();
};
const CoursePage:FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: assignments, error } = useSWR<Assignment>(id ? `/api/assignments/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  console.log(error)
  if (!assignments) return <div className="spinner"></div>;

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/assignments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      router.push('/assignments');
    }
  };

  const handleEdit = () => {
    router.push(`/assignments/${id}/edit`);
  };

  return (
      <AssignmentDetails assignmentId={assignments.id!}
                         onClose={() => router.push('/assignments')}
                         onEdit={handleEdit}
                         onDelete={handleDelete} />
  );
};

export default CoursePage;
