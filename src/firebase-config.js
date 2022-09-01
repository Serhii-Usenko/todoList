import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBoVlQSdiV8vx42rhej-gbZ6Dt1RRnc3Xk",
  authDomain: "todoapp-39099.firebaseapp.com",
  projectId: "todoapp-39099",
  storageBucket: "todoapp-39099.appspot.com",
  messagingSenderId: "418132823241",
  appId: "1:418132823241:web:c4d95e9ca7aa0582fd5118"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};