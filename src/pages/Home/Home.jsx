import React, { useEffect } from 'react'
import HomeAdmin from '../../components/HomeAdmin/HomeAdmin'
import HomeUser from '../../components/HomeUser/HomeUser'
import Appbar from '../../components/Appbar/Appbar'

function Home({user}) {

  // function User() {
  //   if (user.rol==="Administrador") {
  //     return <HomeAdmin/>
  //   }else if (user.rol ==="Colaborador"){
  //     return <HomeUser/>
  //   }else{
  //     return <h1>Vuelve a intentar</h1>;
  //   }
  // }

  // useEffect(()=>{
  //   User()
  // },[])




  return (
    <div>               
      <Appbar/>

        <div Style="margin:20px;">
      <h5>Bienvenido: {user.usuario}</h5> 
      {/* <h6 >{user.rol}</h6> */}
      {/* <h6> hola:  {user.usuario}</h6> */}




        {user.rol==="Administrador" ? <HomeAdmin/> : <HomeUser user={user}/> }


        

        </div>
    </div>
  )
}

export default Home
