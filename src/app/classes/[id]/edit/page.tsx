"use client"

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Course } from '@/components/Types/types';
import { FC } from "react";
import { ClassesForm } from "@/components";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditCoursePage: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: course, error} = useSWR<Course>(id ? `/api/classes/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!course) return <div className="spinner"></div>;

  return (
      <ClassesForm
          course={course}
          onClose={() => router.push(`/classes/${id}`)}
      />
  );
};

export default EditCoursePage;
