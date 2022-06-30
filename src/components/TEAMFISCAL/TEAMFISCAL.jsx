import React, { useEffect, useState } from 'react';
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../../Config/firestore';

function TEAMFISCAL({ user }) {
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
    <div user = {user}>
      <div className='container ' >
        <table className="table">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 15px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>



          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM FISCAL') {
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >       
                        <td >
                          
                          <div >
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 45}} alt="Avatar" />

                               <a><b>{colabolador['NOMBRE COMPLETO']} </b></a>  <br/>
                          
                                <p style={{marginLeft:50 }} className='fst-italic lh-1'>
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>                          
                        
                        </div>
                        </td>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>




                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                        
                                        return (
                                        <div>
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 16px;"
                                              className='text-primary'><b>
                                                {monitoreo.laborando} 
                                                </b>
                                          </td>
                                        </div>
                                        )
                              }
                            }
                            )
                        }





                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <td>
                                      <div>
                                    <a>{monitoreo.entradahora} </a>
                                    </div>
                                    </td>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }


{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                    <td>
                                      
                                      <br ></br><br ></br>
                                      
                                    <p>                                                       
                                    {monitoreo.salidahora}                                                                        
                                 </p>  
                                 
                                 </td> 
                                  )
                                }
                                
                              }
                            }
                            )
                        }


                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                
                                return (      
                                  <div>                                                              
                                  <td 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 16px;"><b>
                                       
                                        {monitoreo.comentario} 
                                      
                                        </b>
                                        
                                  </td>                                  
                                  </div>
                                )
                              }
                            }
                            )
                        }

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

export default TEAMFISCAL
