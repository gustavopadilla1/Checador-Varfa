import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { collection, getDocs,  deleteDoc, doc} from 'firebase/firestore'
import {db}  from '../../Config/firestore';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal);

const TableAdmin = () => {
const [usuarios, setUsuarios] = useState([]);

const usuariosCollection = collection(db, "usuarios" )

const getUsuarios = async() => {
    const data = await getDocs(usuariosCollection)
    // console.log(data.docs);
    setUsuarios(
      data.docs.map((doc)=> ({...doc.data(), id: doc.id}))        
      )
      console.log(usuarios);
    
}

const deleteUser = async (id)=>{
    const userDoc = doc(db, "usuarios", id) 
    await deleteDoc(userDoc)
    getUsuarios();
}

 
useEffect( () => {
    getUsuarios()

} , [] )


  return (
    <div>
<Link to={`/FormCreate`} className = "btn btn-primary" >Crear</Link>
      <table className="table">
  <thead>
    <tr>      
      <th scope="col">Usuario</th>
      <th scope="col">Correo</th>
      <th scope="col">Rol</th>
      <th scope="col">puesto</th>
      <th scope="col">Hora de Entrada</th>
      <th scope="col">Hora de Salida</th>
      <th scope="col">Accion</th>    
    </tr>
  </thead>
  <tbody>
    {usuarios.map((usuario)=>(
        <tr key={usuario.id}>
          <td> {usuario.usuario}</td>
          <td> {usuario.correo}</td>
          <td>{usuario.rol}</td>          
          <td>{usuario.puesto}</td>
          {/* <th>{usuario.entrada}</th> */}
          <td></td>
          <td></td>
          <td>
            <Link to={`/FormEdit/${usuario.id}`} className = "btn btn-primary" >Editar</Link>
            <button onClick = {()=> (deleteUser(usuario.id))} className = "btn btn-primary" > Borrar</button> 

          </td>




        </tr>
    ))}  
  </tbody>
</table>


    </div>
  )
}

export default TableAdmin
