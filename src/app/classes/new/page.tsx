"use client"

import { useRouter } from 'next/navigation';
import {FC} from "react";
import {ClassesForm} from "@/components/Classes/ClassesForm";

const NewCoursePage:FC = () => {
  const router = useRouter();

  return (
      <ClassesForm
          onClose={() => router.push('/classes')}
      />
  );
};

export default NewCoursePage;
