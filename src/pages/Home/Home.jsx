import React from 'react'
import HomeAdmin from '../../components/HomeAdmin/HomeAdmin'
import HomeUser from '../../components/HomeUser/HomeUser'
import Appbar from '../../components/Appbar/Appbar'

function Home({user}) {

  return (
    <div>               
      <Appbar/>

        <div Style="margin:20px;">
      <h5>Bienvenido: {user.email}</h5> 
      <h6     >{user.rol}</h6>


        {user.rol==="Administrador" ? <HomeAdmin/>: <HomeUser/>}
        </div>
    </div>
  )
}

export default Home
