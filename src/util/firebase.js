import firebase from "firebase";

import firebaseConfig from "../config/firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
