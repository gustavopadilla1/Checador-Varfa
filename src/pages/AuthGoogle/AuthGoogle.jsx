import React ,{useState}from 'react'
import {Auth, google} from '../../Config/GogleAuth';
import Appbar from '../../components/Appbar/Appbar'
import { Container, CssBaseline, Grid, Paper } from '@mui/material';
function AuthGoogle() {
  const [, setUser] = useState(null);
	const [photo, setPhoto] =useState (null);
	const [displayName, setDisplayName] =useState(null);
	
	
	const loginGogle = () => {
	  Auth.signInWithPopup(google)
	  .then( res =>{
		console.log(res.user);
		setUser(res.user);
		setPhoto(res.user.photoURL)    
		setDisplayName(res.user.displayName)
	  }).catch(err =>{
		console.log(err);
	  })
	}
  return (
	<div>
<Appbar/>



<Grid container component='main' className='vh-100 row justify-content-center align-items-center'>
			<CssBaseline />		
			<Container component={Paper} elevation={6} maxWidth='xs' >		 

<div className="d-grid gap-2 col-12 mx-auto">
  <button className="btn btn-success btn-lg" onClick={loginGogle} type="button">Checar</button>
</div>
<br/>

{ photo?
  <div>
    <img height='100' src={photo} alt = "imagen no definidad"/>
    <br/>
    <br/>
	<h5>Bienvenido:</h5>
    <p>{displayName}</p>
	
  </div>
  :
  <span></span>
}

</Container>
</Grid>

</div>
  )
}

export default AuthGoogle
