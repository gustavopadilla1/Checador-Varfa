import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { collection, getDocs,  deleteDoc, doc} from 'firebase/firestore'
import {db}  from '../../Config/firestore';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal);

const TableAdmin = ({user}) => {
const [Checador, setChecador] = useState([]);
const [search , setSearch] = useState("");

const ChecadorCollection = collection(db, "Checador" )

const getChecador = async() => {
    const data = await getDocs(ChecadorCollection)
    // console.log(data.docs);
    setChecador(
      data.docs.map((doc)=> ({...doc.data(), id: doc.id}))        
      )
      console.log(Checador) 
       

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
    const userDoc = doc(db, "Checador", id) 
    await deleteDoc(userDoc)

    getChecador();
}
 
useEffect(() => {
  getChecador()

}, [])  


  return (
    <div>
  <div className='d-flex justify-content-evenly'>
 <ReactHTMLTableToExcel
  id = 'BotonExportarExcel'
  className = "btn btn-success"
  table = "Reporte"
  filename = "Reporte de asistencia"
  sheet = "REPORTE"
  buttonText = "Exportar a Excel"
 />


<a href='https://docs.google.com/spreadsheets/d/18lnS2_WrJV7vWJu5PcRqRmpeUXihqi5R3Jh2tO-XfVw/edit#gid=0'><button type="button" className="btn btn-success">Google Sheets</button></a>

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
{/* <table className="table table-bordered border-primary" id='Reporte'> */}
      <table className="table table-bordered border-primary" id='Reporte'>
  <thead>
    <tr>      
      <th scope="col">Nombre</th>
      <th scope="col">Correo</th>      
      <th scope="col">Equipo de Trabajo</th>
      <th scope="col">Area Funcional </th>
      <th scope="col">Laborando </th>
      <th scope="col" className='table-primary'>Hora de Entrada</th>
      <th scope="col" className=' table-warning ' >Hora de Salida</th>
      <th scope="col" className='table-success'>Comentarios</th>
      <th scope="col">Acción</th>    
    </tr>
  </thead>
  <tbody>    
    {Checador.filter(colabolador => {
      if (search === "") {
        return colabolador;
      }else if ((colabolador['NOMBRE COMPLETO'] )
      .toLowerCase().includes(search.toLowerCase())) {
        return colabolador;      
      }
    })
    .map((colabolador)=>(
        <tr key={colabolador.id}>
          <td> {colabolador['NOMBRE COMPLETO']}</td>
          <td> {colabolador['CORREO ELECTRONICO']}</td>          
          <td>{colabolador['EQUIPO DE TRABAJO']}</td>
          <td>{colabolador['AREA FUNCIONAL']}</td>
          <td>{colabolador.laborando}</td>

          <td className ='table-primary' >{colabolador.entrada}</td>          
          <td className='table-warning'>{colabolador.salida}</td> 
          <td className='table-success' >{colabolador.comentario}</td> 
          
          <td>
            {/* <Link to={`/FormEdit/${usuario.id}`} className = "btn btn-primary" >Editar</Link> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" /> */}
            <button onClick = {()=> (deleteUser(colabolador.id))} className = "btn btn-primary" > Borrar</button> 
          </td>
        </tr>
    ))}  
    
  </tbody>
  </table>
    </div>
  )
}

export default TableAdmin

