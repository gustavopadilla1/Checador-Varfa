import React from 'react'

import firebaseApp from '../../Config/Credenciales'
import {getAuth, signOut} from 'firebase/auth';
const auth = getAuth(firebaseApp);



function Home() {
  return (
    <div>
      <h2>Bienvenido</h2>

        <button onClick={()=> signOut(auth)}>Salir</button>

    </div>
  )
}

export default Home
