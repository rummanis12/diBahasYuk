// akun.js - Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3mi-YRo6kmN7IQtTeyOrA30Qmo84SBWM",
  authDomain: "dibahasyuk-31726.firebaseapp.com",
  databaseURL: "https://dibahasyuk-31726-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dibahasyuk-31726",
  storageBucket: "dibahasyuk-31726.firebasestorage.app",
  messagingSenderId: "812712834064",
  appId: "1:812712834064:web:b65643f552f3aa4d43c695"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, database, provider };

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

