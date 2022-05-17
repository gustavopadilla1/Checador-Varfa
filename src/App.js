import './App.css';
import React, {useState } from 'react'
import Auth from './pages/Auth';
import Home from './pages/Home/Home';
import firebaseApp from './Config/Credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseApp); 


function App() {
const [user, setUser] = useState(null);

onAuthStateChanged(auth, (usuarioFirebase) =>{

  if (usuarioFirebase) {
    setUser(usuarioFirebase);
  }else{
    setUser(null);
  }
});

  return   <> { user ?  <Home/> : <Auth/> }    </>  ;

}
export default App;
