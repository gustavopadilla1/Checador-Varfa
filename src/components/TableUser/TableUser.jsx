import React, {useEffect, useState} from 'react';
import Reloj from '../Reloj/Reloj';
import { collection, addDoc } from 'firebase/firestore' 
import { db} from '../../Config/firestore';
import axios from 'axios'

import {getAuth,signOut} from 'firebase/auth';
import firebaseApp from '../../Config/Credenciales'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);
const auth = getAuth(firebaseApp);



const TableUser = ({user}) => {

  const [correo, setCorreo] = useState("");
  const [, setUsuarios] = useState("");
  const [, setPuesto]= useState("");  
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");
  const [laborando, setLaborando] = useState("");
  const [comentario, setComentario] = useState("Buen día");
  const [ubicacion, ] = useState("");
  const [,setequipotrabajo] = useState("")

  const [entradahora, setentradahora] = useState("");
  const [salidahora, setsalidahora] = useState("");
  const [laborandoMonitoreo , setLaborandoMonitoreo] = useState("")
  const [comentarioMonitoreo , setcomentarioMonitoreo] = useState("")

  const [final] =useState(entradahora , entrada );
  const [final2] =useState(salida , salidahora, laborandoMonitoreo, comentarioMonitoreo);  

  const [ocultarBoton, setOcultarBoton] = React.useState(false);
  
  const CHECADORCollection = collection(db, "Checador");
  const MONITOREOCollection = collection(db, "Monitoreo");


  const Add = async (e) =>{

    e.preventDefault();        

    await addDoc (CHECADORCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entrada:entrada , salida:salida, entradahora:entradahora , salidahora:salidahora, laborando:laborando, comentario:comentario, ubicacion:ubicacion})
    await addDoc (MONITOREOCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entrada:entrada , salida:salida, entradahora:entradahora , salidahora:salidahora, laborandoMonitoreo:laborandoMonitoreo, comentarioMonitoreo:comentarioMonitoreo, ubicacion:ubicacion})

    // await addDoc (MONITOREOCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entradahora:entradahora , salidahora:salidahora, laborando:laborando, comentario:comentario, ubicacion:ubicacion})
    
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
    
    axios.post('https://script.google.com/macros/s/AKfycbyAUirTmvHJZc_w4LHeIMp1d90PGB6mng1oSkEf-D9-ulV5ws3i58ftzBN2jXQNPzfL/exec',data).then((res)=>{
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
			position: 'center',
			icon: 'success',
			title: 'Bienvenido Registro hecho con exito !!!',
			showConfirmButton: false,
			timer: 2500
		  })    
      
      signOut(auth)

  }
 

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
    <div>
      <Reloj/> 
      <br></br>

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
    <label className="col-sm-1 col-form-label">Laborando: </label>
    <div className="col-sm-7">
    <select 
          value={laborando}  
          onChange ={(e)=> setLaborando(e.target.value)} 
          className="form-select form-select-lg mb-3 " aria-label=".form-select-md example" 
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

  {/* <div className='col-md-12 text-center'>    
    <button className='btn btn-primary'> Ubicacion</button>
  </div> */}



<br/><br/>

   
{/* d-flex justify-content-evenly -----Style boton Centrado pero con margin cada uno quedando separaditos  */}
{/* d-flex justify-content-between -----------------Style Boton en cada esquina  */}
    <div className='d-flex justify-content-around '>

{/* {!ocultarBoton ? */}
  <div>    
  <button 
    id='btnEntrada'
    Style="padding:11px;"  
    onClick={Entrada}  
    value={ final}  
    type='submit'  
    className='btn btn-success '  
    
  >   
  <i className="fa-solid fa-arrow-right" />&nbsp;
    Entrada

  {/* <button onClick={EntradaHORA} value={entradahora}></button>   */}

  </button>
    
  </div>
    {/* :

    <></>
}
     */}
  

  {/* {!ocultarBoton ?
      
    <></>
    
    : */}

     <button 
     id='btnSalida'
     Style="padding:11px;"  
     onClick={Salida}  
     value={final2} 
     className='btn btn-success '
      >       
        <i className="fa-solid fa-arrow-left" />&nbsp;
     Salída
     </button>  
    
    {/* } */}

  </div>

     </form>
    </div>

 )

}



export default TableUser
