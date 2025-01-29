// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAecFX3b_qGBV_NuAj3OKvrgK6G-mNIyp4",
  authDomain: "dashboard-d2d1d.firebaseapp.com",
  projectId: "dashboard-d2d1d",
  storageBucket: "dashboard-d2d1d.firebasestorage.app",
  messagingSenderId: "567947667102",
  appId: "1:567947667102:web:7545999d039fd6d7b8fd8f",
  measurementId: "G-GY0BQQESXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db, collection, addDoc, getDocs, updateDoc, doc, onSnapshot };