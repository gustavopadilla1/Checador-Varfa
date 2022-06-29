import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Config/firestore';

function TEAMDIRECCION({ user }) {
  const [Monitoreo, setMonitoreo] = useState([]);


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


  useEffect(() => {

    getMonitoreo()
    getcolaboladores()    

  }, [])


  return (
    <div>
      <div className='container ' >

      <table class="table">
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">Equipo</th>
      <th scope="col">Ubicacion</th>
      <th scope="col">Entrada</th>
      <th scope="col">Salida</th>
      <th scope="col">Comentaios</th>
      <th scope="col">Telefono</th>
      
    </tr>
  </thead>
  <tbody >
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>



        <div className="row ">

          <div className="col-sm-2">
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
          colaboladores
            .map((colabolador) => {

              if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM ADMIN') {


                return (

                  <div key={colabolador.id} className="row">

                    <div className="col-sm-2">
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text text-center " >  { colabolador['NOMBRE COMPLETO'] } </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="card p-1">
                        <div className="card-body">
                          <p className="card-text text-center p-2"> {colabolador['EQUIPO DE TRABAJO']} </p>
                        </div>
                      </div>
                    </div>

                    {/* .slice(0,1) */}

                    {
                      Monitoreo
                      // .slice(0,2)                      
                        .map((monitoreo ) => {
                          if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {    
                                                                                  

                            return (                                
                                <div className="col-sm-2" key={colabolador.id}>
                                  <div className="card ">
                                    <div className="card-body ">
                                      <p className="card-text text-center text-danger font-weight-bold">  {monitoreo.entrada } </p>
                                    </div>
                                  </div>                                  
                                </div>
                            )                          
                          }
                         
                          
                        }
                        )
                    }

{
                      Monitoreo
                      // .slice(0,10)
                        .map((monitoreo) => {
                          if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO'] ) {                            

                            // if (monitoreo.salida === "") {                              
                            return (
                                
                                <div className="col-sm-2" key={monitoreo.id}>
                                  <div className="card ">
                                    <div className="card-body ">
                                      <p className="card-text text-center text-success font-weight-bold">  {monitoreo.salida  } </p>
                                    </div>
                                  </div>
                                </div>

                            )                          
                          }
                        //   else{
                        //     <div className="col-sm-2" >
                        //           <div className="card ">
                        //             <div className="card-body bg-primary">
                        //               <p className="card-text text-center .text-primary font-weight-bold">  {monitoreo.salida  } </p>
                        //             </div>
                        //           </div>
                        //         </div>
                        //   }
                        // }
                        
                      }
                        )
                    }
                    
                    

{
                      Monitoreo
                        .map((monitoreo) => {
                          if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO'] ) {
                            return (
                                
                                <div className="col-sm-3" key={monitoreo.id}>
                                  <div className="card ">
                                    <div className="card-body">
                                      <p className="card-text text-center text-success font-weight-bold">  {monitoreo.comentario  } </p>
                                    </div>
                                  </div>
                                </div>

                            
                              
                              
                            )                          
                          }
                        }
                        )
                    }


<br /><br /><br /><br />
                      
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

export default TEAMDIRECCION
