// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBK0vDTzUbIQWQK7hj5ely3Gz9dxd8w8eo",
  authDomain: "smartbudgettracker-4b915.firebaseapp.com",
  projectId: "smartbudgettracker-4b915",
  storageBucket: "smartbudgettracker-4b915.appspot.com",
  messagingSenderId: "594956308997",
  appId: "1:594956308997:web:8a5fcabce1fa9987bec26c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);