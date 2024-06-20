"use client"

import React, {FC, useEffect} from 'react';
import useSWR from 'swr';
import {Course} from "@/components/Types/types";
import {useFormik} from "formik";
import {classSchema} from "@/components/ValidationSchema/ValidationSchema";
import styles from "./ClassesForm.module.css"

interface ClassesFormProps {
  course?: Course;
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

const ClassesForm:FC<ClassesFormProps> = ({ course, onClose }) => {
  const { mutate} = useSWR('/api/classes', fetcher);


  const formik = useFormik({
    initialValues: {
      name: '',
      courseId: '',
      courseDescription: '',
      category: '',
      scheduleDay: '',
      period: '',
      hoursStart: '',
      hoursEnd: '',
    },
    validationSchema: classSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      const method = course ? 'PUT' : 'POST';
      const response = await fetch(`/api/classes${course ? `/${course.id}` : ''}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
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
    if (course) {
      formik.setValues(course);
    }
  }, [course]);


  return (
      <>
        <h1 className="header">Edit</h1>
        <form onSubmit={formik.handleSubmit} className={styles.container}>
          <div className={styles.box}>
            <div className={styles.form}>
              <div>
                {formik.touched.name && formik.errors.name ? (
                    <div className={styles.error}>{formik.errors.name}</div>
                ) : null}
                <label>Course Name: </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Course Name"
                    value={formik.values.name}
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
                <label>Course Description: </label>
                <input
                    type="text"
                    name="courseDescription"
                    placeholder="Course Description"
                    value={formik.values.courseDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.category && formik.errors.category ? (
                    <div className={styles.error}>{formik.errors.category}</div>
                ) : null}
                <label>Category: </label>
                <input
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.scheduleDay && formik.errors.scheduleDay ? (
                    <div className={styles.error}>{formik.errors.scheduleDay}</div>
                ) : null}
                <label>Schedule Day: </label>
                <input
                    type="text"
                    placeholder="Schedule Day"
                    name="scheduleDay"
                    value={formik.values.scheduleDay}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.period && formik.errors.period ? (
                    <div className={styles.error}>{formik.errors.period}</div>
                ) : null}
                <label>Period: </label>
                <input
                    type="text"
                    placeholder="Period"
                    name="period"
                    value={formik.values.period}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.hoursStart && formik.errors.hoursStart ? (
                    <div className={styles.error}>{formik.errors.hoursStart}</div>
                ) : null}
                <label>Hours Start: </label>
                <input
                    type="text"
                    placeholder="Hours Start"
                    name="hoursStart"
                    value={formik.values.hoursStart}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.hoursEnd && formik.errors.hoursEnd ? (
                    <div className={styles.error}>{formik.errors.hoursEnd}</div>
                ) : null}
                <label>Hours End: </label>
                <input
                    type="text"
                    placeholder="Hours End"
                    name="hoursEnd"
                    value={formik.values.hoursEnd}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className={styles.buttons}>
              <button type="submit">{course ? 'Update' : 'Add'} Course</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </form>
      </>

  );
};

export default ClassesForm;