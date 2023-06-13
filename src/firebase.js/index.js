import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoZiW1ku-WtTtUludDMtOsIf-CqzNwmuQ",
  authDomain: "uber-672b0.firebaseapp.com",
  projectId: "uber-672b0",
  storageBucket: "uber-672b0.appspot.com",
  messagingSenderId: "1011152493896",
  appId: "1:1011152493896:web:0e0b58604321bcf883e77d"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth } 
 
