import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  const { name, course } = await request.json();

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

  const updatedUser = await prisma.user.update({
    where: { id: session.userId },
    data: {
      name,
      course,
    },
  });

  return NextResponse.json(updatedUser);
}