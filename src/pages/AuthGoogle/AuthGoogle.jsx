import React ,{useState}from 'react'
import {Auth, google} from '../../Config/GogleAuth';
import {AppBar, Toolbar, Box } from '@mui/material';
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
	<div Style="
  background-image: url('https://firebasestorage.googleapis.com/v0/b/checador-97e97.appspot.com/o/background_image.jpg?alt=media&token=328fb308-86d6-42f6-b672-e4158e6a51d6');
  background-repeat: no-repeat;
  background-size: cover;
  "
  >
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
			<Container component={Paper} elevation={6} maxWidth='xs' >	<br/>	 

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
