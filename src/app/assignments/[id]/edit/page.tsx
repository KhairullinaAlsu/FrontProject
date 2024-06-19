"use client"

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { AssignmentForm } from '@/components/Assignments/AssignmentsForm';
import { Assignment } from '@/components/Types/types';
import {FC} from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditCoursePage: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: assignments, error} = useSWR<Assignment>(id ? `/api/assignments/${id}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!assignments) return <div className="spinner"></div>;

  return (
      <AssignmentForm
          assignment={assignments}
          onClose={() => router.push(`/assignments/${id}`)}
      />
  );
};

export default EditCoursePage;
