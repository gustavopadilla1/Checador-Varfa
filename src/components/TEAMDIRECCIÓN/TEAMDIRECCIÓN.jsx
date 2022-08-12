import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc} from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box, Button, Modal } from '@mui/material';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


function TEAMDIRECCIÓN({ user }) {
  //estados del monitoreo de los colaboradores y respecto al monitoreo
  const [Monitoreo, setMonitoreo] = useState([]);
  const [colaboladores, setcolaboladores] = useState([]);

// bd de los colaboradores y del monitoreo
  const colaboladoresCollection = collection(db, "colaboladores")
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

  const [comentarioMonitoreo , setcomentarioMonitoreo] = useState("")
  const [laborandoMonitoreo , setLaborandoMonitoreo] = useState("")
  const [entradahora, setentradahora] = useState("");
  const [salidahora, setsalidahora] = useState("");

  //concatanacion
  const [final] =useState(entradahora , entrada );
  const [final2] =useState(salida , salidahora, laborandoMonitoreo, comentarioMonitoreo);  
 
  
/// modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  ///mostrar el monitoreo 
  const getMonitoreo = async () => {
    const data = await getDocs(MONITOREOCollection)
    setMonitoreo(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Monitoreo)

  }

  //mostrar los colaboradores
  const getcolaboladores = async () => {
    const data = await getDocs(colaboladoresCollection)
    // console.log(data.docs);
    setcolaboladores(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(colaboladores)

  }

  // use efect  
  useEffect(() => {
    getMonitoreo()
    getcolaboladores()
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
    await addDoc (MONITOREOCollection, {[
      'CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], 
      ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , 
      laborandoMonitoreo:laborandoMonitoreo,
      entrada:entrada , salida:salida, entradahora:entradahora , salidahora:salidahora,
      comentarioMonitoreo:comentarioMonitoreo, ubicacion:ubicacion})
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
  setOpen();

    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Bienvenido Registro hecho con exito !!!',
      showConfirmButton: false,
      timer: 2500

		  })          


  }
 


 // funcion de guardar campo entrada por fecha y hora
const Entrada = async () =>{

  if (laborando==="Home Office"){
    setLaborandoMonitoreo("Home Office")
  }
  if (laborando==="Oficina"){
    setLaborandoMonitoreo("Oficina")
  } if (laborando==="De Visita con un Cliente") {
    setLaborandoMonitoreo("De Visita con un Cliente")
  }

  setcomentarioMonitoreo(comentario)

  let o = new Date();
  setentradahora(
    o =  
    o.getHours() +':' +o.getMinutes()+ ':' +o.getSeconds()  
  ) 

  let d = new Date();
  
  // var dia=new Array(7);
  // dia[0]="Domingo";
  // dia[1]="Lunes";
  // dia[2]="Martes";
  // dia[3]="Miercoles";
  // dia[4]="Jueves";
  // dia[5]="Viernes";
  // dia[6]="Sabado";

  var m2 = d.getMonth() + 1;
  var mesok = (m2 < 10) ? '0' + m2 : m2;
  mesok=new Array(12);
  mesok[0]="01";
  mesok[1]="02";
  mesok[2]="03";
  mesok[3]="04";
  mesok[4]="05";
  mesok[5]="06";
  mesok[6]="07";
  mesok[7]="08";
  mesok[8]="09";
  mesok[9]="10";
  mesok[10]="11";
  mesok[11]="12";


     
//       console.log(
    
//       dia[d.getDay()],
//       d.getDate(),    
//       mesok[d.getMonth()] ,
//       d.getFullYear() ,
// "- "+
//       d.getHours(),    
// ': ' +d.getMinutes(),
// ': ' +d.getSeconds()

// );


  var min = d.getMinutes();
if (min < 10) {
var minF = "0" + d.getMinutes()
}
else{
var minF = d.getMinutes()
}

alert(d);

setEntrada(
d =  
d.getDate()+"/" + mesok[d.getMonth()]+ "/" + d.getFullYear() +" " +d.getHours() +':' +minF+ ':' +d.getSeconds()
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
   
//      var dia=new Array(7);
//      dia[0]="Domingo";
//      dia[1]="Lunes";
//      dia[2]="Martes";
//      dia[3]="Miercoles";
//      dia[4]="Jueves";
//      dia[5]="Viernes";
//      dia[6]="Sabado";

var m2 = d.getMonth() + 1;
var mesok = (m2 < 10) ? '0' + m2 : m2;
mesok=new Array(12);
mesok[0]="01";
mesok[1]="02";
mesok[2]="03";
mesok[3]="04";
mesok[4]="05";
mesok[5]="06";
mesok[6]="07";
mesok[7]="08";
mesok[8]="09";
mesok[9]="10";
mesok[10]="11";
mesok[11]="12";
      
//        console.log(
     
//        dia[d.getDay()],
//        d.getDate(),    
//        mesok[d.getMonth()] ,
//        d.getFullYear() ,
//  "- "+
//        d.getHours(),    
//  ': ' +d.getMinutes(),
//  ': ' +d.getSeconds()

//  );

alert(d);

var min = d.getMinutes();
if (min < 10) {
 var minF = "0" + d.getMinutes()
}
else{
 var minF = d.getMinutes()
}

setSalida(
 d =  
 d.getDate()+"/" + mesok[d.getMonth()]+ "/" + d.getFullYear() +" " +d.getHours() +':' +minF+ ':' +d.getSeconds()
)  
//  setOcultarBoton(false);
return  final2;     
 }



  return (
    <div user = {user}>

{/* boton y elmodal */}
<Button onClick={handleOpen} variant="contained" color="success" endIcon={<SendIcon />}>Checar</Button>
<br /><br />

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
    <label className="col-sm-1 col-form-label">Area: </label>
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
    <label className="col-sm-1 col-form-label">Equipo: </label>
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
    <label className="col-sm-1 col-form-label">Laborando:</label>
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
    Style="padding:15px;"  
    onClick={Entrada}  
    value={ final}  
    type='submit'  
    className='btn btn-success '      
  >   
    <i className="fa-solid fa-arrow-right" />&nbsp;
    Entrada
  </button>  
  </div>
    
     <button
     id='btnSalida'
     Style="padding:15px;"  
     onClick={Salida}  
     value={final2} 
     className='btn btn-success '
      >       
        <i className="fa-solid fa-arrow-left" />&nbsp;
     Salida
     </button>  

  </div>
</form>

  </Box>
</Modal>


{/* contenido del monitoreo */}
      <div className='' > 
        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 12px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>
<br />


          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM DIRECCION') {
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >    
                        <div className='h-25'>
                        <td >
                        <div  className="h-25">
                            
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 40}} alt="Avatar" />
                             
                            
                           <div style={{marginLeft:50, marginTop:-40}}>
                               <a  Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px; ">
                                {colabolador['NOMBRE COMPLETO']} 
                                </a>

                            <br />
                                <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>    

                                </div>                      
                            </div>
                        </td>
                        </div>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>
                        


<td>
                        {
                          Monitoreo                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                if(!monitoreo.laborandoMonitoreo ==""){
                                        return (
                                     
                                          <div 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 13px;"
                                              className='text-primary'>
                                                 <b>
                                                {monitoreo.laborandoMonitoreo } 
                                                </b>                                                
                                          </div>
                                        
                                        ) 
                                 }  
                              }
                            }
                            )
                        }
</td>


<td>

                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <div  className='text-success'>
                                    
                                    <a Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                      {monitoreo.entradahora} </a>                                    
                                    </div>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }
</td>
<td>
{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                   
                                    
                                  <p Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">                                                       
                                  <br />
                                  {monitoreo.salidahora}                                                                        
                               </p>  
                               
                           
                                  )
                                }
                                
                              }
                            }
                            )
                        }
</td>
<td>
                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                if(!monitoreo.comentarioMonitoreo ==""){
                                return (      
                                                                                             
                                  <div 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                       
                                        {monitoreo.comentarioMonitoreo} 

                                  </div>                                  
                                
                                )
                                }
                              }
                            }
                            )
                        }
</td>
                      </tr>

                    </tbody>
                  )

                }
              }
              )
          }
        </table>

      </div>
   </div>
  )
}

export default TEAMDIRECCIÓN
