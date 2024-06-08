
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log('firebase', import.meta.env.VITE_FIREBASE_API_KEY)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	// apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //the format if you want to hide in env file.
	//Check this lik
	//https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);