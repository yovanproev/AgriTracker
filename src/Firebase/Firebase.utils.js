import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/database"


const devConfig = {
    apiKey: "AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI",
    authDomain: "input-output-data.firebaseapp.com",
    databaseURL: "https://input-output-data.firebaseio.com",
    projectId: "input-output-data",
    storageBucket: "input-output-data.appspot.com",
    messagingSenderId: "418639019373",
    appId: "1:418639019373:web:51980782350a970b8aae64",
    measurementId: "G-1CVRSW18ER"
};

const prodConfig = {
  apiKey: "AIzaSyCCt9BDd8SSmYYGEQARwJRi9TNYZkAy9Y8",
  authDomain: "dfp-app-registrations.firebaseapp.com",
  databaseURL: "https://dfp-app-registrations-default-rtdb.firebaseio.com",
  projectId: "dfp-app-registrations",
  storageBucket: "dfp-app-registrations.appspot.com",
  messagingSenderId: "793084880715",
  appId: "1:793084880715:web:96334d8fab8a18479faace",
  measurementId: "G-HFWW03860W"
};

const config = process.env.NODE_ENV === 'production'
? prodConfig : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

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

export const firebase_db = firebase.database();
export const firebase_db_fuelConsump = firebase.database().ref(`fuelConsumptionInput`);
export const firebase_db_machineReg = firebase.database().ref(`machineRegistrationInput`);
export const firebase_db_maintenance = firebase.database().ref(`maintenanceAndRepairsInput`);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const users = firestore.collection("users")

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)
.then(result => {
const email = result.user.email
const tokenId = result.credential.idToken
// const accessToken = result.credential.accessToken
// console.log(result)
// console.log(email)
// console.log(tokenId)
document.cookie = `tokenId=${tokenId}`
document.cookie = `email=${email}`
}).catch(err => {
  const email = err.email
  const credential = err.credential
  throw new Error(err, email, credential)
})





export default firebase;

