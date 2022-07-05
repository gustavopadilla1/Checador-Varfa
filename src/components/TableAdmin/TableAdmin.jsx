import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc,addDoc } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box, Button, Modal } from '@mui/material';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


const TableAdmin = ({ user }) => {
  const [Checador, setChecador] = useState([]);
  const [search, setSearch] = useState("");

  const ChecadorCollection = collection(db, "Checador")



  const MONITOREOCollection = collection(db, "Monitoreo")
// bd de checador esto para almacenar el checqueo del supervisor
  const CHECADORCollection = collection(db, "Checador")

// estados del los campos que se almacenaran en la bd checador
  const [correo, setCorreo] = useState("");
  const [, setUsuarios] = useState("");
  const [, setPuesto]= useState("");  
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");
  const [laborando, setLaborando] = useState("");
  const [comentario, setComentario] = useState("Buen dia");
  const [ubicacion, ] = useState("");
  const [,setequipotrabajo] = useState("")

  const [entradahora, setentradahora] = useState("");
  const [salidahora, setsalidahora] = useState("");

  //concatanacion
  const [final] =useState(entradahora , entrada );
  const [final2] =useState(salida , salidahora);  

  
/// modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const getChecador = async () => {
    const data = await getDocs(ChecadorCollection)
    // console.log(data.docs);
    setChecador(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Checador)


  }

  const deleteUser = async (id) => {
    MySwal.fire({
        title: 'Seguro que deseas eliminar el registro?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        // denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const userDoc = doc(db, "Checador", id)
           deleteDoc(userDoc)
           getChecador();
        } 
        // else if (result.isDenied) {
        // }
      })
    
  }

  useEffect(() => {
    getChecador()

  }, [])




  // Style del modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };




// funcion para guardar chequeo del supervisor
const Add = async (e) =>{
  e.preventDefault();        
  await addDoc (CHECADORCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entrada:entrada , salida:salida, entradahora:entradahora , salidahora:salidahora, laborando:laborando, comentario:comentario, ubicacion:ubicacion})
  await addDoc (MONITOREOCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entrada:entrada , salida:salida, entradahora:entradahora , salidahora:salidahora, laborando:laborando, comentario:comentario, ubicacion:ubicacion})
  console.log(e);  

  const data ={
    ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], 
    ['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'],       
    ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],
    ['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , 
    laborando:laborando, 
    entrada:entrada , 
    salida:salida,       
    comentario:comentario
  }
  
  axios.post('https://sheet.best/api/sheets/57301919-954a-4676-9da3-52041bfe4e1c',data).then((res)=>{
  console.log(res);

  setUsuarios('');
  setCorreo('');
  setPuesto(''); 
  setequipotrabajo('');
  setLaborando('');
  setEntrada('');
  setSalida('');
  setComentario ('');      
  
})

  MySwal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Bienvenido Registro hecho con exito !!!',
    showConfirmButton: false,
    timer: 3000

    })          


}


// funcion de guardar campo entrada por fecha y hora
const Entrada = async () =>{
  let o = new Date();
  setentradahora(
    o =  
    o.getHours() +' : ' +o.getMinutes()+ ' : ' +o.getSeconds()  
  ) 

  let d = new Date();
  
  var dia=new Array(7);
  dia[0]="Domingo";
  dia[1]="Lunes";
  dia[2]="Martes";
  dia[3]="Miercoles";
  dia[4]="Jueves";
  dia[5]="Viernes";
  dia[6]="Sabado";

  var m2 = d.getMonth() + 1;
  var mesok = (m2 < 10) ? '0' + m2 : m2;
  mesok=new Array(12);
  mesok[0]="Enero";
  mesok[1]="Febrero";
  mesok[2]="Marzo";
  mesok[3]="Abril";
  mesok[4]="Mayo";
  mesok[5]="Junio";
  mesok[6]="Julio";
  mesok[7]="Agosto";
  mesok[8]="Septiembre";
  mesok[9]="Octubre";
  mesok[10]="Noviembre";
  mesok[11]="Diciembre";
     
    console.log(
    
    dia[d.getDay()],
    d.getDate(),    
    mesok[d.getMonth()] ,
    d.getFullYear() ,
"- "+
    d.getHours(),    
': ' +d.getMinutes(),
': ' +d.getSeconds()

);



setEntrada(
d =  
dia[d.getDay()] +" " +d.getDate()+" " + mesok[d.getMonth()]+ " " + d.getFullYear() + " - "+ " " +d.getHours() +' : ' +d.getMinutes()+ ' : ' +d.getSeconds()
)

// setOcultarBoton(true);      
    return  final ;  
}






