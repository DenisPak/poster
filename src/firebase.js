import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

export var firebaseConfig = {
  apiKey: "AIzaSyDK6U-xvByqMqZ7BdJgR2ZOv7rkbrff1u8",
  authDomain: "poster-b9efa.firebaseapp.com",
  databaseURL: "https://poster-b9efa.firebaseio.com",
  projectId: "poster-b9efa",
  storageBucket: "poster-b9efa.appspot.com",
  messagingSenderId: "1035863691664",
  appId: "1:1035863691664:web:84f3fb632f24f6321aa315",
  measurementId: "G-TLNMXG852F",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
