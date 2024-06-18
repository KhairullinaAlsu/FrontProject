import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Assignment = {
  id: string;
  name: string;
  details: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  completed: 'no' | 'yes';
};

const dataFilePath = path.join(process.cwd(), 'temp/assignments.json');

const readData = (): Assignment[] => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data: Assignment[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

export async function GET() {
  const assignments = readData();
  return NextResponse.json(assignments);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, name, details, courseId, courseName, dueDate, completed } = body;

  if (!id || !name || !details || !courseId || !courseName || !dueDate || !completed) {
    return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
  }

  const assignments = readData();
  const existingAssignment = assignments.find(assignment => assignment.id === id);
  if (existingAssignment) {
    return NextResponse.json({ error: 'Задание с таким ID уже существует' }, { status: 400 });
  }

  const newAssignment: Assignment = { id, name, details, courseId, courseName, dueDate, completed };
  assignments.push(newAssignment);
  writeData(assignments);

  return NextResponse.json(newAssignment, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, name, details, courseId, courseName, dueDate, completed } = body;

  if (!id || !name || !details || !courseId || !courseName || !dueDate || !completed) {
    return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
  }

  let assignments = readData();
  const index = assignments.findIndex(assignment => assignment.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Задание с таким ID не найдено' }, { status: 404 });
  }

  assignments[index] = { id, name, details, courseId, courseName, dueDate, completed };
  writeData(assignments);

  return NextResponse.json(assignments[index]);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID обязательно' }, { status: 400 });
  }

  let assignments = readData();
  assignments = assignments.filter(assignment => assignment.id !== id);
  writeData(assignments);

  return NextResponse.json({ message: 'Задание удалено' });
}