import React, {useState, useEffect} from 'react';
import Reloj from '../Reloj/Reloj';
import { collection, addDoc } from 'firebase/firestore' 
import { db} from '../../Config/firestore';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


const TableUser = () => {

  const [usuario, setUsuarios] = useState("");
  const [puesto, setPuesto]= useState("");
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");
  const [motivo, setMotivo] = useState("");
  const [ubicacion, setubicacion] = useState("");

  const userCollection = collection(db, "usuarios");

  const Add = async (e) =>{
    e.preventDefault();
    await addDoc (userCollection, {usuario: usuario, puesto:puesto, entrada:entrada , salida:salida, motivo:motivo, ubicacion:ubicacion})
    console.log(e);
    MySwal.fire({
			position: 'center',
			icon: 'success',
			title: 'Bienvenido',
      title: 'Registro hecho con exito !!!',
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
    var mesok=new Array(12);
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

return entrada;
        
  }

  return (
    <div>
      <Reloj/> 

      <form 
      onSubmit={Add}
      >

  <br/><br/>
  
  
        <div className="row mb-3 justify-content-center" >
    <label className="col-sm-1 col-form-label">Usuario:</label>
    <div className="col-sm-7">
    <input
                        value={usuario}
                        onChange ={(e)=> setUsuarios(e.target.value)}
                        type='text'
                        className='form-control'
                    />
    </div>
    </div>
    


    <div className="row mb-3 justify-content-center"   >
    <label className="col-sm-1 col-form-label">puesto</label>
    <div className="col-sm-7">

						<select  value={puesto}  onChange ={(e)=> setPuesto(e.target.value)}  className="form-select form-select-lg mb-3" aria-label=".form-select-md example" >
						
						<option>Sistemas</option>
						<option>Contador</option>
						<option>R.H</option>
						<option>Mantenimiento</option>
						<option>Limpieza</option>
						</select>
    </div>
    </div>

    
    <div className="row mb-3 justify-content-center"  >
    <label className="col-sm-1 col-form-label">Estado</label>
    <div className="col-sm-7">
    <select value={motivo}  onChange ={(e)=> setMotivo(e.target.value)} className="form-select form-select-lg mb-3" aria-label=".form-select-md example" >
						
						<option>Home Oficce</option>
						<option>Oficina</option>
						<option>Visita de un cliente</option>					
						</select>
               
    </div>
    </div>

  <div className='col-md-12 text-center'>    
    <button className='btn btn-primary'> Ubicacion</button>
  </div>

  <div className='col-md-12 '>
  <button onClick={Entrada} value={entrada}  type='submit'  className='btn btn-success float-left'> Entrar</button>    
  </div>

  {/* <div className='col float-md-right '>
    <button  className='btn btn-success float-md-right'> salida</button>
  </div> */}

</form>


    </div>
  )
}

export default TableUser
