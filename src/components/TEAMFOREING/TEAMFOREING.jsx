import React, { useEffect, useState } from 'react';
import { collection, getDocs, } from 'firebase/firestore'
import { db } from '../../Config/firestore';


function TEAMFOREING({user}) {
    // const [colaboladores, setcolaboladores] = useState([]);
    const [checadores, setchecadores] = useState([]);
    const [entrada, setEntrada]= useState("");


    // const colaboladoresCollection = collection(db, "colaboladores")
    const checadorCollection = collection(db, "Checador")

    // const getcolaboladores = async () => {
    //     const data = await getDocs(colaboladoresCollection)
    //     // console.log(data.docs);
    //     setcolaboladores(
    //         data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     )
    //     console.log(colaboladores)

    // }

    const getchecadores = async () => {
      const data = await getDocs(checadorCollection)
      // console.log(data.docs);
      setchecadores(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
      console.log(checadores)


  }


  const entradaReciente = async () => {
    
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
  dia[d.getDay()] +" " +d.getDate()+" " + mesok[d.getMonth()]+ " " + d.getFullYear() 

)
return entrada;
  }



    useEffect(() => {
        // getcolaboladores()
        getchecadores()
        entradaReciente()        
    }, [])

  return (
    <div>
      
      <div className='container'>
    
    
      <div className="row">

  <div className="col-sm-3">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title text-center">Nombre:</h6>        
      </div>
    </div>
  </div>
  <div className="col-sm-2">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title text-center">Equipo:</h6>        
      </div>
    </div>
  </div>

  <div className="col-sm-2">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title text-center">Status de Entrada:</h6>        
      </div>
    </div>
  </div>
  <div className="col-sm-2">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title text-center">Status de Salida:</h6>        
      </div>
    </div>
  </div>

  <div className="col-sm-3">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title text-center">Comentarios:</h6>        
      </div>
    </div>
  </div>


</div>
<br />

                {
                    checadores.map((checador) => {
                                                                     
                            if (checador['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN') {
                              
                              if (checador.entrada > entrada) {                                
                              
                                return (

                                    <div key={checador.id} className="row">

                                    <div className="col-sm-3">
                                         <div className="card ">
                                            <div className="card-body">
                                                 <p className="card-text text-center">  {checador['NOMBRE COMPLETO']} </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                         <div className="card">
                                            <div className="card-body">
                                              {/* // <h6 className="card-title">Comentarios</h6>                                         */}
                                                 <p className="card-text text-center"> {checador['EQUIPO DE TRABAJO']} </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                         <div className="card">
                                            <div className="card-body bg-danger text-white" >
                                              
                                                 <p className="card-text text-center"> {checador.entrada} </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                         <div className="card">
                                            <div className="card-body bg-success text-white">                                              
                                                 <p className="card-text text-center"> {checador.salida}  </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                         <div className="card">
                                            <div className="card-body bg-light text-dark">                                              
                                                 <p className="card-text text-center"> en proseso  </p>
                                            </div>
                                        </div>
                                    </div>                                    
                                    <br /><br />  
                                  </div>
                                  
                                   
                                    
                                )
                            }
                        }
                    }
                    )
                }


            </div>


    </div>
  )
}

export default TEAMFOREING
