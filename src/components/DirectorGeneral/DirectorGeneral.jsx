import React, { useEffect, useState } from 'react';
import { Link, Route,  Routes } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

 function DirectorGeneral({ user }) {

  //estados del monitoreo de los colaboradores y respecto al monitoreo
  const [Monitoreo, setMonitoreo] = useState([]);
  const [colaboladores, setcolaboladores] = useState([]);

  // bd de los colaboradores y del monitoreo
  const colaboladoresCollection = collection(db, "colaboladores")
  const MONITOREOCollection = collection(db, "Monitoreo")

  ///mostrar el monitoreo 
  const getMonitoreo = async () => {
    const data = await getDocs(MONITOREOCollection)
    setMonitoreo(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Monitoreo)

  }

  //mostrar los colaboradores
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
    getMonitoreo()
    getcolaboladores()
  }, [])



  /// funcion que muetra todos los monitoreos de todos los colaboradores
  function Home() {
    return <>
        <div className='' > 
        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 12px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>
<br />


          {
            colaboladores
              .map((colabolador) => {
                
                
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >    
                        <div className='h-25'>
                        <td >
                        <div  className="h-25">
                            
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 40}} alt="Avatar" />
                             
                            
                           <div style={{marginLeft:50, marginTop:-40}}>
                               <a  Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px; ">
                                {colabolador['NOMBRE COMPLETO']} 
                                </a>

                            <br />
                                <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>    

                                </div>                      
                            </div>
                        </td>
                        </div>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>
                        



                        {
                          Monitoreo                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                if(!monitoreo.laborandoMonitoreo ==""){
                                        return (
                                     
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 13px;"
                                              className='text-primary'>
                                                 <b>
                                                {monitoreo.laborandoMonitoreo } 
                                                </b>                                                
                                          </td>
                                        
                                        ) 
                                 }  
                              }
                            }
                            )
                        }





                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <td  className='text-success'>
                                    
                                    <a Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                      {monitoreo.entradahora} </a>                                    
                                    </td>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }


{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                    <td>
                                      
                                    
                                    
                                  <p Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">                                                       
                                  <br />
                                  {monitoreo.salidahora}                                                                        
                               </p>  
                               
                               </td> 
                                  )
                                }
                                
                              }
                            }
                            )
                        }


                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                if(!monitoreo.comentarioMonitoreo ==""){
                                return (      
                                                                                             
                                  <td 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                       
                                        {monitoreo.comentarioMonitoreo} 

                                  </td>                                  
                                
                                )
                                }
                              }
                            }
                            )
                        }

                      </tr>

                    </tbody>
                  )

                }
              
              )
          }
        </table>

      </div>
    </>

  }



  /// funcion monitoreo de de los colaboradores del equipo de administracion 
  function TEAMADMIN() {
    return <>
      <div className='' > 
        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 12px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>
<br />


          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM ADMIN') {
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >    
                        <div className='h-25'>
                        <td >
                        <div  className="h-25">
                            
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 40}} alt="Avatar" />
                             
                            
                           <div style={{marginLeft:50, marginTop:-40}}>
                               <a  Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px; ">
                                {colabolador['NOMBRE COMPLETO']} 
                                </a>

                            <br />
                                <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>    

                                </div>                      
                            </div>
                        </td>
                        </div>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>
                        



                        {
                          Monitoreo                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                if(!monitoreo.laborandoMonitoreo ==""){
                                        return (
                                     
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 13px;"
                                              className='text-primary'>
                                                 <b>
                                                {monitoreo.laborandoMonitoreo } 
                                                </b>                                                
                                          </td>
                                        
                                        ) 
                                 }  
                              }
                            }
                            )
                        }





                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <td  className='text-success'>
                                    
                                    <a Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                      {monitoreo.entradahora} </a>                                    
                                    </td>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }


