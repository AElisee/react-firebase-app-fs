import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-firebase-redux-e9b13.firebaseapp.com",
  projectId: "react-firebase-redux-e9b13",
  storageBucket: "react-firebase-redux-e9b13.appspot.com",
  messagingSenderId: "1043224611120",
  appId: "1:1043224611120:web:6e1e4f9d270ea3718160f5",
});
export const auth = app.auth();
export default app;
