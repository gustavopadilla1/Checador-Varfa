import React from 'react'

import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';

import HomeAdmin from '../../components/HomeAdmin/HomeAdmin'
import HomeUser from '../../components/HomeUser/HomeUser'
import firebaseApp from '../../Config/Credenciales'
import {getAuth, signOut} from 'firebase/auth';
const auth = getAuth(firebaseApp);

function Home({user}) {
  return (
    <div>   
   <div>            
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"  color='primary'>
                {/* <AppBar position="fixed" color='primary'> */}

                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}

                        </IconButton>
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>                        
                        Home                        
                        </Typography>

                        <Button color="inherit" onClick={()=> signOut(auth)} >
                            salir
                    </Button>                                               
{/* 
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="G" src="" />
            
                            </IconButton>
                        </Tooltip> */}

                    </Toolbar>
              </AppBar>
            </Box>
        </div>

      <h2>Bienvenido</h2>        
        {user.rol==="Administrador" ? <HomeAdmin/>: <HomeUser/>}
    </div>
  )
}

export default Home
