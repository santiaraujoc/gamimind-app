import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChplG0ASpBh8pjTOjW__tnb7H24e1Rwyo",
  authDomain: "gamimind-app.firebaseapp.com",
  databaseURL: "https://gamimind-app-default-rtdb.firebaseio.com/",
  projectId: "gamimind-app",
  storageBucket: "gamimind-app.firebasestorage.app",
  messagingSenderId: "727405652728",
  appId: "1:727405652728:web:92541bb170c1e6f871690d",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const database = getDatabase(app);
