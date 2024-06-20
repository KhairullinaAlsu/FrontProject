// app/api/courses/[id]/route.ts

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

  const courseId = parseInt(params.id);
  if (isNaN(courseId)) {
    return NextResponse.json({ message: 'Bad Request: Invalid Course ID' }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: session.userId,
    },
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