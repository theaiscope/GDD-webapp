import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAen7Gl5wNj4i093UxlNCeIVa0IAnsj3Sk",
  authDomain: "aiscope-labeling-app.firebaseapp.com",
  databaseURL: "https://aiscope-labeling-app.firebaseio.com",
  projectId: "aiscope-labeling-app",
  storageBucket: "aiscope-labeling-app.appspot.com",
  messagingSenderId: "527665162827",
  appId: "1:527665162827:web:6e60533c2f6cef3ee27bce",
  measurementId: "G-H0PCHG58BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const config = getAuth(app);
