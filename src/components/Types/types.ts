export interface Assignment {
  id?: number;
  name: string;
  details: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  completed: boolean;
}

export interface Course{
  id?: number;
  name: string;
  courseId: string;
  courseDescription: string;
  category: string;
  scheduleDay: string;
  period: string;
  hoursStart: string;
  hoursEnd: string;
}