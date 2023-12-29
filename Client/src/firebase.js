// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "eclipse-estate.firebaseapp.com",
  projectId: "eclipse-estate",
  storageBucket: "eclipse-estate.appspot.com",
  messagingSenderId: "330300966873",
  appId: "1:330300966873:web:704bc695b052addebafbc8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
