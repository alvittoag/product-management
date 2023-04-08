// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-upBYdk4oNU7V6xdPw2FI6G47yMtXQGk",
  authDomain: "alterra-createproduct.firebaseapp.com",
  projectId: "alterra-createproduct",
  storageBucket: "alterra-createproduct.appspot.com",
  messagingSenderId: "569343343160",
  appId: "1:569343343160:web:2c8ba70dbdfad4963344cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
