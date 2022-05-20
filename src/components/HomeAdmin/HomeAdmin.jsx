import React from 'react'
import TableAdmin from '../TableAdmin/TableAdmin'
import FormCreate from '../FormCreate/FormCreate'
import FormEdit from '../FormEdit/FormEdit'

import { BrowserRouter,Route,Routes } from 'react-router-dom';

function HomeAdmin() {

    return (
      <div>
        <h4>Hola administrador</h4>
        
        <BrowserRouter>
          <Routes>
        <Route path='/' element={<TableAdmin/>}/>
        <Route path='/FormEdit/:id' element={<FormEdit/>}/>
        <Route path='/FormCreate' element={<FormCreate/>}/>        
      </Routes>
    </BrowserRouter>

        


      
      </div>

      );
  }
export default HomeAdmin
