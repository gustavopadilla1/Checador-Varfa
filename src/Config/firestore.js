import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDjemGeMK3dXDNIzqkjiiBEoOreRc2_2oA",
  authDomain: "checador-97e97.firebaseapp.com",
  projectId: "checador-97e97",
  storageBucket: "checador-97e97.appspot.com",
  messagingSenderId: "556181589982",
  appId: "1:556181589982:web:e8004c1fa9cc94726f574f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 