// funcion de guardar campo Salida por fecha y hora
const Salida = async () =>{
  let o = new Date();
  setsalidahora(
    o =  
    o.getHours() +' : ' +o.getMinutes()+ ' : ' +o.getSeconds()    
  ) 

  let d = new Date();
   
   var dia=new Array(7);
   dia[0]="Domingo";
   dia[1]="Lunes";
   dia[2]="Martes";
   dia[3]="Miercoles";
   dia[4]="Jueves";
   dia[5]="Viernes";
   dia[6]="Sabado";

   var m2 = d.getMonth() + 1;
   var mesok = (m2 < 10) ? '0' + m2 : m2;
  mesok=new Array(12);
   mesok[0]="Enero";
   mesok[1]="Febrero";
   mesok[2]="Marzo";
   mesok[3]="Abril";
   mesok[4]="Mayo";
   mesok[5]="Junio";
   mesok[6]="Julio";
   mesok[7]="Agosto";
   mesok[8]="Septiembre";
   mesok[9]="Octubre";
   mesok[10]="Noviembre";
   mesok[11]="Diciembre";
      
     console.log(
     
     dia[d.getDay()],
     d.getDate(),    
     mesok[d.getMonth()] ,
     d.getFullYear() ,
"- "+
     d.getHours(),    
': ' +d.getMinutes(),
': ' +d.getSeconds()

);


setSalida(
 d =  
 dia[d.getDay()] +" " +d.getDate()+" " + mesok[d.getMonth()]+ " " + d.getFullYear() + " - "+ " " +d.getHours() +' : ' +d.getMinutes()+ ' : ' +d.getSeconds()
)  


//  setOcultarBoton(false);

return  final2;     
 }



  return (
    <div>

      
      <div className='d-flex justify-content-evenly'>
        <ReactHTMLTableToExcel
          id='BotonExportarExcel'
          className="btn btn-success"
          table="Reporte"
          filename="Reporte de asistencia"
          sheet="REPORTE"
          buttonText="Exportar a Excel"
        />


        <a href='https://docs.google.com/spreadsheets/d/18lnS2_WrJV7vWJu5PcRqRmpeUXihqi5R3Jh2tO-XfVw/edit#gid=0'><button type="button" className="btn btn-success">Google Sheets</button></a>

      </div>
      <br />
      <div className="row mb-12 justify-content-center" >
        <div className="col-sm-3">
          <input className="form-control form-control-lg" type="text" placeholder="Buscar..." aria-label=".form-control-lg example"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <br />





      <Button onClick={handleOpen} variant="contained" endIcon={<SendIcon />}>Checar</Button>
<br />

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>


  <Box sx={style}>
    {/* contenido del moda --- y en el contenido tenemos todo para registrar el cheque del administrador  */}
  <form  className="was-validated"
      onSubmit={Add}
      >

  <br/>


        <div className="row mb-1 justify-content-center" >
    <label className="col-sm-1 col-form-label"> Nombre: </label>
    <div className="col-sm-7">
    <input
    
                        value={user['NOMBRE COMPLETO']}                      
                        onChange ={()=> setUsuarios(user['NOMBRE COMPLETO'])}  
                        type='text'
                        className='form-control '                                                 
                        disabled
                    />
                  
    </div>
    </div>

    <div className="row mb-1 justify-content-center" >
    <label className="col-sm-1 col-form-label"> Email: </label>
    <div className="col-sm-7">
    <input
    
                        value={user['CORREO ELECTRONICO']}                      
                        onChange ={()=> setCorreo(user['CORREO ELECTRONICO'])}  
                        type='text'
                        className='form-control '                                                 
                        disabled
                    />
  
    </div>
    </div>
    
    <div className="row mb-1 justify-content-center"   >
    <label className="col-sm-1 col-form-label">Area Funcional</label>
    <div className="col-sm-7">

						<input  value={user['AREA FUNCIONAL']}  
                      onChange ={()=> setPuesto(user['AREA FUNCIONAL'])}                        
                      type='text'
                      className='form-control '
                      disabled
                      />					        
    </div>
    </div>

    <div className="row mb-1 justify-content-center"   >
    <label className="col-sm-1 col-form-label">Equipo de Trabajo </label>
    <div className="col-sm-7">

						<input  value={user['EQUIPO DE TRABAJO']}  
                      onChange ={()=> setequipotrabajo(user['EQUIPO DE TRABAJO'])}                        
                      type='text'
                      className='form-control '
                      disabled
                      />					        
    </div>
    </div>

    
    
    <div className="row mb-1 justify-content-center"  >
    <label className="col-sm-1 col-form-label">Laborando</label>
    <div className="col-sm-7">
    <select 
          value={laborando}  
          onChange ={(e)=> setLaborando(e.target.value)} 
          className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example" 
          required
          >
						
            <option></option>            
						<option>Home Office</option>
						<option>Oficina</option>
						<option>De Visita con un Cliente</option>					
						</select>
               
    </div>
    </div>

    <div className="row mb-1 justify-content-center form-floating" >
    <div className="col-sm-4">
    <textarea              
                        placeholder="Deseas colocar un comentario: (opcional)"                                                
                        value={comentario}
                        onChange ={(e)=> setComentario(e.target.value)}
                        type='text'
                        className='form-control is-invalid'                        
                    />
    </div>
    </div>
<br/><br/>
    <div className='d-flex justify-content-around '>

  <div>
  <button 
    id='btnEntrada'
    Style="padding:15px; padding-left:35px;"  
    onClick={Entrada}  
    value={ final}  
    type='submit'  
    className='btn btn-success '  
    
  >   
    Entrar
  </button>  
  </div>
    
     <button 
     id='btnSalida'
     Style="padding:15px; padding-left:35px;"  
     onClick={Salida}  
     value={final2} 
     className='btn btn-success '
      >       
     salida
     </button>  

  </div>
</form>

  </Box>
</Modal>





      {/* <Link to={`/CreateUser`} className = "btn btn-primary" >Agregar </Link> */}
      <br />
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
            } else if ((colabolador['NOMBRE COMPLETO'])
              .toLowerCase().includes(search.toLowerCase())) {
              return colabolador;
            }
          })
            .map((colabolador) => (
              <tr key={colabolador.id}>
                <td> {colabolador['NOMBRE COMPLETO']}</td>
                <td> {colabolador['CORREO ELECTRONICO']}</td>
                <td>{colabolador['EQUIPO DE TRABAJO']}</td>
                <td>{colabolador['AREA FUNCIONAL']}</td>
                <td>{colabolador.laborando}</td>

                <td className='table-primary' >{colabolador.entrada}</td>
                <td className='table-warning'>{colabolador.salida}</td>
                <td className='table-success' >{colabolador.comentario}</td>

                <td>
                  {/* <Link to={`/FormEdit/${usuario.id}`} className = "btn btn-primary" >Editar</Link> */}
                  {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" /> */}
                  <button onClick={() => (deleteUser(colabolador.id))} className="btn btn-danger" ><i className="fas fa-trash-alt" /></button>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  )
}

export default TableAdmin

