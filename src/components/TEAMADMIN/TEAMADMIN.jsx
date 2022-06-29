import React, { useEffect, useState } from 'react';
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../../Config/firestore';

function TEAMADMIN({ user }) {
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
              <th scope="col">TELEFONO</th>

            </tr>
          </thead>



          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM ADMIN') {
                  return (
                    <tbody key={colabolador.id}>
                      <tr >       
                        <td scope="row">
                          
                          <div >
                              <img src={colabolador.foto ?? "https://st.depositphotos.com/1694341/1307/i/600/depositphotos_13070213-stock-photo-bruno-mars.jpgg"} className="rounded-circle" style={{width: 45}} alt="Avatar" />

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
                                 if (monitoreo.laborando =="") {
                                   
                                    return(
                                     <div >
                                       <p>hola</p>
                                     </div>
                                    )
                                  } 
                                      else{
                                        
                                        return (
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 16px;">
                                                {monitoreo.laborando} 
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
                                

                                return (
                                <td Style="font-family: 'Heebo', sans-serif; Font-size: 16px;" 
                                    className='text-success'><b>
                                    {monitoreo.entradahora}</b>
                                </td>
                                )
                              }


                            }
                            )
                        }

                        {
                          Monitoreo
                            // .slice(0,10)
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                // if (monitoreo.salida === "") {                              
                                return (

                                  <td 
                                    Style="font-family: 'Heebo', sans-serif; Font-size: 15px;" 
                                    className='text-success'>
                                    {monitoreo.salidahora}
                                    
                                  </td>
                                )
                              }


                            }
                            )
                        }

                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                return (


                                  <td Style="font-family: 'Heebo', sans-serif; Font-size: 15px; ">{monitoreo.comentario}</td>
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

export default TEAMADMIN
