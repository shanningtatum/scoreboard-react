// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,

//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {

  apiKey: "AIzaSyAnN5ZAjzXIH5JB3k7cSzd20XK0RXVgiIY",

  authDomain: "scoreboard-restore.firebaseapp.com",

  databaseURL: "https://scoreboard-restore-default-rtdb.firebaseio.com",

  projectId: "scoreboard-restore",

  storageBucket: "scoreboard-restore.appspot.com",

  messagingSenderId: "90360198903",

  appId: "1:90360198903:web:0e0b85e7e0553b4db945f2"

};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export default firebase;
