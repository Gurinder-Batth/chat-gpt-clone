import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let auth;
let signInWithGoogle;

if (firebaseConfig.apiKey) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      return token;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
}

export { auth, signInWithGoogle };
