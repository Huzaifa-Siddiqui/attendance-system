import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

// Get students from Firestore
export async function getStudentsFromDatabase() {
  const studentsCollection = collection(db, 'students');
  const studentSnapshot = await getDocs(studentsCollection);
  return studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add students to Firestore
export async function addStudentsToDatabase(students) {
  const promises = students.map(student => addDoc(collection(db, 'students'), student));
  return Promise.all(promises);
}

// Get attendance from Firestore
export async function getAttendanceFromDatabase() {
  const attendanceCollection = collection(db, 'attendance');
  const attendanceSnapshot = await getDocs(attendanceCollection);
  return attendanceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Remove student from Firestore
export async function removeStudentFromDatabase(studentId) {
  await deleteDoc(doc(db, 'students', studentId));
}
