import React, {useEffect, useState} from 'react';
import Reloj from '../Reloj/Reloj';
import { collection, addDoc } from 'firebase/firestore' 
import { db} from '../../Config/firestore';
import axios from 'axios'

// import io from 'socket.io-client'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

// const socket = io.connect("http://localhost:3001");

const TableUser = ({user}) => {

  const [correo, setCorreo] = useState("");
  const [, setUsuarios] = useState("");
  const [, setPuesto]= useState("");  
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");
  const [laborando, setLaborando] = useState("");
  const [comentario, setComentario] = useState("");
  const [ubicacion, ] = useState("");
  const [,setequipotrabajo] = useState("")


  const [ocultarBoton, setOcultarBoton] = React.useState(false);
  
  const CHECADORCollection = collection(db, "Checador");
  const MONITOREOCollection = collection(db, "Monitoreo");


  const Add = async (e) =>{

    e.preventDefault();    
    
    await addDoc (CHECADORCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entrada:entrada , salida:salida, laborando:laborando, comentario:comentario, ubicacion:ubicacion})
    await addDoc (MONITOREOCollection, {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']:user['AREA FUNCIONAL'],['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'] , entrada:entrada , salida:salida, laborando:laborando, comentario:comentario, ubicacion:ubicacion})
    
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
  

  // socket.emit("send_message", {entrada , salida, comentario, user });
  // socket.emit("send", {salida});
  // socket.emit("send_message_", {comentario});
    
  

    MySwal.fire({
			position: 'center',
			icon: 'success',
			title: 'Bienvenido Registro hecho con exito !!!',
			showConfirmButton: false,
			timer: 2500
		  })    
      
  }
 

  const Entrada = async () =>{

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

alert(d);

setEntrada(
  d =  
  dia[d.getDay()] +" " +d.getDate()+" " + mesok[d.getMonth()]+ " " + d.getFullYear() + " - "+ " " +d.getHours() +' : ' +d.getMinutes()+ ' : ' +d.getSeconds()

)  

setOcultarBoton(true);
      return  entrada;  
  }



  const Salida = async () =>{
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
 
 alert(d);
 
 setSalida(
   d =  
   dia[d.getDay()] +" " +d.getDate()+" " + mesok[d.getMonth()]+ " " + d.getFullYear() + " - "+ " " +d.getHours() +' : ' +d.getMinutes()+ ' : ' +d.getSeconds()
 )  
//  setOcultarBoton(false);

 return  salida;     
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
    <label className="col-sm-1 col-form-label"   >Nombre:</label>
    <div className="col-sm-7">
    <input
    
                        value={user['NOMBRE COMPLETO']}                      
                        onChange ={()=> setUsuarios(user['NOMBRE COMPLETO'])}  

                        // placeholder ={(e)=> setUsuarios(e.target.value)}
                        type='text'
                        className='form-control '                                                 
                    />
                    
    {/* <div class="invalid-feedback">
      Por favor escribe tu usuario 
    </div> */}

    </div>
    </div>

    <div className="row mb-1 justify-content-center" >
    <label className="col-sm-1 col-form-label"   >Email:</label>
    <div className="col-sm-7">
    <input
    
                        value={user['CORREO ELECTRONICO']}                      
                        onChange ={()=> setCorreo(user['CORREO ELECTRONICO'])}  
                        type='text'
                        className='form-control '                                                 
                    />
                    
    {/* <div class="invalid-feedback">
      Por favor escribe tu usuario 
    </div> */}

    </div>
    </div>
    
    <div className="row mb-1 justify-content-center"   >
    <label className="col-sm-1 col-form-label">Area Funcional</label>
    <div className="col-sm-7">

						<input  value={user['AREA FUNCIONAL']}  
                      onChange ={()=> setPuesto(user['AREA FUNCIONAL'])}                        
                      type='text'
                      className='form-control '
                      
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
                      
                      />					        
    </div>
    </div>


    
    <div className="row mb-1 justify-content-center"  >
    <label className="col-sm-1 col-form-label">Estado</label>
    <div className="col-sm-7">
    <select value={laborando}  onChange ={(e)=> setLaborando(e.target.value)} className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example" required>
						
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
  <button 
    id='btnEntrada'
    Style="padding:15px; padding-left:35px;"  
    onClick={Entrada}  
    value={entrada}  
    type='submit'  
    className='btn btn-success '  
    
  > 
    Entrar
  </button>  
    
    {/* :

    <></>
}
     */}
  

  {!ocultarBoton ?
      
    <></>
    
    :

     <button 
     id='btnSalida'
     Style="padding:15px; padding-left:35px;"  
     onClick={Salida}  
     value={salida} 
     className='btn btn-success '
      >       
     salida
     </button>  
    
    }

  </div>

</form>

    </div>
  )
}

export default TableUser
