// app/api/get-attendance/route.js
import { NextResponse } from 'next/server';
import { getAttendanceFromDatabase } from '@/lib/database';

export async function GET() {
  try {
    const attendance = await getAttendanceFromDatabase();
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}
