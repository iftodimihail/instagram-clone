import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyB8fwfegUyovWZjCfIWNy7mG5LX1wwx8MY",
  authDomain: "instagram-clone-de8dd.firebaseapp.com",
  projectId: "instagram-clone-de8dd",
  storageBucket: "instagram-clone-de8dd.appspot.com",
  messagingSenderId: "571985870977",
  appId: "1:571985870977:web:d73aaa510dd90d31f8cd80",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

export { auth, db, storage };

export default firebase;
