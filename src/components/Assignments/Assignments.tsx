"use client"

import AssignmentList from './AssignmentsList/AssignmentList';

export default function Home() {

  return (
      <div>
        <h1 className="header">Assignments</h1>
        <AssignmentList />
      </div>
  );
}
