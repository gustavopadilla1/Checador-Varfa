import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore' 
import { db} from '../../Config/firestore';

function FormCreate() {
  const [usuario, setUsuarios] = useState("");
  const [correo, setCorreo] = useState ("");
  const [password, setPassword] = useState ("");
  const [rol, setRol]= useState("");
  const [puesto, setPuesto]= useState("");
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");

  const navigate = useNavigate();

  const userCollection = collection(db, "usuarios");

  const Add = async (e) =>{
    e.preventDefault();
    await addDoc (userCollection, {usuario: usuario,correo:correo, password: password, rol:rol, puesto:puesto, entrada:entrada, salida:salida})
    // console.log(e);
    navigate('/');
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className=' COL'>
          <h1> Agregar usuario</h1>

              <form onSubmit={Add}>
                  <div className='mb-3'>
                    <label className='form-label'>Usuario</label>
                    <input
                        value={usuario}
                        onChange ={(e)=> setUsuarios(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Correo</label>
                    <input
                        value={correo}
                        onChange ={(e)=> setCorreo(e.target.value)}
                        type='email'
                        className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        value={password}
                        onChange ={(e)=> setPassword(e.target.value)}
                        type='password'
                        className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Rol</label>
                    <input
                        value={rol}
                        onChange ={(e)=> setRol(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Puesto</label>
                    <input
                        value={puesto}
                        onChange ={(e)=> setPuesto(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Hora de Entrada</label>
                    <input
                        value={entrada}
                        onChange ={(e)=> setEntrada(e.target.value)}
                        type='datetime-local'
                        className='form-control'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Hora de Salida</label>
                    <input
                        value={salida}
                        onChange ={(e)=> setSalida(e.target.value)}
                        type='datetime-local'
                        className='form-control'
                    />
                  </div>
                  <button type='submit' className='btn btn-primary'> Agregar</button>
              </form>

        </div>
      </div>
    </div>
  )
}

export default FormCreate
