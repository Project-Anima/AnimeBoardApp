import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-w2MQt2_3hAOhzUAYnWQiSsshELnYt58",
  authDomain: "fir-login-tutorial-3f7ae.firebaseapp.com",
  projectId: "fir-login-tutorial-3f7ae",
  storageBucket: "fir-login-tutorial-3f7ae.firebasestorage.app",
  messagingSenderId: "1047204139217",
  appId: "1:1047204139217:web:fa58e907411e05e9f275f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };