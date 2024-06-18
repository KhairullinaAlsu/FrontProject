import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const { rows } = await sql`SELECT * FROM assignments`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const data = await request.json();
  const { name, details, courseId, courseName, dueDate, completed } = data;
  const result = await sql`
    INSERT INTO assignments (name, details, courseId, courseName, dueDate, completed)
    VALUES (${name}, ${details}, ${courseId}, ${courseName}, ${dueDate}, ${completed})
    RETURNING *
  `;
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await sql`DELETE FROM assignments WHERE id = ${id}`;
  return NextResponse.json({ id });
}