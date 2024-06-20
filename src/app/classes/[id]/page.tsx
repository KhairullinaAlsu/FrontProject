"use client"

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ClassesDetails } from '@/components';
import { Course } from '@/components/Types/types';
import { FC } from 'react';

const fetcher = (url: string) => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const CoursePage: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: course, error } = useSWR<Course>(id ? `/api/classes/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!course) return <div className="spinner"></div>;

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/classes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      router.push('/classes');
    }
  };

  const handleEdit = (course: Course) => {
    router.push(`/classes/${id}/edit`);
  };

  return (
      <ClassesDetails
          courseId={course.id!}
          onClose={() => router.push('/classes')}
          onEdit={handleEdit}
          onDelete={handleDelete}
      />
  );
};

export default CoursePage;