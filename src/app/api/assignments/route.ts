import { NextResponse } from 'next/server';
import { readAssignments, writeAssignments } from '@/lib/fileUtils';

// GET method to retrieve assignments
export async function GET() {
  const assignments = readAssignments();
  return NextResponse.json(assignments);
}

// POST method to add a new assignment
export async function POST(req: Request) {
  const newAssignment = await req.json();
  const assignments = readAssignments();
  assignments.push(newAssignment);
  writeAssignments(assignments);
  return NextResponse.json({ message: 'Assignment added successfully!' });
}

// DELETE method to delete an assignment
export async function DELETE(req: Request) {
  const { id } = await req.json();
  let assignments = readAssignments();
  assignments = assignments.filter((assignment: any) => assignment.id !== id);
  writeAssignments(assignments);
  return NextResponse.json({ message: 'Assignment deleted successfully!' });
}
