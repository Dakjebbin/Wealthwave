import React, { useState } from 'react' //eslint-disable-line
import "../styles/login.css"

import eye from "../assets/eye.svg"
import eyeOff from "../assets/eye-off.svg"
import mail from "../assets/mail.svg"
import call from "../assets/cal.svg"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  //const [confirmpassword, setConfirmPassword] = useState("");

  const Navigate = useNavigate()

  const baseUrl = import.meta.env.VITE_BASEURL


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || !username || !email || !phoneNumber || !password) {
      toast.error("All fields are required.");
        return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    axios.post(`${baseUrl}/auth/register`, {
      fullname,
      username,
      email,
      phonenumber: phoneNumber,
      password
    }).then((response) => {

      if(response.data.success === true) {
          toast.success("Registration successful", {
            position: "top-center"
          })
      } else if(response.data.success === false) {
        toast.error("Registration failed: " + (response.error || 'Unknown error'));
      }
      
        
      setFullName('')
      setUserName('')
      setEmail('')
      setPhoneNumber('')
      setPassword('')
        
      Navigate("/login")
        
    }). catch((error) => {
      if (error instanceof axios.AxiosError) {
       toast.error(
          error?.response?.data
        );
      } else {
        toast.error("reg error => ", error);
      }
    
    })
    

  }


  return (
    <div style={{marginTop:"60px"}}>
      <div className='login-container'>
        <div className='login-grid-1'>
          <div>
      <h3 className='welcome'>Welcome</h3>
      <p className='welcome-2'>Please Enter Your Details</p>
      
      <form onSubmit={handleSubmit}>

      <input type="text"
        placeholder='Full Name'
        required
        className='password-input-box'
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
       
        
      />
    
      <br />
      <br />
<div>
      <input 
      type="text" 
      placeholder='Username'
      required
      className='password-input-box'
      value={username}
      onChange={(e) => setUserName(e.target.value)}
      />
</div>
      
      <br />
      <div className='email-container'>
        <input 
        type="email" 
        placeholder='Email'
        id="email"
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="password-input-box"
        />

        <div className='absolut'>
          <img src={mail} alt="" />
        </div>
</div>

<br />

<div className='email-container'>
        <input 
        type="number" 
        placeholder='Phone Number'
        required 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="password-input-box"
        id="phonenumber" />

        <div className='absolut'>
          <img src={call} alt="" />
        </div>
</div>


<div className="password-container">
                
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder='Password'
                    className="password-input-box"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>


              <div className='checkbox'>
        <input type="checkbox" name="" id="" required />
        <span style={{marginLeft:"10px"}}>I have Agreed to the <a href="/terms" style={{color:"blue"}}>Terms & Conditions</a></span>
        </div>
     
      
<div>
        <button className='login-button'>Sign Up</button>
        </div>
      </form>

        <div style={{textAlign:"center", marginTop:"15px"}}>
           <span>  Already Have an account?</span> <Link to="/login" style={{color:"blue"}}>Sign In</Link>
      </div>

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

export default Register