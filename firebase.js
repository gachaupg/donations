// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEV31SHaX7G3ODUFeTutIE9BmQrepoiBQ",
  authDomain: "farmedge-4b422.firebaseapp.com",
  databaseURL: "https://farmedge-4b422-default-rtdb.firebaseio.com",
  projectId: "farmedge-4b422",
  storageBucket: "farmedge-4b422.appspot.com",
  messagingSenderId: "866830600136",
  appId: "1:866830600136:web:551c523f109cb992d962fd",
  measurementId: "G-KP2MHNWXNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };