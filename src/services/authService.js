import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebaseConfig";
import { createUserProfile } from "./userService";
import { validateRegisterData, validateLoginData } from "../utils/validators";

// REGISTER

export async function registerUser(email, password, username, age, gender) {
  // Validación backend obligatoria
  validateRegisterData(email, password, username, age, gender);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await createUserProfile(user.uid, user.email, username, age, gender);

  return user;
}

// LOGIN

export async function loginUser(email, password) {
  validateLoginData(email, password);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
}

// LOGOUT

export async function logoutUser() {
  await signOut(auth);
}

// LISTENER DE SESIÓN

export function listenAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
