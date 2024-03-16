// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "booklendr.firebaseapp.com",
  projectId: "booklendr",
  storageBucket: "booklendr.appspot.com",
  messagingSenderId: "255238830182",
  appId: "1:255238830182:web:66daa433b47c903a2b95a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);