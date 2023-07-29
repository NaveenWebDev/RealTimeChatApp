import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMZ6D4xnijkV4rfFbal-9qbVpn1aIagQg",
  authDomain: "reactchatapp-42050.firebaseapp.com",
  databaseURL: "https://reactchatapp-42050-default-rtdb.firebaseio.com",
  projectId: "reactchatapp-42050",
  storageBucket: "reactchatapp-42050.appspot.com",
  messagingSenderId: "464831282533",
  appId: "1:464831282533:web:62ec343d45e32f6a87758c",
  measurementId: "G-TLN3ZDSJEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

