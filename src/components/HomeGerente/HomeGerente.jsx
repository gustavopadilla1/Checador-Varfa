import React, { useEffect, useState } from 'react';
import { collection, getDocs, } from 'firebase/firestore'
import { db } from '../../Config/firestore';

import Reloj from '../Reloj/Reloj';
import TEAMFOREING from '../TEAMFOREING/TEAMFOREING';
import TEAMADMIN from '../TEAMADMIN/TEAMADMIN';
import TEAMFISCAL from '../TEAMFISCAL/TEAMFISCAL';
import TEAMDIRECCIÓN from '../TEAMDIRECCIÓN/TEAMDIRECCIÓN';
import DirectorGeneral from '../DirectorGeneral';

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ChecarSupervisor from '../ChecarSupervisor';


function HomeGerente({ user }) {
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
 {/* <h4>Hola administrador</h4> */}
 
  



            <Reloj />
{/* 
            <BrowserRouter>
        <Routes>    
      <Route path='/ChecarSupervisor' element={<ChecarSupervisor user={user}/>}/>
    </Routes> */}
            <br />

                {user['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN' ? <TEAMFOREING user={user} />  : <div></div>}
                {user['EQUIPO DE TRABAJO'] === 'TEAM ADMIN' ? <TEAMADMIN user={user} /> : <div></div>}
                {user['EQUIPO DE TRABAJO'] === 'TEAM FISCAL' ? <TEAMFISCAL user={user} /> : <div></div>}
                {user['EQUIPO DE TRABAJO'] === 'TEAM DIRECCIÓN' ? <TEAMDIRECCIÓN user={user} /> : <div></div>}

                {user['AREA FUNCIONAL'] === 'Dirección General' ? <DirectorGeneral user={user} /> : <div></div>}

            {/* </BrowserRouter> */}

        </div>
    )
}


export default HomeGerente