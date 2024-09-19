// app/api/get-missing-students/route.js
import { NextResponse } from 'next/server';
import { getMissingStudentsFromDatabase } from '@/lib/database';

export async function GET() {
  try {
    const missingStudents = await getMissingStudentsFromDatabase();
    return NextResponse.json(missingStudents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch missing students' }, { status: 500 });
  }
}
