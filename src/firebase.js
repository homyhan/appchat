import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBSOUC2EG2peFBWqGGAY4lSndZ7kupaIfQ",
    authDomain: "chatapp-498ec.firebaseapp.com",
    projectId: "chatapp-498ec",
    storageBucket: "chatapp-498ec.appspot.com",
    messagingSenderId: "201585128926",
    appId: "1:201585128926:web:b172f942ecdc78b4e1194f",
    measurementId: "G-CNGXRTN0JR"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
