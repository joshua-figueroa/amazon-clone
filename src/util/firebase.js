import firebase from "firebase";

import firebaseConfig from "../config/firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

export { auth };
