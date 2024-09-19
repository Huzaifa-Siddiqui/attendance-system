import { NextResponse } from 'next/server';
import csvParse from 'papaparse';
import { getDatabaseConnection } from '@/lib/database';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const file = req.body;

    // Parse the CSV file
    const csvData = await new Promise((resolve, reject) => {
      csvParse.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });

    // Get the database connection
    const db = getDatabaseConnection();

    // Insert the CSV data into the database
    const insert = db.prepare('INSERT INTO attendance (student_id, date) VALUES (?, ?)');

    csvData.forEach((row) => {
      // Assuming the CSV has columns 'student_name' and 'date'
      const student = db.prepare('SELECT id FROM students WHERE name = ?').get(row.student_name);
      if (student) {
        insert.run(student.id, row.date);
      }
    });

    return NextResponse.json({ message: 'Attendance data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading attendance data:', error);
    return NextResponse.json({ error: 'Failed to upload attendance data' }, { status: 500 });
  }
}
