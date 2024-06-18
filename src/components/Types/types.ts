export interface Assignment {
  id?: number;
  name: string;
  details: string;
  courseId: number;
  courseName: string;
  dueDate: string;
  completed: boolean;
}