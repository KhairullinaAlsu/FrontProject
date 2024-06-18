"use client"

import { useRouter } from 'next/navigation';
import AssignmentForm from '@/components/Assignments/AssignmentsForm/AssignmentForm';
import {FC} from "react";

const NewCoursePage:FC = () => {
  const router = useRouter();

  return (
      <AssignmentForm
          onClose={() => router.push('/assignments')}
      />
  );
};

export default NewCoursePage;
