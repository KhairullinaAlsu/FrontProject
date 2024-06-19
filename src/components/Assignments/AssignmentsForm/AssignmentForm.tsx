"use client"

import React, {FC, useEffect} from 'react';
import useSWR from 'swr';
import {Assignment} from "@/components/Types/types";
import {useFormik} from "formik";
import {assignmentSchema} from "@/components/ValidationSchema/ValidationSchema";

interface AssignmentFormProps {
  assignment?: Assignment;
  onClose: () => void;
}


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AssignmentForm:FC<AssignmentFormProps> = ({ assignment, onClose }) => {
  const { mutate } = useSWR('/api/assignments', fetcher);
  const formik = useFormik({
    initialValues: {
      name: '',
      details: '',
      courseId: '',
      courseName: '',
      dueDate: '',
      completed: false,
    },
    validationSchema: assignmentSchema,
    onSubmit: async (values) => {
      const method = assignment ? 'PUT' : 'POST';
      const response = await fetch(`/api/assignments${assignment ? `/${assignment.id}` : ''}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        mutate();
        onClose();
      }
    },
  });


  useEffect(() => {
    if (assignment) {
      formik.setValues(assignment);
    }
  }, [assignment]);


  return (
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formik.values.courseName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />
          {formik.touched.courseName && formik.errors.courseName ? (
              <div>{formik.errors.courseName}</div>
          ) : null}
        </div>
        <div>
          <input
              type="text"
              name="name"
              placeholder="NameAssignment"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <input
              type="text"
              name="details"
              placeholder="Detals"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <input
              type="text"
              name="courseId"
              placeholder="Course ID"
              value={formik.values.courseId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />
          {formik.touched.courseId && formik.errors.courseId ? (
              <div>{formik.errors.courseId}</div>
          ) : null}
        </div>
        <div>
          <input
              type="date"
              name="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
              <div>{formik.errors.dueDate}</div>
          ) : null}
        </div>
        <div>
          <label>
            Completed
            <input
                type="checkbox"
                name="completed"
                checked={formik.values.completed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.completed && formik.errors.completed ? (
              <div>{formik.errors.completed}</div>
          ) : null}
        </div>
        <button type="submit">{assignment ? 'Update' : 'Add'} Assignment</button>
        <button onClick={onClose}>Close</button>
      </form>
  );
};

export default AssignmentForm;