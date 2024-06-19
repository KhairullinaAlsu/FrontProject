"use client"

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import AssignmentDetails from '@/components/Assignments/AssignmentDetails/AssignmentDetails';
import { Assignment } from '@/components/Types/types';
import {FC} from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CoursePage:FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: assignments, error } = useSWR<Assignment>(id ? `/api/assignments/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  console.log(error)
  if (!assignments) return <div className="spinner"></div>;

  const handleDelete = async (id: number) => {
    const response = await fetch('/api/assignments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
      <AssignmentDetails assignments={assignments}
                         onClose={() => router.push('/assignments')}
                         onEdit={handleEdit}
                         onDelete={handleDelete} />
  );
};

export default CoursePage;
