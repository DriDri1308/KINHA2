// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAxrVoHGgSTyLbIis_uQFaNpWjZiO518Q0",
  authDomain: "erica-unhas-designer.firebaseapp.com",
  projectId: "erica-unhas-designer",
  storageBucket: "erica-unhas-designer.appspot.com",
  messagingSenderId: "179763257277",
  appId: "1:179763257277:web:b0f3adcd4f142660d77cd4",
  measurementId: "G-WYKT2WSXHM"
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Usando o Realtime Database
const db = getDatabase(firebaseApp);

export { db, ref, push, set };
