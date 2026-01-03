// src/firebase.js

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Objek konfigurasi yang didapatkan dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB1dyXosG8ZB5isjZFHFY2JhIHy2yXDlpk",
  authDomain: "laciform.firebaseapp.com",
  databaseURL: "https://laciform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "laciform",
  storageBucket: "laciform.firebasestorage.app",
  messagingSenderId: "757408681322",
  appId: "1:757408681322:web:796311f3b435e4cb44a913",
  measurementId: "G-B4QLJHVJM8"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);