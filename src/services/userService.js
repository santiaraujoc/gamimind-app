import { ref, set } from "firebase/database";
import { database } from "./firebaseConfig";

export const createUserProfile = async (
  userId,
  email,
  username,
  age,
  gender,
) => {
  const userRef = ref(database, `users/${userId}`);

  await set(userRef, {
    email: email,
    username: username,
    age: age,
    gender: gender,
    createdAt: new Date().toISOString(),
    stats: {
      streak: 0,
      totalEmotions: 0,
      lastEmotionDate: "",
    },
  });
};
