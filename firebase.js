// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




// Paste your Firebase configuration here
const firebaseConfig = {
    apiKey: "AIzaSyBn-E-LJVxiB_f2_nHlz3kwz7uwco5wk_A",
    authDomain: "kl-hw02.firebaseapp.com",
    projectId: "kl-hw02",
    storageBucket: "kl-hw02.appspot.com",
    messagingSenderId: "583828595424",
    appId: "1:583828595424:web:abcd1234efgh5678" // Replace with your app id
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { auth };
