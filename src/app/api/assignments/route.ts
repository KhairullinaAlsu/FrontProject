import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const assignments = await prisma.assignment.findMany();
  return NextResponse.json(assignments);
}

export async function POST(request: Request) {
  const data = await request.json();
  const assignment = await prisma.assignment.create({ data });
  return NextResponse.json(assignment);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.assignment.delete({ where: { id } });
  return NextResponse.json({ id });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const assignment = await prisma.assignment.update({
    where: { id },
    data,
  });
  return NextResponse.json(assignment);
}