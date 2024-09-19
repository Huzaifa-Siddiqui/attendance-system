// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3B7ekorTBVZmRX7rONTjQ1okIp04fNjk",
    authDomain: "attendance-system-93377.firebaseapp.com",
    projectId: "attendance-system-93377",
    storageBucket: "attendance-system-93377.appspot.com",
    messagingSenderId: "1074368634283",
    appId: "1:1074368634283:web:265ea172a2cd84f2efc6ee"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
