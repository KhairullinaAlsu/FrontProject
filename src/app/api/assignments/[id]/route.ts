// app/api/assignments/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const assignmentId = parseInt(params.id);
  if (isNaN(assignmentId)) {
    return NextResponse.json({ message: 'Bad Request: Invalid Assignment ID' }, { status: 400 });
  }

  const assignment = await prisma.assignment.findUnique({
    where: {
      id: assignmentId,
      userId: session.userId,
    },
  });

  if (!assignment) {
    return NextResponse.json({ message: 'Assignment not found' }, { status: 404 });
  }

  return NextResponse.json(assignment);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const data = await request.json();

  const updatedAssignment = await prisma.assignment.update({
    where: { id: id },
    data: data,
  });

  return NextResponse.json(updatedAssignment);
}