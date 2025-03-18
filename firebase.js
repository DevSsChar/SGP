// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9Vy0y7KEQ-DQ42vxFLf1bDofX1iw0VIs",
  authDomain: "pathfinder-fa511.firebaseapp.com",
  projectId: "pathfinder-fa511",
  storageBucket: "pathfinder-fa511.firebasestorage.app",
  messagingSenderId: "617511149300",
  appId: "1:617511149300:web:a0876d4d6d89656a2688a1",
  measurementId: "G-W1RZEXLT6B"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Enable phone authentication
auth.useDeviceLanguage();

// Initialize analytics only in production
let analytics = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

export { auth, analytics };

