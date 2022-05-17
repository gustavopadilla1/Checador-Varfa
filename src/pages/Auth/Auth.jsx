import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@mui/material'
import  firebaseApp from '../../Config/Credenciales';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

import {getFirestore, doc, setDoc, loadBundle} from 'firebase/firestore'

const auth = getAuth(firebaseApp);


const App = () => {
	const firestore = getFirestore(firebaseApp);
	const [User, setUser] = useState({email:"", password:"", rol:"" });
	const [data, setData] = useState(false);
	

	const handleChange = e => {
		setUser({
			...User,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit =()=> {
		
		console.log("Aqui estoy");
		console.log(User.email);
		console.log(User.password);


		// console.log(firestore);

		// if (User) {
		// 	// setUser(email,password,rol);
		// 	entrar();
		// }else{
		// 	//entrar
		// }	
	}

	async function entrar (email, password	) {
		const infouser = await createUserWithEmailAndPassword(auth,email,password)
		.then((usuarioFirebase)=>{
			return usuarioFirebase;
		});
		console.log(infouser);
	}

	// console.log(infouser.user.uid);
	// const docuRef = await doc(firestore, `usuarios/${infouser.uid}`);
	// setDoc(docuRef,{correo: email, rol:rol});

	return (		
		<Grid container component='main' Style= "padding:150px">
			<CssBaseline />		
			<Container component={Paper} elevation={5} maxWidth='xs' >		
				<div >				
					<Avatar >
						{/* <LockOutlinedIcon /> */}
					</Avatar>
					<Typography component='h1' variant='h5'>Sign In</Typography>					
					<form >
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='email'
							name='email'
							id='email'
							value={User.email}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Password'
							name='password'
							id='password'
							value={User.password}
							onChange={handleChange}
						/>

						<label>
							<select id="rol">
								<option value="Administrador">Admin</option>
								<option value="Usuario">user</option>								
							</select>

						</label>

						<Button
							fullWidth
							variant='contained'
							color='secondary'	
							value ={data? "Registar": "Iniciar Secion"}						
							onClick={() => onSubmit()}													
						/>
												
						{/* <Button
							fullWidth
							variant='contained'
							color='secondary'	
							
							 onClick={() => setUser(!User)}>
							 {User ? "Cueta existe": "quiero registrarme"}													
						
						</Button> */}


					</form>
				</div>
			</Container>
		</Grid>
	)
}

export default App

