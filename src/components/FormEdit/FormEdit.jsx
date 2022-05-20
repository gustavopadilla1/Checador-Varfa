import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getDoc, updateDoc, doc} from 'firebase/firestore'
import {db} from '../../Config/firestore';



const FormEdit = () => {

  const [usuario, setUsuarios] = useState("");
  const [correo, setCorreo] = useState ("");
  const [password, setPassword] = useState ("");
  const [rol, setRol]= useState("");
  const [puesto, setPuesto]= useState("");
  const [entrada, setEntrada]= useState("");
  const [salida, setSalida]= useState("");

  const navigate = useNavigate();

  const {id} = useParams();

  const update = async (e) =>{
    e.preventDefault()
    const usuario_= doc(db, "usuarios", id)
    const data = {usuario: usuario, correo:correo, password:password, rol:rol, puesto:puesto, entrada:entrada, salida:salida}
    await updateDoc(usuario_, data)
    navigate('/');
  }

  const getUsuariosById = async (id) =>{
     const usuario_ = await getDoc(doc (db, `usuarios/${id}`))
    // console.log(usuario_.data());
    // const usuario_ = doc(db, "usuarios", id)
    
      if (usuario_.exists()) {
        console.log(usuario_.data());         
        // setUsuarios(usuario_.data().usuario)
        // setCorreo(usuario_.data().correo)
        // setPassword(usuario_.data().password)
        // setRol(usuario_.data().rol)
        // setPuesto(usuario_.data().puesto)
        // setEntrada(usuario_.data().entrada)
        // setSalida(usuario_.data().salida)

      }else{
        console.log("el usuario no existe");
      }
  }

  useEffect(()=>{
    getUsuariosById()
    console.log("Aquie estoy");
  }, [] ) 


  return (
    <div className='container'>
    <div className='row'>
      <div className=' COL'>
        <h1> Editar usuario</h1>

            <form onSubmit={update}>
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
                <button type='submit' className='btn btn-primary'> Editar</button>
            </form>

      </div>
    </div>
  </div>
  )
}

export default FormEdit
