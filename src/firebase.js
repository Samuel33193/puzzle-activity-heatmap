import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDak2VJGg5smfFhsqwJiLgHWpDogo08mkU",
  authDomain: "puzzle-heatmap.firebaseapp.com",
  projectId: "puzzle-heatmap",
  storageBucket: "puzzle-heatmap.firebasestorage.app",
  messagingSenderId: "863628130813",
  appId: "1:863628130813:web:b83b49375e9ecb77d54194"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);