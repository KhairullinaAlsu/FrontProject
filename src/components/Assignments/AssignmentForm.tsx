import { useState } from 'react';

const AssignmentForm = ({ onAdd }: { onAdd: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    courseId: '',
    courseName: '',
    dueDate: '',
    completed: 'no',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: Date.now().toString() }),
    });
    onAdd();
    setFormData({
      name: '',
      details: '',
      courseId: '',
      courseName: '',
      dueDate: '',
      completed: 'no',
    });
  };

  return (
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Assignment Name" value={formData.name} onChange={handleChange} required />
        <input name="details" placeholder="Assignment Details" value={formData.details} onChange={handleChange} required />
        <input name="courseId" placeholder="Course ID" value={formData.courseId} onChange={handleChange} required />
        <input name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} required />
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        <select name="completed" value={formData.completed} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <button type="submit">Add Assignment</button>
      </form>
  );
};

export default AssignmentForm;
