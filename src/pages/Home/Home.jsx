import React, { useEffect } from 'react'
import HomeAdmin from '../../components/HomeAdmin/HomeAdmin'
import HomeUser from '../../components/HomeUser/HomeUser'
import Appbar from '../../components/Appbar/Appbar'
import HomeGerente from '../../components/HomeGerente'

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

        <div Style="margin:16px;">
      <h5 >Bienvenido: {user['NOMBRE CORTO']}</h5> 
      {/* <h6 >{user.rol}</h6> */}
      {/* <h6> hola:  {user.usuario}</h6> */}

     

        {user['NIVEL DE AUTORIDAD'] ==="Administrador" ? <HomeAdmin user={user}/> : <div></div>}
        {user['NIVEL DE AUTORIDAD'] ==="Colaborador" ?  <HomeUser user={user}/> : <div></div> }
        {user['NIVEL DE AUTORIDAD'] ==="Superior" ?  <HomeGerente user={user}/> : <div></div> }


        </div>
    </div>
  )
}

export default Home
