import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCiIjpYf1OrJbZezvWzQJIxwuqNnkA8OE0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kumbhseva-a1172.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kumbhseva-a1172",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kumbhseva-a1172.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "357892305281",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:357892305281:web:95a94677fdd5020c78b880"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
