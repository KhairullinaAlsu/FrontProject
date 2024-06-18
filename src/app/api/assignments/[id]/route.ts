import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const assignment = await prisma.assignment.findUnique({
    where: { id: id },
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