"use client"

import { useState } from 'react';
import AssignmentList from './AssignmentsList/AssignmentList';

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
      <div>
        <h1>Assignments</h1>
        <AssignmentList />
      </div>
  );
}
