// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbFAWa_ZV-YMKsd1wDiSBdNw5JYfCgDew",
  authDomain: "beechwood-baby.firebaseapp.com",
  projectId: "beechwood-baby",
  storageBucket: "beechwood-baby.appspot.com",
  messagingSenderId: "386361979634",
  appId: "1:386361979634:web:2eb279b1fa7de400bdd66b",
  measurementId: "G-Y68NDHSQHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
