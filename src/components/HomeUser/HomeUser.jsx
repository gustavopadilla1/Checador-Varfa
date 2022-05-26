import React from 'react'

import TableUser from '../../components/TableUser';
// import { Button } from '@mui/material';
// import { BrowserRouter,Route,Routes } from 'react-router-dom';


function HomeUser() {

    return (
      <div>
        <h4>Hola Usuario</h4>  

        {/* <BrowserRouter>
          <Routes>
        <Route path='/' element={<TableAdmin/>}/>
        <Route path='/FormEdit/:id' element={<FormEdit/>}/>
        <Route path='/FormCreate' element={<FormCreate/>}/>        
      </Routes>
    </BrowserRouter> */}

        <TableUser/>        

      </div>
    );
  }
export default HomeUser
