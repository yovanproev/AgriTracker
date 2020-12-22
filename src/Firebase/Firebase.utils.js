import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/database"

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
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const id = Math.random() * 10000
    const role = "";
    try {
      await userRef.set({
        displayName,
        email,
        role,
        id,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      throw new Error('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const firebase_db = firebase.database();
export const firebase_db_fuelConsump = firebase.database().ref(`fuelConsumptionInput`);
export const firebase_db_machineReg = firebase.database().ref(`machineRegistrationInput`);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const users = firestore.collection("users")

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

