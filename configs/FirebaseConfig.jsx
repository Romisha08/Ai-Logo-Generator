// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-gen-e722e.firebaseapp.com",
  projectId: "ai-logo-gen-e722e",
  storageBucket: "ai-logo-gen-e722e.firebasestorage.app",
  messagingSenderId: "981345685788",
  appId: "1:981345685788:web:4826e027b050c24528aad9",
  measurementId: "G-F3SRMJMDJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)