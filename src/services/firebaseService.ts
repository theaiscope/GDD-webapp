import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Functions, getFunctions } from 'firebase/functions'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}
const cloudFunctionsRegion = process.env.REACT_APP_FIREBASE_FUNCTIONS_REGION

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

export const databaseClient: Firestore = getFirestore(app)

export const firebaseAuth: Auth = getAuth(app)

export const functionsInstance: Functions = getFunctions(app, cloudFunctionsRegion)
