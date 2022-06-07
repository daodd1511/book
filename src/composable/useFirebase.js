// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCki1BeWwdZ-rfX0BtL6bDzHYznVexP9Ek",
  authDomain: "book-catalogue-edb6a.firebaseapp.com",
  projectId: "book-catalogue-edb6a",
  storageBucket: "book-catalogue-edb6a.appspot.com",
  messagingSenderId: "1087125455011",
  appId: "1:1087125455011:web:f0441709deaa1215bfbf16",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
