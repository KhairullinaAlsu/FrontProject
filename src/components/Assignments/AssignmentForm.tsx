"use client"

import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AssignmentForm = () => {
  const { mutate } = useSWR('/api/assignments', fetcher);
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    courseId: '',
    courseName: '',
    dueDate: '',
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      mutate(); // обновление данных после добавления
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="details" placeholder="Details" onChange={handleChange} />
        <input type="text" name="courseId" placeholder="Course ID" onChange={handleChange} />
        <input type="text" name="courseName" placeholder="Course Name" onChange={handleChange} />
        <input type="date" name="dueDate" onChange={handleChange} />
        <label>
          Completed:
          <input type="checkbox" name="completed" onChange={handleChange} />
        </label>
        <button type="submit">Add Assignment</button>
      </form>
  );
};

export default AssignmentForm;