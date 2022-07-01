import React from 'react'
import TableAdmin from '../TableAdmin/TableAdmin'
// import FormCreate from '../FormCreate/FormCreate'
// import FormEdit from '../FormEdit/FormEdit'
import CreateUser from '../CreateUser';

import { BrowserRouter,Route,Routes } from 'react-router-dom';


function HomeAdmin({user}) {

    return (
      <div>
        {/* <h4>Hola administrador</h4> */}
        
        <BrowserRouter>
          <Routes>
        <Route path='/' element={<TableAdmin user={user}/>}/>
        {/* <Route path='/FormEdit/:id' element={<FormEdit/>}/>
        <Route path='/FormCreate' element={<FormCreate/>}/>       */}
        <Route path='/CreateUser' element={<CreateUser/>}/>
      </Routes>
    </BrowserRouter>

        


      
      </div>

      );
  }
export default HomeAdmin
