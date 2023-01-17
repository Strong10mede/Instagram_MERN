import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDHbPL9Z0uSyq8xKR21NfbTfEidHnU-_FA",
  authDomain: "instagram-mern-1da4d.firebaseapp.com",
  projectId: "instagram-mern-1da4d",
  storageBucket: "instagram-mern-1da4d.appspot.com",
  messagingSenderId: "448473829381",
  appId: "1:448473829381:web:d1a695b5b0bf6a65b6cc6c",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
//image upload
const storage = firebase.storage();

export { db, auth, storage };
