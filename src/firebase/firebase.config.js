import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAV0dpJpvehZhXALtp-EERI93kNm-o-gYg",
  authDomain: "xmplumclient.firebaseapp.com",
  projectId: "xmplumclient",
  storageBucket: "xmplumclient.firebasestorage.app",
  messagingSenderId: "320232001766",
  appId: "1:320232001766:web:217f00250596227c50ab27"
};


export const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;