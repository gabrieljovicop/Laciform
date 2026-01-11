import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function requiredEnv(key) {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export function getFirebaseConfig() {
  return {
    apiKey: requiredEnv("VITE_FIREBASE_API_KEY"),
    authDomain: requiredEnv("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: requiredEnv("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: requiredEnv("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: requiredEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: requiredEnv("VITE_FIREBASE_APP_ID")
  };
}

const app = initializeApp(getFirebaseConfig());

export const db = getFirestore(app);
export const auth = getAuth(app);