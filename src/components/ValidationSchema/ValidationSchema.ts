import * as yup from 'yup';

export const assignmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  details: yup.string().required('Details are required'),
  courseId: yup.number().required('Course ID is required').positive('Course ID must be a positive number'),
  courseName: yup.string().required('Course Name is required'),
  dueDate: yup.string().required('Due Date is required'),
  completed: yup.boolean().required('Completed status is required'),
});
