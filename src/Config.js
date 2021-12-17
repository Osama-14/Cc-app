import firebase from "firebase/compat/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getStorage, ref } from "firebase/storage";
import { collection, addDoc, getDocs, getFirestore, doc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCECVYxTfIj6lpO883lVXhot4iBTm0DlYw",
  authDomain: "internship-chatapplicatoion.firebaseapp.com",
  projectId: "internship-chatapplicatoion",
  storageBucket: "internship-chatapplicatoion.appspot.com",
  messagingSenderId: "596050273241",
  appId: "1:596050273241:web:59beb6c21f171e4b9b6fc8",
  measurementId: "G-F7X173S0J9",
};
firebase.initializeApp(firebaseConfig);

const storage = getStorage();


const db = getFirestore();

const auth = getAuth();
const user = auth.currentUser;

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
  signOut,
  db,
  collection,
  addDoc,
  storage,
  ref,
  getDocs,
  doc,
  query,
  where,
};
