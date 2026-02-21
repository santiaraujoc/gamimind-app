import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChplG0ASpBh8pjTOjW__tnb7H24e1Rwyo",
  authDomain: "gamimind-app.firebaseapp.com",
  projectId: "gamimind-app",
  storageBucket: "gamimind-app.firebasestorage.app",
  messagingSenderId: "727405652728",
  appId: "1:727405652728:web:92541bb170c1e6f871690d",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
