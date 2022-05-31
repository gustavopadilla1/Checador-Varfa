import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, TextField, Button, CssBaseline } from '@mui/material'
import  firebaseApp from '../../Config/Credenciales';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {getFirestore, doc, setDoc} from 'firebase/firestore'

const auth = getAuth(firebaseApp);


const App = () => {
	const firestore = getFirestore(firebaseApp);
	const [data] = useState(false);


	async function registrar (email, password, rol	) {
		const infouser = await createUserWithEmailAndPassword(auth,email, password, rol)
		.then((usuarioFirebase)=>{
			return usuarioFirebase;
		});	
		// console.log(infouser);
	

	console.log(infouser.user.uid);	
	const docuRef = doc(firestore, `usuarios/${infouser.user.uid}`);
	setDoc(docuRef,{correo: email, rol:rol});	
	}
	

	function onSubmit(e) {
	e.preventDefault();
	const email = e.target.elements.email.value;
	const password = e.target.elements.password.value;
	const rol = e.target.elements.rol.value; 

	console.log("submit", email, password, rol );

	if (data) {		
		registrar(email, password, rol);
			}else{
		 		signInWithEmailAndPassword(auth, email, password);
		 	}	
}



	
	return (		
		<Grid container component='main'  Style="margin:30px; padding:50px;">
			<CssBaseline />		
			<Container component={Paper} elevation={4} maxWidth='xs' >		
				<div >								
					<Avatar >
					</Avatar>
					<h1> {data ? "registrar": "Iniciar secion"} </h1>					
					{/* <Typography component='h1' variant='h5'>Iniciar secion</Typography>				 */}



					<form  onSubmit={onSubmit}>
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='email'
							// name='email'
							id='email'
							// value={User.email}
							// onChange={handleChange}
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Password'
							// name='password'
							id='password'
							// value={User.password}
							// onChange={handleChange}
						/>

			<div Style="Font-Size:0px">
						<TextField 
						Style="padding:-100px; margin:-100px; border 0px"							
							id='rol'							
					/>		
			</div>
						<Button
							type="submit"
							fullWidth
							variant='contained'
							color='secondary'	
							value ={data? "Registar": "Iniciar Secion"}						
																				
						>Iniciar secion</Button>													
					</form>


					 
					{/* <button onClick={()=> setData(!data)}>
						{data ? "Cueta existe": "quiero registrarme"}	
					</button> */}
				</div>
			</Container>
		</Grid>
	)
}

export default App

