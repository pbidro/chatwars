import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvk4LyiTQ_ZHJQJJD63GGlIeky0LIAtTk",
  authDomain: "chatwars-beta.firebaseapp.com",
  projectId: "chatwars-beta",
  storageBucket: "chatwars-beta.appspot.com",
  messagingSenderId: "532881814784",
  appId: "1:532881814784:web:28b233bfd4b18c9174efe5"
};

initializeApp(firebaseConfig)
const auth = getAuth()


export {auth}