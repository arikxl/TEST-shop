// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAaiQ0w4xHoGKr7d6hsMTeh1ijQF_00Mc111",
    authDomain: "shop-admin-ae94c.firebaseapp.com",
    projectId: "shop-admin-ae94c",
    storageBucket: "shop-admin-ae94c.firebasestorage.app",
    messagingSenderId: "535912447363",
    appId: "1:535912447363:web:72770014c6fadf6f1c8ab6",
    measurementId: "G-2279G2CL29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, googleProvider, db };