{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                    <td>
                                      
                                    
                                    
                                  <p Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">                                                       
                                  <br />
                                  {monitoreo.salidahora}                                                                        
                               </p>  
                               
                               </td> 
                                  )
                                }
                                
                              }
                            }
                            )
                        }


                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                if(!monitoreo.comentarioMonitoreo ==""){
                                return (      
                                                                                             
                                  <td 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                       
                                        {monitoreo.comentarioMonitoreo} 

                                  </td>                                  
                                
                                )
                                }
                              }
                            }
                            )
                        }

                      </tr>

                    </tbody>
                  )

                }
              }
              )
          }
        </table>

      </div>
    </>

  }



  function TEAMFOREING() {
    return <>
       <div className='' > 
        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 12px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>
<br />


          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN') {
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >    
                        <div className='h-25'>
                        <td >
                        <div  className="h-25">
                            
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 40}} alt="Avatar" />
                             
                            
                           <div style={{marginLeft:50, marginTop:-40}}>
                               <a  Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px; ">
                                {colabolador['NOMBRE COMPLETO']} 
                                </a>

                            <br />
                                <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>    

                                </div>                      
                            </div>
                        </td>
                        </div>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>
                        



                        {
                          Monitoreo                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                if(!monitoreo.laborandoMonitoreo ==""){
                                        return (
                                     
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 13px;"
                                              className='text-primary'>
                                                 <b>
                                                {monitoreo.laborandoMonitoreo } 
                                                </b>                                                
                                          </td>
                                        
                                        ) 
                                 }  
                              }
                            }
                            )
                        }





                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <td  className='text-success'>
                                    
                                    <a Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                      {monitoreo.entradahora} </a>                                    
                                    </td>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }


{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                    <td>
                                      
                                    
                                    
                                  <p Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">                                                       
                                  <br />
                                  {monitoreo.salidahora}                                                                        
                               </p>  
                               
                               </td> 
                                  )
                                }
                                
                              }
                            }
                            )
                        }


                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                if(!monitoreo.comentarioMonitoreo ==""){
                                return (      
                                                                                             
                                  <td 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                       
                                        {monitoreo.comentarioMonitoreo} 

                                  </td>                                  
                                
                                )
                                }
                              }
                            }
                            )
                        }

                      </tr>

                    </tbody>
                  )

                }
              }
              )
          }
        </table>

      </div>
    </>

  }



  function TEAMFISCAL() {
    return <>
       <div className='' > 
        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 12px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>
<br />


          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM FISCAL') {
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >    
                        <div className='h-25'>
                        <td >
                        <div  className="h-25">
                            
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 40}} alt="Avatar" />
                             
                            
                           <div style={{marginLeft:50, marginTop:-40}}>
                               <a  Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px; ">
                                {colabolador['NOMBRE COMPLETO']} 
                                </a>

                            <br />
                                <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>    

                                </div>                      
                            </div>
                        </td>
                        </div>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>
                        



                        {
                          Monitoreo                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                if(!monitoreo.laborandoMonitoreo ==""){
                                        return (
                                     
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 13px;"
                                              className='text-primary'>
                                                 <b>
                                                {monitoreo.laborandoMonitoreo } 
                                                </b>                                                
                                          </td>
                                        
                                        ) 
                                 }  
                              }
                            }
                            )
                        }





                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <td  className='text-success'>
                                    
                                    <a Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                      {monitoreo.entradahora} </a>                                    
                                    </td>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }


