import './App.css';
import React, {useState } from 'react'
import AUTH from './pages/Auth';
import Home from './pages/Home/Home';


import firebaseApp from './Config/Credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import AuthGoogle from './pages/AuthGoogle';


const auth = getAuth(firebaseApp); 
const  firestore = getFirestore(firebaseApp) ;

function App() {
  const [user, setUser] = useState(null);
  
async function getRol(uid) {
  const docuRef =  doc(firestore, `usuarios/${uid}`);
  const docuCifrada = await getDoc (docuRef);
  const docuFinal = docuCifrada.data().rol;
  return docuFinal;
}
async function setUserWithFirebaseAndRol(usuarioFirebase) {
  getRol(usuarioFirebase.uid).then((rol)=>{
    const userData = {
      uid: usuarioFirebase.uid,
      email: usuarioFirebase.email,
      password: usuarioFirebase.password,
      usuario: usuarioFirebase.usuario,
      rol:rol,
      puesto: usuarioFirebase.puesto,
      entrada: usuarioFirebase.entrada,
      salida: usuarioFirebase.salida,
    };
    setUser(userData);
    console.log(userData);
  });
}

onAuthStateChanged(auth, (usuarioFirebase) =>{

  if (usuarioFirebase) {  
    if (!user) {
      setUserWithFirebaseAndRol(usuarioFirebase) 
    }

  }else{
    setUser(null);
  }
});

  return (  
  <> 
 
 
 
  { user ?  <Home  user={user} /> : <AUTH/> }    
    
    

  </> ) ;

}
export default App;
