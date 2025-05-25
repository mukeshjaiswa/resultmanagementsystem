// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjX3RiOcnIU0RUfHtlPdlQ5beKxzyeGvA",
    authDomain: "result-b560c.firebaseapp.com",
    projectId: "result-b560c",
    storageBucket: "result-b560c.firebasestorage.app",
    messagingSenderId: "30837227069",
    appId: "1:30837227069:web:426bdfd4d57c6eaecb3454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const db==get