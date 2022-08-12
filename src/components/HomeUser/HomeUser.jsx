import React from 'react'
import TableUser from '../../components/TableUser';


// import { Button } from '@mui/material';
// import { BrowserRouter,Route,Routes } from 'react-router-dom';


function HomeUser({user}) {

    return (
      <div>

        {/* <BrowserRouter>
          <Routes>
        <Route path='/' element={<TableAdmin/>}/>
        <Route path='/FormEdit/:id' element={<FormEdit/>}/>
        <Route path='/FormCreate' element={<FormCreate/>}/>        
      </Routes>
    </BrowserRouter> */}

        <TableUser user = {user}/>        

      </div>
    );
  }
export default HomeUser
