// app/api/remove-student/route.js
import { NextResponse } from 'next/server';
import { removeStudentFromDatabase } from '@/lib/database';

export async function POST(req) {
  const { studentId } = await req.json();
  try {
    await removeStudentFromDatabase(studentId);
    return NextResponse.json({ message: 'Student removed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove student' }, { status: 500 });
  }
}
