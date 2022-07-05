import React ,{useState,useEffect} from 'react'
import {AppBar, Toolbar, Typography, Box, IconButton, Button, Tooltip,Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {getAuth,signOut} from 'firebase/auth';
import firebaseApp from '../../Config/Credenciales'

import { collection, getDocs, addDoc} from 'firebase/firestore'
import { db } from '../../Config/firestore';

const auth = getAuth(firebaseApp);

function Appbar() {
    const [colaboladores, setcolaboladores] = useState([]);
    const colaboladoresCollection = collection(db, "colaboladores")


    const getcolaboladores = async () => {
        const data = await getDocs(colaboladoresCollection)
        // console.log(data.docs);
        setcolaboladores(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(colaboladores)
    
      }
    
      // use efect  
      useEffect(() => {
        getcolaboladores()
      }, [])
    
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
                            <MenuIcon />
                        </IconButton>

                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>                        
                        Home                                                
                        </Typography>

                        <Button color="inherit" onClick={()=> signOut(auth)} >
                            salir
                    </Button>                                               
                    
                    
                    {
            colaboladores
              .map((colabolador) => {
                        <Tooltip title="Open settings" key={colabolador.id}>                        
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="G" src={colabolador.foto } />                            

                            </IconButton>
                        </Tooltip> 
              }
              )
            }
                    </Toolbar>
              </AppBar>
            </Box>
        </div>

    </div>
  )
}

export default Appbar
