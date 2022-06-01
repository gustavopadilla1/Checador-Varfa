import React, {useState} from 'react';
import Reloj from '../Reloj/Reloj';
import { collection, addDoc } from 'firebase/firestore' 
import { db} from '../../Config/firestore';

// import firebaseApp from '../../Config/Credenciales'
// import {getAuth} from 'firebase/auth';

// const auth = getAuth(firebaseApp);



import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


const TableUser = () => {

  const [correo ,] = useState("");
  const [usuario, setUsuarios] = useState("");

  const [puesto, setPuesto]= useState("");
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");
  const [motivo, setMotivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [ubicacion, ] = useState("");


  
  const [ocultarBoton, setOcultarBoton] = React.useState(false);

        


  const userCollection = collection(db, "usuarios");

  const Add = async (e) =>{

    e.preventDefault();    
    
    await addDoc (userCollection, {correo:correo, usuario: usuario, puesto:puesto, entrada:entrada , salida:salida, motivo:motivo, comentario:comentario, ubicacion:ubicacion})
    console.log(e);
    console.log({usuario: usuario, puesto:puesto, entrada:entrada , salida:salida, motivo:motivo, comentario:comentario, ubicacion:ubicacion});
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

// setBtnEntrada(
//       btnSalida = true
//     )


// if (btnEntrada === true ) {
//   btnSalida = false;  
// }
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



//   const Correo = async ({user}) =>{
//   setCorreo(
//     user.email
//   )   
//   return correo;
//  };




  return (
    <div>
      
      <Reloj/> 
      <br></br>

      <form  className="was-validated"
      onSubmit={Add}
      >

  <br/><br/>
  
  
        <div className="row mb-1 justify-content-center" >
    <label className="col-sm-1 col-form-label"   >Usuario:</label>
    <div className="col-sm-7">
    <input
                        value={usuario}
                        onChange ={(e)=> setUsuarios(e.target.value)}
                        type='text'
                        className='form-control is-invalid' 
                        
                        required
                    />
    {/* <div class="invalid-feedback">
      Por favor escribe tu usuario 
    </div> */}

    </div>
    </div>
    
    <div className="row mb-1 justify-content-center"   >
    <label className="col-sm-1 col-form-label">puesto</label>
    <div className="col-sm-7">

						<select  value={puesto}  onChange ={(e)=> setPuesto(e.target.value)}  className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example" required>
						
            <option></option>
						<option>Sistemas</option>
						<option>Contador</option>
						<option>R.H</option>
						<option>Mantenimiento</option>
						<option>Limpieza</option>
						</select>
    </div>
    </div>

    
    <div className="row mb-1 justify-content-center"  >
    <label className="col-sm-1 col-form-label">Estado</label>
    <div className="col-sm-7">
    <select value={motivo}  onChange ={(e)=> setMotivo(e.target.value)} className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example" required>
						
            <option></option>            
						<option>Home Office</option>
						<option>Oficina</option>
						<option>Visita de un cliente</option>					
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

  <div className='col-md-12 text-center'>    
    <button className='btn btn-primary'> Ubicacion</button>
  </div>



  
    
    <div className='col-md-12 '>

{/* {!ocultarBoton ? */}
  <button 
    id='btnEntrada'
    Style="padding:15px; padding-left:35px;"  
    onClick={Entrada}  
    value={entrada}  
    type='submit'  
    className='btn btn-success float-left'  
    // onClick={btnEntrada}
    
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
     className='btn btn-success float-end'
     
     // onClick={btnsalida}             
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
