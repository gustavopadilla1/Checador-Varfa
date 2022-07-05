import React ,{useState}from 'react'
import {Auth, google} from '../../Config/GogleAuth';
import {AppBar, Toolbar, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
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
 <div>            
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"  color='primary'>              
                                        <Toolbar>
                            {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>                                                                                     */}
                    </Toolbar>
              </AppBar>
            </Box>
        </div>


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
