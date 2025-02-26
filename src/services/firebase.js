import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ เพิ่ม Firestore Database

const firebaseConfig = {
  apiKey: "AIzaSyD3fKnhvyVNEWgE6lmgRtVsBZFSBjJdOOA",
  authDomain: "project-finalmbw.firebaseapp.com",
  projectId: "project-finalmbw",
  storageBucket: "project-finalmbw.appspot.com",
  messagingSenderId: "742173296191",
  appId: "1:742173296191:web:91474e78e2c39275725a8a",
  measurementId: "G-MNXL2CMT5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // ✅ เพิ่ม Firestore Database
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup, signOut }; // ✅ Export `db`
