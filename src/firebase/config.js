import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr7XeHu-77DiYpJaKtfObo8BEOtUaBMHc",
  authDomain: "solterinders.firebaseapp.com",
  projectId: "solterinders",
  storageBucket: "solterinders.appspot.com",
  messagingSenderId: "950430812906",
  appId: "1:950430812906:web:11089e6689122f420ee593",
  measurementId: "G-GPZRPLLMRG"
};

initializeApp(firebaseConfig)
const auth = getAuth()


export {auth}