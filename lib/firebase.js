import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBT_tboJps5YIMQykaF1X0YKoYzgz2Cek4",
  authDomain: "fir-webrtc-e7d65.firebaseapp.com",
  databaseURL: "https://fir-webrtc-e7d65-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-webrtc-e7d65",
  storageBucket: "fir-webrtc-e7d65.appspot.com",
  messagingSenderId: "244121969546",
  appId: "1:244121969546:web:d4c7ecb91f6709931a9e73",
  measurementId: "G-5Q6QWDETFS"

}

if (!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore()
export const storate = firebase.storage()
