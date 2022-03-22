import React,{useState} from 'react'
import firebase from "../../Server/firebase"
import { NavLink, useNavigate } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import "./Register.css"

const Register = () => {

 
    const navigate=useNavigate();
    let errors = [];

    const[userName, setuserName] = useState();
    const[userEmail, setuserEmail] = useState();
    const[userPassword, setuserPassword] = useState();
    const[userNumber, setuserNumber] = useState();
    const[userDob, setuserDob] = useState();
    const [errorState, seterrorState] = useState(errors);
    
    const [isSuccess, setIsSuccess] = useState(false);

    // const handleInput =(event)=>{
    //     let target =event.target;
    //     setuserState((currentState)=>{
    //         let currentuser={ ...currentState };
    //         currentuser[target.Dob]=target.value;
    //         return currentuser;
    //     })

    // }

const checkForm=()=>{
    if(isFormEmpty())
    {
        seterrorState((error) => error.concat({ message: "Please fill in all fields" }));
        return false;
    }
    else if(!checkPassword())
    {
        return false;
    }
    return true;
}
 const isFormEmpty=()=>{
    return !userName.length||
    !userPassword.length ||
    !userNumber.length ||
    !userEmail.length||
    !userDob.length;
}

const checkPassword=()=>{
    if(userPassword.length<8)
    {
        seterrorState((error) => error.concat({ message: "Password length should be greater than 8" }));
        return false;
    }
    if(userNumber<10000000)
    {
        seterrorState((error) => error.concat({ message: "Enter correct phone number" }));
        return false;
    }
    const d = new Date();
    if(userDob>d)
    {
        seterrorState((error) => error.concat({ message: "Enter correct date of birth" }));
        return false;
    }
    return true;
}


const onSubmit=(event)=>{
    console.log(userEmail+" "+userName+" "+userNumber+" "+userDob+" "+userPassword+" ")
    
    seterrorState(() => []);
        
        if (checkForm()) {

            
            firebase.auth()
                .createUserWithEmailAndPassword(userEmail, userPassword)
                .then(createdUser => {
                    updateuserDetails(createdUser);
                    firebase.firestore().collection("user").doc(createdUser.uid).set(
                        {
                            email:userEmail,
                            name:userName,
                            dob:userDob,
                            number:userNumber
                        }
                    );


                    // saveuserinDB();
                   
                    navigate("/")
                })
                .catch(serverError => {
                   
                    seterrorState((error) => error.concat(serverError));
                })

        }
}
    

      const updateuserDetails = (createdUser) => {
        if (createdUser) {
            
            createdUser.user
                .updateProfile({
                    displayName: userName,
                })
                .then(() => {
                   // setIsLoading(false);
                   
                  
                       // navigate("/Username");
                   
                                     
                     // saveUserInDB(createdUser);
                })
                .catch((serverError) => {
                   
                    seterrorState((error) => error.concat(serverError));
                })
        }
    }
//  const saveuserinDB=(createdUser)=>{
//     firebase.firestore().collection("")
//  }
  
      const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }



  return (
    <>
     <div className='title'>Regsiter</div>
    
         <div className='register'> 
        <div class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4" value={userEmail}
onChange={(e)=>{setuserEmail(e.target.value)}}/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword4" value={userPassword}
onChange={(e)=>{setuserPassword(e.target.value)}}/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Name</label>
    <input type="text" class="form-control" id="inputAddress" value={userName}
onChange={(e)=>{setuserName(e.target.value)}}/>
  </div>
  
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Phone No.</label>
    <input type="number" class="form-control" id="inputCity" value={userNumber}
onChange={(e)=>{setuserNumber(e.target.value)}}/>
  </div>
  <div class="col-md-6">
    <label for="inputState" class="form-label">DOB</label>
    <input type="date" class="form-control" id="inputCity" value={userDob}
onChange={(e)=>{setuserDob(e.target.value)}}/>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary" onClick={()=>onSubmit()}>Register</button>
  </div>
   <small>    <NavLink to="/login"> Already registered?</NavLink></small>
   <div className="message">
  
          {errorState.length > 0 && <Message error >
                <h3>Errors</h3>
                {formaterrors()}
            </Message>
            }
            {isSuccess && <Message success>
                <h3>Successfully Registered</h3>
                <p>User is successfully registered</p>
            </Message>
            }

</div>
</div>

        </div>
    </>
  )
}

export default Register
