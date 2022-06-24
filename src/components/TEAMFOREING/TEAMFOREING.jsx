import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../../Config/firestore';

function TEAMFOREING({user}) {
  const [Monitoreo, setMonitoreo] = useState([]);
  const [counter, setCounter] = useState(10);
    
  const [colaboladores, setcolaboladores] = useState([]);
  const colaboladoresCollection = collection(db, "colaboladores")
  
  const MONITOREOCollection = collection(db, "Monitoreo")  

  const getMonitoreo = async () => {
    const data = await getDocs(MONITOREOCollection)    
    setMonitoreo(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Monitoreo)

  }

  const getcolaboladores = async () => {
    const data = await getDocs(colaboladoresCollection)
    // console.log(data.docs);
    setcolaboladores(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(colaboladores)

}




  const deleteUser = async ( id )=>{
    const userDoc = doc(db, "Monitoreo", id) 
    await deleteDoc(userDoc)
    getMonitoreo()

  }



  const comparar = async ()=>{
    console.log("iguales");


  }

  useEffect(() =>{
      if(counter > 0){
          setTimeout(()=>setCounter(counter - 1), 1000);
      }
      if(counter === 0){
      //  deleteUser(id)
       console.log("eliminar ");
      }
  },[counter]);
   


  useEffect(() => {
  
    getMonitoreo()      
    getcolaboladores()   

    comparar()
 

    
  }, [])

 





  return (
    <div>
      <div className='container ' >

            <div className="card">
        <div className="card-body" >
              <h6 className='card-text text-center'>Lista de colaboradores</h6>
              <br />
        </div>
      </div>
{
          colaboladores        
          .map((colabolador) => {
            if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN') {
             
            

          return (

                <div className='border border-primary'>
                <div key={colabolador.id} className="float-start m-2 " >
 
            <div className="card " >
              <div className="card-body">
               
              
                        <p className="card-text text-center">  {colabolador['NOMBRE COMPLETO']  } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> 
                        </div>
                        
            </div>
            
                   </div>  
                  </div>                      
          )

          }
        }
          )
}

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<br />


<div className="card">
        <div className="card-body" >
              <h6 className='card-text text-center'>Lista de checado</h6>
              
        </div>
      </div>

<br />
        <div className="row ">

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
          Monitoreo        
          .map((monitoreo) => {

            if (monitoreo['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN') {

              if (monitoreo['EQUIPO DE TRABAJO'] === colaboladores['NOMBRE COMPLETO']) {
                          console.log("hola guapo");
              }

              return (

                <div key={monitoreo.id} className="row">

                  <div className="col-sm-3">
                    <div className="card ">
                      <div className="card-body">
                        <p className="card-text text-center">  {monitoreo['NOMBRE COMPLETO']} </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text text-center"> {monitoreo['EQUIPO DE TRABAJO']} </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <div className="card">
                      <div className="card-body bg-danger text-white">
                        <p className="card-text text-center"> {monitoreo.entrada } </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <div className="card">
                      <div className="card-body bg-success text-white">
                        <p className="card-text text-center"> {monitoreo.salida}  </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-3">
                    <div className="card">
                      <div className="card-body bg-light text-dark">
                        <p className="card-text text-center"> {monitoreo.comentario} </p>
                      </div>
                    </div>
                  </div>
                  
                  <span >
            {counter}          
                  </span>
                      {/* <button className='btn btn-primary' onClick={()=> (deleteUser(monitoreo.id))}> Borrar</button> */}
                  <br /><br />

                </div>

              )

            }
          }
          )
        }

      </div>
    </div>
  )
}

export default TEAMFOREING
