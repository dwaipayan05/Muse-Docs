import {initializeApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGYTClMd4lXhDV4ZQj7SDdTdpLZ-0x1iE",
  authDomain: "muse-docs-7f817.firebaseapp.com",
  projectId: "muse-docs-7f817",
  storageBucket: "muse-docs-7f817.appspot.com",
  messagingSenderId: "893249762723",
  appId: "1:893249762723:web:3bafa196282ac502bed616",
  measurementId: "G-8JL068T3FJ"
};

const app = getApps.length < 1 ? initializeApp(firebaseConfig) : getApps[0];
export const db = getFirestore();





