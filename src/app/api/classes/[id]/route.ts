import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { id: id },
  });

  if (!course) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json(course);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const data = await request.json();

  const updatedCourse = await prisma.course.update({
    where: { id: id },
    data: data,
  });

  return NextResponse.json(updatedCourse);
}