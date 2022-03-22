import './App.css';
import { useState,useEffect } from 'react';
import firebase from './Server/firebase';
import { Navigate, useNavigate } from 'react-router-dom';

function App() {
  var user=firebase.auth().currentUser;
  const navigate=useNavigate()
  const [name, setName] = useState("User");

  useEffect(() => {
    if(user){
      const displayName = user.displayName;
      setName(displayName); 
      console.log(displayName)
         
  }
    
  }, [user]);
  

  const logout=()=>{
    firebase.auth().signOut()
    navigate("/")
    
  }

  return (
   <>
     <div className='user'>
       Welcome {name}
     </div>
     <div className='messages'>
       Your details have been registered
     </div>
<div className='logout'>
     <div>
       Click below to logout
     </div>
     <button className='btn btn-outline-danger' onClick={()=>logout()}>
    Logout
     </button>
     </div>
    
     </>
  );
}

export default App;
