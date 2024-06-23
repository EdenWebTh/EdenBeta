import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTXNvRPZR5z1jUkJfwbP_kAxMK4j1giMA",
  authDomain: "edenweb-ba134.firebaseapp.com",
  projectId: "edenweb-ba134",
  storageBucket: "edenweb-ba134.appspot.com",
  messagingSenderId: "133687269890",
  appId: "1:133687269890:web:48d362224335a98be4a51b",
  measurementId: "G-W05T973SVJ"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;