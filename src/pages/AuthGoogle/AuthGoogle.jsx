import React ,{useState}from 'react'
import {Auth, google} from '../../Config/GogleAuth';
import Appbar from '../../components/Appbar/Appbar'
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
<button onClick={loginGogle}> Google </button><br/>

{ photo?
  <div>
    <img height='50' src={photo} alt = "imagen no definidad"/>
    <br/>
    <p>{displayName}</p>
  </div>
  :
  <span></span>
}



      
    </div>
  )
}

export default AuthGoogle
