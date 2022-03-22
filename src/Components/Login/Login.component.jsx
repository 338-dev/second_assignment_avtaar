import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import "./Login.css"
import firebase from '../../Server/firebase'
import avatar from "./avatar.png"
const Login = () => {

    const navigate = useNavigate();

    
    let errors = [];

    const [userEmail, setuserEmail] = useState();
    const [userPassword, setuserPassword] = useState();
    
   
    const [errorState, seterrorState] = useState(errors);
    const [isSuccess, setIsSuccess] = useState(false);


    // const handleInput = (event) => {
    //     let target = event.target;
    //     setuserState((currentState) => {
    //         let currentuser = { ...currentState };
    //         currentuser[target.name] = target.value;
    //         return currentuser;
    //     })
    // }

    const checkForm = () => {
        if (isFormEmpty()) {
            seterrorState((error) => error.concat({ message: "Please fill in all fields" }));
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userPassword.length ||
            !userEmail.length;
    }

    const formaterrors = () => {

        return (
        
        errorState.map((error, index) => <p key={index}>{error.message}</p>
      ))
    }

 

    const onSubmit = (event) => {
        //console.log(userEmail+userPassword)
        seterrorState(() => []);
        if (checkForm()) {
            
            
            firebase.auth()
                .signInWithEmailAndPassword(userEmail, userPassword)
                .then(user => {
                    //alert("ssfsf")
                  setIsSuccess(true)
                   
                   
                   navigate("/app")
                    
                })
                .catch(serverError => {
                    //alert(serverError)
                   
                    seterrorState((error) => error.concat(serverError));
                })

        }
    }

  return (
  <>
        
            <div className='title'>
                    Login
            </div>
            
            <div className='login'>
        
            <div class="mb-3">
            <img src={avatar} alt="avatar" width={"40%"}/>       
  <input 
  type="email" 
  class="form-control" 
  id="formGroupExampleInput email" 
  placeholder="Email"
  value={userEmail} 
  onChange={(e)=>setuserEmail(e.target.value)}/>
</div>
<div class="mb-3">
  <input 
  type="password" 
  class="form-control" 
  id="formGroupExampleInput2 password" placeholder="Password" 
  value={userPassword} 
  onChange={(e)=>setuserPassword(e.target.value)}/>
</div>
<center>
<button
className='btn btn-outline-primary' 
onClick={onSubmit}>
    login
</button>
</center>
<small>
<NavLink to="/register">Not registered?</NavLink>
</small>

<div className='message'>{errorState.length > 0 && <Message error>
      <center><h3>Errors</h3>
      {formaterrors()}</center>
      </Message>
        }
           
    {isSuccess && errorState.length===0 &&<Message success>
        <center><h3>Successfully Loggedin</h3>
        <p>User is successfully loggedin</p></center>
    </Message>
    }</div>
</div>
  </>
   
  )
}

export default Login