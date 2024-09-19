// app/api/get-students/route.js
import { NextResponse } from 'next/server';
import { getStudentsFromDatabase } from '@/lib/database';

export async function GET() {
  try {
    const students = await getStudentsFromDatabase();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
