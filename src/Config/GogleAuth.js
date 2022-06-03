import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDjemGeMK3dXDNIzqkjiiBEoOreRc2_2oA",
  authDomain: "checador-97e97.firebaseapp.com",
  projectId: "checador-97e97",
  storageBucket: "checador-97e97.appspot.com",
  messagingSenderId: "556181589982",
  appId: "1:556181589982:web:e8004c1fa9cc94726f574f"
};

const fire = firebase.initializeApp(firebaseConfig);
const Auth = fire.auth()
const google = new firebase.auth.GoogleAuthProvider();

export  {Auth, google}