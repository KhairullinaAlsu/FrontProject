"use client"
import { useState, useEffect } from 'react';

type Assignment = {
  id: string;
  name: string;
  details: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  completed: 'no' | 'yes';
};

const AssignmentManager = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState<Assignment>({
    id: '',
    name: '',
    details: '',
    courseId: '',
    courseName: '',
    dueDate: '',
    completed: 'no',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/FrontProject/api/assignments')
        .then((res) => res.json())
        .then((data) => setAssignments(data));
  }, []);

  const addAssignment = async () => {
    const res = await fetch('/FrontProject/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAssignment),
    });
    if (res.ok) {
      const data = await res.json();
      setAssignments((prevAssignments) => [...prevAssignments, data]);
      setNewAssignment({
        id: '',
        name: '',
        details: '',
        courseId: '',
        courseName: '',
        dueDate: '',
        completed: 'no',
      });
      setError(null);
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  };

  const deleteAssignment = async (id: string) => {
    const res = await fetch('/api/assignments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setAssignments((prevAssignments) => prevAssignments.filter((assignment) => assignment.id !== id));
      setError(null);
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  };

  const editAssignment = async (assignment: Assignment) => {
    setEditMode(true);
    setNewAssignment(assignment);
  };

  const saveEditedAssignment = async () => {
    const res = await fetch('/api/assignments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAssignment),
    });
    if (res.ok) {
      const updatedAssignment = await res.json();
      const updatedAssignments = assignments.map((assignment) =>
          assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      );
      setAssignments(updatedAssignments);
      setNewAssignment({
        id: '',
        name: '',
        details: '',
        courseId: '',
        courseName: '',
        dueDate: '',
        completed: 'no',
      });
      setEditMode(false);
      setError(null);
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  };

  return (
      <div>
        <h1>Управление заданиями</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
            type="text"
            placeholder="ID"
            value={newAssignment.id}
            onChange={(e) => setNewAssignment({ ...newAssignment, id: e.target.value })}
            disabled={editMode}
        />
        <input
            type="text"
            placeholder="Название задания"
            value={newAssignment.name}
            onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
        />
        <input
            type="text"
            placeholder="Детали задания"
            value={newAssignment.details}
            onChange={(e) => setNewAssignment({ ...newAssignment, details: e.target.value })}
        />
        <input
            type="text"
            placeholder="ID курса"
            value={newAssignment.courseId}
            onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
        />
        <input
            type="text"
            placeholder="Название курса"
            value={newAssignment.courseName}
            onChange={(e) => setNewAssignment({ ...newAssignment, courseName: e.target.value })}
        />
        <input
            type="date"
            placeholder="Срок сдачи"
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
        />
        <select
            value={newAssignment.completed}
            onChange={(e) => setNewAssignment({ ...newAssignment, completed: e.target.value as 'no' | 'yes' })}
        >
          <option value="no">Нет</option>
          <option value="yes">Да</option>
        </select>
        {editMode ? (
            <button onClick={saveEditedAssignment}>Сохранить изменения</button>
        ) : (
            <button onClick={addAssignment}>Добавить задание</button>
        )}
        <ul>
          {assignments.map((assignment) => (
              <li key={assignment.id}>
                {assignment.name} (Курс: {assignment.courseName}) - {assignment.dueDate} - Завершено: {assignment.completed}
                <button onClick={() => editAssignment(assignment)}>Редактировать</button>
                <button onClick={() => deleteAssignment(assignment.id)}>Удалить</button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default AssignmentManager;