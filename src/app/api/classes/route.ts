import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const course = await prisma.course.findMany();
  return NextResponse.json(course);
}

export async function POST(request: Request) {
  const data = await request.json();
  const course = await prisma.course.create({ data });
  return NextResponse.json(course);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ id });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const course = await prisma.course.update({
    where: { id },
    data,
  });
  return NextResponse.json(course);
}