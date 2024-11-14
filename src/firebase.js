// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/database'; // Altere para usar o Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAxrVoHGgSTyLbIis_uQFaNpWjZiO518Q0",
  authDomain: "erica-unhas-designer.firebaseapp.com",
  projectId: "erica-unhas-designer",
  storageBucket: "erica-unhas-designer.appspot.com",
  messagingSenderId: "179763257277",
  appId: "1:179763257277:web:b0f3adcd4f142660d77cd4",
  measurementId: "G-WYKT2WSXHM"
};

// Inicializa o Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Usando o Realtime Database
const db = firebaseApp.database(); // Alterado para acessar o Realtime Database

export { db }; 
