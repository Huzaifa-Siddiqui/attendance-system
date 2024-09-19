'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [missingStudents, setMissingStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentsRes = await fetch('/api/get-students');
        const studentsData = await studentsRes.json();
        setStudents(studentsData);

        const attendanceRes = await fetch('/api/get-attendance');
        const attendanceData = await attendanceRes.json();
        setAttendanceData(attendanceData);

        const missingRes = await fetch('/api/get-missing-students');
        const missingData = await missingRes.json();
        setMissingStudents(missingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleRemoveStudent = async (studentId) => {
    try {
      const response = await fetch('/api/remove-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        alert('Student removed successfully');
        setStudents((prev) => prev.filter((student) => student.id !== studentId));
      } else {
        alert('Failed to remove student');
      }
    } catch (error) {
      console.error('Error removing student:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Enrolled Students</h2>
      <ul className="list-disc mb-4">
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.attendance_count} classes attended
            {student.missed_consecutive_classes > 1 && (
              <button
                onClick={() => handleRemoveStudent(student.id)}
                className="bg-red-500 text-white py-1 px-2 ml-4 rounded"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Missing Students</h2>
      <ul className="list-disc">
        {missingStudents.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}
