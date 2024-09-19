import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { addStudentsToDatabase } from '@/lib/database';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const fileContents = await file.arrayBuffer();
    const buffer = Buffer.from(fileContents);

    // Parse CSV
    const students = [];
    const parser = parse(buffer.toString(), { columns: true });

    parser.on('readable', () => {
      let record;
      while ((record = parser.read())) {
        students.push({
          name: record['Name'],
          whatsapp_contact: record['whatsapp contact'],
          college_university: record['college/university/education']
        });
      }
    });

    parser.on('end', async () => {
      try {
        await addStudentsToDatabase(students);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      } catch (err) {
        console.error('Error adding students to database:', err);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
      }
    });

    parser.on('error', (err) => {
      console.error('Error parsing CSV:', err);
      return new Response(JSON.stringify({ error: 'Error parsing CSV' }), { status: 500 });
    });

    parser.end();

  } catch (error) {
    console.error('Error handling file upload:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
  }
}
