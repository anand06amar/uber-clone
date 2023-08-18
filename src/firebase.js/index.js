import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { getMessaging } from 'firebase/messaging';




const firebaseConfig = {
  apiKey: "AIzaSyBkEXJiZehelraKDd10ddgQXuPW0hnL6IU",
  authDomain: "uberclone-f48fc.firebaseapp.com",
  projectId: "uberclone-f48fc",
  storageBucket: "uberclone-f48fc.appspot.com",
  messagingSenderId: "906017353127",
  appId: "1:906017353127:web:37e923eeeb2463f62e9a82"

};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

const db = getFirestore(app);
const auth = getAuth(app);



export { app, analytics, db, auth, messaging };
export default firebase;