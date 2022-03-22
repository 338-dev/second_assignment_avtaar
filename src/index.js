import React,{useEffect} from 'react';
import firebase from './Server/firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login/Login.component';
import Register from './Components/Register/Register.component';


const Index = () => {
  const user=firebase.auth().currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    if(user)
    {
        navigate("/app")
    }
  }, [user])
  
  return(
    
      <Routes>
          <Route path="/app" element={<App />}/>
          <Route index element={<Login />}/>
          <Route path="/register" element={<Register />}/>

      </Routes>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Index/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
