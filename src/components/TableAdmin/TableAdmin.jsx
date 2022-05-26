import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { collection, getDocs,  deleteDoc, doc} from 'firebase/firestore'
import {db}  from '../../Config/firestore';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

const TableAdmin = () => {
const [usuarios, setUsuarios] = useState([]);
const [search , setSearch] = useState("");
const [usuario, setUsuario] = useState([]);


const usuariosCollection = collection(db, "usuarios" )

const getUsuarios = async() => {
    const data = await getDocs(usuariosCollection)
    // console.log(data.docs);
    setUsuarios(
      data.docs.map((doc)=> ({...doc.data(), id: doc.id}))        
      )
      console.log(usuarios) 
      console.log(usuarios[0].usuario);    
      console.log(usuarios[0].entrada.nanoseconds);    

}

const deleteUser = async (id)=>{
  // MySwal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire(
  //       'Deleted!',
  //       'Your file has been deleted.',
  //       'success'
  //     )
  //   }
  // })
    const userDoc = doc(db, "usuarios", id) 
    await deleteDoc(userDoc)

    getUsuarios();
}
 
useEffect( () => {
    getUsuarios()
} , [] )






  return (
    <div>
<div align='center'>
 <ReactHTMLTableToExcel
  id = 'BotonExportarExcel'
  className = "btn btn-success"
  table = "Reporte"
  filename = "Reporte de asistencia"
  sheet = "REPORTE"
  buttonText = "Exportar a Excel"
 />
</div>
    <br/>
<div className="row mb-12 justify-content-center" >
    <div className="col-sm-3">
    <input className="form-control form-control-lg" type="text" placeholder="Buscar..." aria-label=".form-control-lg example"
      onChange={(e)=>{
        setSearch(e.target.value);
      }}
    />    
    </div>
    </div>
<br/>

<Link to={`/CreateUser`} className = "btn btn-primary" >Agregar </Link>
<br/><br/>
      <table className="table" id='Reporte'>
  <thead>
    <tr>      
      <th scope="col">Usuario</th>
      <th scope="col">Correo</th>
      <th scope="col">Rol</th>
      <th scope="col">puesto</th>
      <th scope="col">Estado</th>
      <th scope="col">Ubicacion</th>
      <th scope="col">Hora de Entrada</th>
      <th scope="col">Hora de Salida</th>
      <th scope="col">Accion</th>    
    </tr>
  </thead>
  <tbody>
    {usuarios.filter((usuario)=>{
      if (search === "") {
        return usuario;
      }else if ((usuario.usuario  || usuario.salida || usuario.rol || usuario.puesto || usuario.motivo)
      .toLowerCase().includes(search.toLowerCase())) {
        return usuario;      
      }
    })
    .map((usuario)=>(
        <tr key={usuario.id}>
          <td> {usuario.usuario}</td>
          <td> {usuario.correo}</td>
          <td>{usuario.rol}</td>          
          <td>{usuario.puesto}</td>
          <td>{usuario.motivo}</td>
          <td>{usuario.ubicacion}</td>
          <td>{usuario.entrada}</td>

          {/* {usuario.map((entrada)=>(
             
            <td> {entrada.Fecha}</td>
          ))}  */}

          <td>{usuario.salida}</td> 
          <td>
            {/* <Link to={`/FormEdit/${usuario.id}`} className = "btn btn-primary" >Editar</Link> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" /> */}
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

