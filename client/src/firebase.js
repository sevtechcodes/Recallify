
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFPmFSRbXgi3Nomb0ZyOexLnVNKM-4avc",
  authDomain: "recallify-89e6d.firebaseapp.com",
  projectId: "recallify-89e6d",
  storageBucket: "recallify-89e6d.appspot.com",
  messagingSenderId: "1083551162971",
  appId: "1:1083551162971:web:e6449cc7787456382bd57e",
  measurementId: "G-YN934H65PD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
