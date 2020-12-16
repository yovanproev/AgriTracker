import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/database"
import { lastUserId } from './FetchUsersFromFirestore';
import React from "react"

const config = {
    apiKey: "AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI",
    authDomain: "input-output-data.firebaseapp.com",
    databaseURL: "https://input-output-data.firebaseio.com",
    projectId: "input-output-data",
    storageBucket: "input-output-data.appspot.com",
    messagingSenderId: "418639019373",
    appId: "1:418639019373:web:51980782350a970b8aae64",
    measurementId: "G-1CVRSW18ER"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
  let a = []
  const internalId = lastUserId() // promise fulfiled
  .then(res => a.push(res))
   console.log(a)  
  
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const id = a;
    const Role = "";
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        id,
        Role,
        ...additionalData
      });
    } catch (error) {
      throw new Error('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const users = () => firestore.collection("users")

export const firebase_db = firebase.database();
export const firebase_db_fuelConsump = firebase.database().ref(`fuelConsumptionInput`);
export const firebase_db_machineReg = firebase.database().ref(`machineRegistrationInput`);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;