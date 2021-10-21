// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBeOWqrRmLIbq4qjo1tSD7PNRUnCPhdFeM",
  authDomain: "instagram-e5960.firebaseapp.com",
  projectId: "instagram-e5960",
  storageBucket: "instagram-e5960.appspot.com",
  messagingSenderId: "716635861782",
  appId: "1:716635861782:web:68f7d5bba924e22d6bd637",
  measurementId: "G-7VCGY35G9J",
};

firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();

export default firebase.auth;
