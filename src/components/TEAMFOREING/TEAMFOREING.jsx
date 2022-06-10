import React, { useEffect, useState } from 'react';
import { collection, getDocs, } from 'firebase/firestore'
import { db } from '../../Config/firestore';

function TEAMFOREING({user}) {
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
    
                <div className="col d-flex bd-highlight example-parent ">

                    <div className="row p-2 m-4 flex-fill border border-primary border-2 rounded-5">
                        <p className='fw-bolder text-center '>Nombres</p>
                    </div>
                    <div className="row p-2 m-4 flex-fill border border-primary border-3 rounded-5">
                        <p className='fw-bolder text-center'>   Equipo</p>
                    </div>
                    <div className="row p-2 m-4 flex-fill border border-primary border-3 rounded-5">
                        <p className='fw-bolder text-center'>Status de Entrada</p>
                    </div>
                    <div className="row p-2 m-4 flex-fill border border-primary border-3 rounded-5">
                        <p className=' fw-bolder text-center'>Status de Salida</p>
                    </div>
                    <div className="row p-2 m-4 flex-fill border border-primary border-3 rounded-5">
                        <p className=' fw-bolder text-center'>Comentarios</p>
                    </div>

                </div>


                {
                    colaboladores.map((colabolador) => {
                                               
                        
                            if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN') {
                                return (
                                    <div key={colabolador.id} className="row">

                                        <div className="col-3 p-1 border border-dark border-2 rounded shadow">
                                            <p className=' text-center '>{colabolador['NOMBRE COMPLETO']}</p>
                                        </div>
                                        <div className="col-3 p-1 border border-primary border-3 rounded">
                                            <p className=' text-center'>{colabolador['EQUIPO DE TRABAJO']}</p>
                                        </div>
                                        <div className="col-2 p-1 border border-primary border-3 rounded">
                                            <p className=' text-center'>prueba</p>
                                        </div>
                                        <div className="col-2 p-1 border border-primary border-3 rounded">
                                            <p className='  text-center'>prueba</p>
                                        </div>
                                        <div className="col-2 p-1 border border-primary border-3 rounded">
                                            <p className='  text-center'>prueba</p>
                                        </div>
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
