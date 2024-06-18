export interface Assignment {
  id?: number;
  name: string;
  details: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  completed: boolean;
}