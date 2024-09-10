// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc30FsqDRJVJepzRSvFkn3U4Z4XR-Gz1c",
  authDomain: "m25-projects.firebaseapp.com",
  projectId: "m25-projects",
  storageBucket: "m25-projects.appspot.com",
  messagingSenderId: "1097428901500",
  appId: "1:1097428901500:web:65ead99291e4addbcd73f9",
  measurementId: "G-ZY46357QFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const  storage = getStorage(app)