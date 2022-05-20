import React from 'react';
import Reloj from '../Reloj/Reloj';

const TableUser = () => {

  return (
    <div>
      
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre:</th>
      <th scope="col">Gustavo</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Motivo:</td>      
     <td>
     <button className='btn btn-primary'> Entrar</button>
      <button className='btn btn-primary'> Salir</button>

     </td>
    </tr>

    <tr>
      <th scope="row">2</th>
      <td>Estado:</td> 
      <td>
      <button className='btn btn-primary'> Oficina</button>
      <button className='btn btn-primary'> Home Ofice</button>
      </td>     
    </tr>
    
    <tr>
      <th scope="row">3</th>
      <td>Ubicacion:</td>   
      <td>
      <button className='btn btn-primary'> compartir</button>      
      </td>
    </tr>

    <tr>
      <th scope="row">3</th>
      <td>Reloj:</td>      
      <Reloj/>
    </tr>

    <button className='btn btn-primary'>Enviar</button>      
  </tbody>
</table>
      
      


    </div>
  )
}

export default TableUser
