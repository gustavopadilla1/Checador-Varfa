import React, { useState } from 'react'
import { Grid, Container, Paper,TextField, Button} from '@mui/material'
import  firebaseApp from '../../Config/Credenciales';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
import {getFirestore, doc, setDoc} from 'firebase/firestore'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


const auth = getAuth(firebaseApp);


const CreateUser = () => {
	const firestore = getFirestore(firebaseApp);
	const [data] = useState(true);

	const navigate = useNavigate();

	async function registrar (email, password, rol, usuario, puesto, entrada, salida, motivo, ubicacion) {
		const infouser = await createUserWithEmailAndPassword(
            auth,email, password, rol, usuario
    )
		.then((usuarioFirebase)=>{
			return usuarioFirebase;
		});	
		// console.log(infouser);
	

	console.log(infouser.user.uid);	
	const docuRef = doc(firestore, `usuarios/${infouser.user.uid}`);
	setDoc(docuRef,{
        correo: email, rol:rol, password: password, usuario: usuario, 
        puesto: puesto, entrada: entrada, salida: salida, motivo: motivo, ubicacion: ubicacion
    });	
	}
	

	function onSubmit(e) {
	e.preventDefault();
	const email = e.target.elements.email.value;
	const password = e.target.elements.password.value;	
	const rol = e.target.elements.rol.value; 	
    const usuario = e.target.elements.usuario.value;
    const puesto = e.target.elements.puesto.value;
	const entrada = e.target.elements.entrada.value;
	const salida = e.target.elements.salida.value; 
    const motivo = e.target.elements.motivo.value; 
    const ubicacion = e.target.elements.ubicacion.value; 

    
	
	console.log("submit",email, password, rol, usuario, puesto, entrada, salida, motivo, ubicacion  );

	if (data) {		
		registrar(email, password, rol, usuario, puesto, entrada, salida, motivo, ubicacion );
		MySwal.fire({
			position: 'center',
			icon: 'success',
			title: 'Usuario Guardado con exito!!!',
			showConfirmButton: false,
			timer: 3000
		  })
		navigate('/');
    }else{
        signInWithEmailAndPassword(auth, email, password);
    }	
}

	return (		
		<Grid container component='main'  className="was-validated">
			
			<Container component={Paper}  elevation={20} maxWidth='md' >		
				<div >											
                    <h3> {data ? "registrar": "Iniciar secion"} </h3>					
			
					<form onSubmit={onSubmit} >
                    
                    <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='usuario'
							// name='usuario'
							id='usuario'
							// value={User.usuario}
							// onChange={handleChange}
						/>
                        

						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='email'							
							id='email'	
							// placeholder="name@example.com"						
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Password'							
							id='password'
						/>

						<br></br>
						<label>Rol</label>
						<select onchange={'onSubmit (e)'} id='rol' className="form-select form-select-lg mb-3" aria-label=".form-select-md example">
												
						<option>Usuario</option>
						<option>Administrador</option>						
						</select>
											
						<label>Puesto</label>
						<select onchange={'onSubmit (e)'} id='puesto' className="form-select form-select-lg mb-3" aria-label=".form-select-md example" >
						
						<option>Sistemas</option>
						<option>Contador</option>
						<option>R.H</option>
						<option>Mantenimiento</option>
						<option>Limpieza</option>
						</select>

                            <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							// label='Hora de entrada'
							type='datetime-local'							
							id='entrada'							
						/>
                        
                        <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							// label='Hora de salida'							
							id='salida'
							type='datetime-local'
						/>
						
						<label>Estado</label>
						<select onchange={'onSubmit (e)'} id='motivo' className="form-select form-select-lg mb-3" aria-label=".form-select-md example" >
						
						<option>Home Oficce</option>
						<option>Oficina</option>
						<option>Visita de un cliente</option>					
						</select>

                            <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Ubicacion'							
							id='ubicacion'							
						/>
					

						<Button
							type="submit"
							fullWidth
							variant='contained'
								
							>
								Agregar</Button>													
					</form>

					 
					{/* <button onClick={()=> setData(!data)}>
						{data ? "Cueta existe" : "quiero registrarme"}	
					</button> */}
				</div>
			</Container>
		</Grid>
	)
}

export default CreateUser

