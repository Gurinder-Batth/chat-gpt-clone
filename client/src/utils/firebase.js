import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_PUBLIC_FIREBASE_APP_ID,
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export { auth, signInWithGoogle };
