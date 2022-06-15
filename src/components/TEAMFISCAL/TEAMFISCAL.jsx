import React, { useEffect, useState } from 'react';
import { collection, getDocs, } from 'firebase/firestore'
import { db } from '../../Config/firestore';

function TEAMFISCAL({user}) {
    const [colaboladores, setcolaboladores] = useState([]);
    const colaboladoresCollection = collection(db, "colaboladores")

    const getcolaboladores = async () => {
        const data = await getDocs(colaboladoresCollection)
        // console.log(data.docs);
        setcolaboladores(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(colaboladores)

    }

    useEffect(() => {
        getcolaboladores()

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
                    colaboladores.map((colabolador) => {
                                               
                        
                            if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM FISCAL') {
                                return (
                                    <div key={colabolador.id} className="row">

                                    <div className="col-sm-3">
                                         <div className="card ">
                                            <div className="card-body">
                                              {/* <h6 className="card-title">Comentarios</h6>                                         */}
                                                 <p className="card-text text-center">  {colabolador['NOMBRE COMPLETO']} </p>
                                                 {/* <a href="#" className="btn btn-primary">Ver Mas</a> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                         <div className="card">
                                            <div className="card-body">
                                              {/* // <h6 className="card-title">Comentarios</h6>                                         */}
                                                 <p className="card-text text-center"> {colabolador['EQUIPO DE TRABAJO']} </p>
                                                 {/* <a href="#" className="btn btn-primary">Ver Mas</a> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                         <div className="card">
                                            <div className="card-body bg-danger text-white" >
                                              {/* // <h6 className="card-title">Comentarios</h6>                                         */}
                                                 <p className="card-text text-center"> en proseso  </p>
                                                 {/* <a href="#" className="btn btn-primary">Ver Mas</a> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                         <div className="card">
                                            <div className="card-body bg-success text-white">
                                              {/* // <h6 className="card-title">Comentarios</h6>                                         */}
                                                 <p className="card-text text-center"> en proseso  </p>
                                                 {/* <a href="#" className="btn btn-primary">Ver Mas</a> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                         <div className="card">
                                            <div className="card-body bg-light text-dark">
                                              {/* // <h6 className="card-title">Comentarios</h6>                                         */}
                                                 <p className="card-text text-center"> en proseso  </p>
                                                 {/* <a href="#" className="btn btn-primary">Ver Mas</a> */}
                                            </div>
                                        </div>
                                    </div>                                    
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

export default TEAMFISCAL
