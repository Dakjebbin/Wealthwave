import React, { useState } from 'react' 
import "../styles/login.css"
import { image_2 } from '../assets/assest'
import eye from "../assets/eye.svg"
import eyeOff from "../assets/eye-off.svg"
import mail from "../assets/mail.svg"
import { Link } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 // const Navigate = useNavigate()

  const baseUrl = import.meta.env.VITE_BASEURL
//axios with credentials
axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
      e.preventDefault();

      if (!email || !password) {
        alert('Please all fields are required')
        return;
  }

  axios.post(`${baseUrl}/auth/login`, {
    email,
    password
  }).then((response) => {
    
    if (response.data.success === true) {
      toast.success(response?.data?.message)
    } 
    setEmail('')
    setPassword('')
    window.location.assign("/dashboard");
   })
  .catch((error) => {
     if (error instanceof axios.AxiosError) {
      //console.log('');
    } if(error === 404 || error) {
      const errorMessage =  error.message 
      toast.error(errorMessage) 
    } 
  })
}
  return (
    <div style={{marginTop:"60px"}}>
      <div className='login-container'>
        <div className='login-grid-1'>
          <div>
      <h3 className='welcome'>Welcome <span style={{color:"black"}}>Back</span></h3>
      <p className='welcome-2'>Please Enter Your Details</p>
      <form onSubmit={handleSubmit}>


        
      
      <div className='email-container'>
        <input 
        type="email" 
        placeholder='Email'
        required 
        value={email}
        onChange={(e) => setEmail (e.target.value)}
        className="password-input-box"
        id="email" />

        <div className='absolut'>
          <img src={mail} alt="" />
        </div>
</div>
<div className="password-container">
                
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input-box"
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>
    <div className='links-forgot'>
        <a className='forgot' href="#forgot">Forgotten Password?</a>
        <Link to="/register">Not Registered?</Link>
        </div>
        <button type='submit' className='login-button'>Log in</button>
      </form>
      
      </div>
      </div>

      <div className="login-grid-2">
        <img className='loginImage' src={image_2} alt="" />
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login