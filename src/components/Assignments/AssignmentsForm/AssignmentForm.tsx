"use client"

import React, {FC, useEffect} from 'react';
import useSWR from 'swr';
import {Assignment} from "@/components/Types/types";
import {useFormik} from "formik";
import {assignmentSchema} from "@/components/ValidationSchema/ValidationSchema";
import styles from "./AssignmentsForm.module.css"

interface AssignmentFormProps {
  assignment?: Assignment;
  onClose: () => void;
}


const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  let res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await res.json();
};
const AssignmentForm:FC<AssignmentFormProps> = ({ assignment, onClose }) => {
  const { mutate} = useSWR('/api/assignments', fetcher);


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
      const token = localStorage.getItem('token');
      const method = assignment ? 'PUT' : 'POST';
      const response = await fetch(`/api/assignments${assignment ? `/${assignment.id}` : ''}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        await mutate();
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
      <>
        <h1 className="header">Edit</h1>
        <form onSubmit={formik.handleSubmit} className={styles.container}>
          <div className={styles.box}>
            <div className={styles.form}>
              <div>
                {formik.touched.courseName && formik.errors.courseName ? (
                    <div className={styles.error}>{formik.errors.courseName}</div>
                ) : null}
                <label>Assignment Name: </label>
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={formik.values.courseName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.name && formik.errors.name ? (
                    <div className={styles.error}>{formik.errors.name}</div>
                ) : null}
                <label>Name Assignment: </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name Assignment"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <label>Description: </label>
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
                {formik.touched.courseId && formik.errors.courseId ? (
                    <div className={styles.error}>{formik.errors.courseId}</div>
                ) : null}
                <label>Course ID: </label>
                <input
                    type="text"
                    name="courseId"
                    placeholder="Course ID"
                    value={formik.values.courseId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.dueDate && formik.errors.dueDate ? (
                    <div className={styles.error}>{formik.errors.dueDate}</div>
                ) : null}
                <label>Due Date: </label>
                <input
                    type="date"
                    name="dueDate"
                    value={formik.values.dueDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.completed && formik.errors.completed ? (
                    <div className={styles.error}>{formik.errors.completed}</div>
                ) : null}
                <label>
                  Completed
                  <div className={styles.checkbox_container}>
                    <input
                        type="checkbox"
                        name="completed"
                        checked={formik.values.completed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className={styles.checkbox}></span>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.buttons}>
              <button type="submit">{assignment ? 'Update' : 'Add'} Assignment</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </form>
      </>

  );
};

export default AssignmentForm;