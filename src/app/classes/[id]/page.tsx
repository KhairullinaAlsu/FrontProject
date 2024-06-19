"use client"

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import ClassesDetails from '@/components/Classes/ClassesDetails/ClassesDetails';
import { Course } from '@/components/Types/types';
import {FC} from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CoursePage:FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: courses, error } = useSWR<Course>(id ? `/api/classes/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  console.log(error)
  if (!courses) return <div className="spinner"></div>;

  const handleDelete = async (id: number) => {
    const response = await fetch('/api/classes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      router.push('/classes');
    }
  };

  const handleEdit = () => {
    router.push(`/classes/${id}/edit`);
  };

  return (
      <ClassesDetails courses={courses}
                         onClose={() => router.push('/classes')}
                         onEdit={handleEdit}
                         onDelete={handleDelete} />
  );
};

export default CoursePage;
