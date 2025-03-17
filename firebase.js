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
  apiKey: "AIzaSyAi9kD7JqrOkqdWeVPlhedQeZQNNfkyVo8",
  authDomain: "pathfinder-2-c809a.firebaseapp.com",
  projectId: "pathfinder-2-c809a",
  storageBucket: "pathfinder-2-c809a.firebasestorage.app",
  messagingSenderId: "615445451997",
  appId: "1:615445451997:web:b6fb2ddebf0cc73a6c7734",
  measurementId: "G-KD1EDQP6XG"
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