{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                    <td>
                                      
                                    
                                    
                                  <p Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">                                                       
                                  <br />
                                  {monitoreo.salidahora}                                                                        
                               </p>  
                               
                               </td> 
                                  )
                                }
                                
                              }
                            }
                            )
                        }


                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                if(!monitoreo.comentarioMonitoreo ==""){
                                return (      
                                                                                             
                                  <td 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                       
                                        {monitoreo.comentarioMonitoreo} 

                                  </td>                                  
                                
                                )
                                }
                              }
                            }
                            )
                        }

                      </tr>

                    </tbody>
                  )

                }
              }
              )
          }
        </table>

      </div>
    </>

  }

  function TEAMDIRECCION() {
    return <>
       <div className='' > 
        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 12px;" >
              <th  scope="col">USUARIO</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">LABORANDO</th>
              <th scope="col">ENTRADA</th>
              <th scope="col">SALIDA</th>
              <th scope="col">COMENTARIOS</th>                

            </tr>
          </thead>
<br />


          {
            colaboladores
              .map((colabolador) => {
                
                if (colabolador['EQUIPO DE TRABAJO'] === 'TEAM DIRECCION') {
                  return (
                    
                    <tbody key={colabolador.id}>
                      <tr  >    
                        <div className='h-25'>
                        <td >
                        <div  className="h-25">
                            
                              <img src={colabolador.foto ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{width: 40}} alt="Avatar" />
                             
                            
                           <div style={{marginLeft:50, marginTop:-40}}>
                               <a  Style="font-family: 'Anek Latin', sans-serif; Font-size: 16px; ">
                                {colabolador['NOMBRE COMPLETO']} 
                                </a>

                            <br />
                                <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                   {colabolador['CORREO ELECTRONICO']}
                                </p>    

                                </div>                      
                            </div>
                        </td>
                        </div>
                        <td 
                            Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" > 
                            {colabolador['EQUIPO DE TRABAJO']} 
                        </td>
                        



                        {
                          Monitoreo                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                              
                                if(!monitoreo.laborandoMonitoreo ==""){
                                        return (
                                     
                                          <td 
                                              Style="font-family: 'Heebo', sans-serif; Font-size: 13px;"
                                              className='text-primary'>
                                                 <b>
                                                {monitoreo.laborandoMonitoreo } 
                                                </b>                                                
                                          </td>
                                        
                                        ) 
                                 }  
                              }
                            }
                            )
                        }





                        {
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                if (!monitoreo.entradahora=="") {
                                  return(
                                    <td  className='text-success'>
                                    
                                    <a Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                      {monitoreo.entradahora} </a>                                    
                                    </td>
                                    
                                  )
                                }                               
                                
                              }
                            }
                            )
                        }


{
                          Monitoreo
                            // .slice(0,2)                      
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {

                                  if(!monitoreo.salidahora ==""){
                                  return (
                                    
                                    <td>
                                      
                                    
                                    
                                  <p Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">                                                       
                                  <br />
                                  {monitoreo.salidahora}                                                                        
                               </p>  
                               
                               </td> 
                                  )
                                }
                                
                              }
                            }
                            )
                        }


                        {
                          Monitoreo
                            .map((monitoreo) => {
                              if (colabolador['NOMBRE COMPLETO'] === monitoreo['NOMBRE COMPLETO']) {
                                if(!monitoreo.comentarioMonitoreo ==""){
                                return (      
                                                                                             
                                  <td 
                                      Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
                                       
                                        {monitoreo.comentarioMonitoreo} 

                                  </td>                                  
                                
                                )
                                }
                              }
                            }
                            )
                        }

                      </tr>

                    </tbody>
                  )

                }
              }
              )
          }
        </table>

      </div>
    </>

  }


  return (

    <div user={user}>

  <div className="row mb-1 justify-content-center" >
    <div className="col-sm-4">
    <FormControl className='container'>
      
        <InputLabel id="demo-simple-select-label">Monitorear</InputLabel>
          <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"          
             label="type"
          >


              <MenuItem> <Link  Style =" color: black; text-decoration: none;" to="/">Todos</Link></MenuItem>
              <MenuItem><Link Style =" color: black; text-decoration: none;" to="/TEAMFOREING">TEAM FOREIGN</Link></MenuItem>
              <MenuItem><Link Style =" color: black; text-decoration: none;" to="/TEAMADMIN">TEAM ADMIN</Link></MenuItem>
              <MenuItem><Link Style =" color: black; text-decoration: none;" to="/TEAMFISCAL">TEAM FISCAL</Link></MenuItem>
              <MenuItem><Link Style =" color: black; text-decoration: none;"to="/TEAMDIRECCION"> TEAM DIRECCIÓN</Link></MenuItem>
        </Select>
      </FormControl>
      <br /> <br /><br />
                  
    </div>
    </div>

     




      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/TEAMFOREING' element={<TEAMFOREING />} />
        <Route path='/TEAMADMIN' element={<TEAMADMIN />} />
        <Route path='/TEAMFISCAL' element={<TEAMFISCAL />} />
        <Route path='/TEAMDIRECCION' element={<TEAMDIRECCION />} />
      </Routes>

    </div>

  )
}

export default DirectorGeneral
