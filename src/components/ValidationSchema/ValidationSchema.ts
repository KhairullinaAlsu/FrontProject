import * as yup from 'yup';

export const assignmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  details: yup.string(),
  courseId: yup.string().required('Course ID is required'),
  courseName: yup.string().required('Course Name is required'),
  dueDate: yup.string().required('Due Date is required'),
  completed: yup.boolean().required('Completed status is required'),
});

export const classSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  courseId: yup.string().required('Course ID is required'),
  courseDescription: yup.string(),
  category: yup.string().required('Category is required'),
  scheduleDay: yup.string().required('Schedule Day is required'),
  period: yup.string().required('Period is required'),
  hoursStart: yup.string().required('Hours Start is required'),
  hoursEnd: yup.string().required('Hours End is required'),
});