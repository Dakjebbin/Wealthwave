import { useRef, useState } from 'react' 
import "../styles/login.css"

import eye from "../assets/eye.svg"
import eyeOff from "../assets/eye-off.svg"
import mail from "../assets/mail.svg"
import {useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { assets } from '../assets/assest'
import "../styles/about.css"
import { FaSpinner } from 'react-icons/fa'

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [logging, setLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

 const Navigate = useNavigate();
 const inputRefs = useRef([]);

 const handleInput = (e, index) => {
     if (e.target.value.length > 0 && index < inputRefs.current.length - 1){
        inputRefs.current[index + 1].focus();
     }
 }

 const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === "" && index > 0) {
       inputRefs.current[index - 1].focus();
    }
 }

 const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=> {
        if (inputRefs.current[index]) {
            inputRefs.current[index].value = char;
        }
    })
 }

  const baseUrl = import.meta.env.VITE_BASEURL
  axios.defaults.withCredentials = true
//axios with credentials
const onSubmitEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/auth/forgot-Password`, {
                email
            })
                    
            if (response.data.success === true) {
                toast.success(response?.data?.message)
                setIsEmailSent(true)
            } else{
                toast.error(response?.data?.message || "Something went wrong")
            }
        } catch (error) {
            setLogging(false);
            if (error.response) {
                // Backend responded with an error
                if (error.response.status === 404) {
                    toast.error("Email not found! Please check your email address.");
                } else if (error.response.status === 400) {
                    toast.error("Invalid email format. Please enter a valid email.");
                } else {
                    toast.error(error.response?.data?.message || "An error occurred while processing your request.");
                }
            } else if (error.request) {
                // No response received from the server
                toast.error("Network error. Please try again later.");
            } else {
                // Other types of errors (e.g., invalid configuration)
                toast.error("An unexpected error occurred.");
            }
        }  finally {
            setLogging(false); // Reset logging status after completion
        }
}

const onSubmitOtp = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map(e => e.value)
      setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
   
}

const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
        const response = await axios
        .post(`${baseUrl}/auth/reset-password`,{
            email, 
            otp, 
            newPassword
        })

        if (response.data.success === true) {
            toast.success(response?.data?.message)
            Navigate("/login")
        }
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            toast.error(
               error?.response?.data
             );
           } else {
             toast.error("reg error => ", error);
           }
    }
}
  return (
    <div > 
        <div className="hero">
                <div className="hero-container">
                {!isEmailSent &&
                  <div className="description">
                    
                  <div className='login-grid-1'>
                  <div>
              <h3 className='welcome'>Reset <span style={{color:"black"}}>Password</span></h3>
              <p className='welcome-2'>Enter Your Registered Email address</p>
              <form onSubmit={onSubmitEmail}>

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
                <div>
                <button type='submit' 
                disabled={logging}
                className='login-button'
                >
                  {logging ? (
                      <div className="flex items-center space-x-2 justify-center">
                      <span className="animate-pulse">Loading</span>{" "}
                      <FaSpinner className=" animate-spin " />
                    </div>
                  ) : (
                  "Submit"
                  )}
                  </button>
                  </div>
              </form>

              </div>
              </div>
                  </div>
                  }
                  
                  {/* <div className="image-login">
                    <img
                      src={assets.loginImage}
                      alt="Sagar's Photo"
                    />
                  </div> */}
                </div>
              </div>

              <div className="hero">
                {!isOtpSubmitted && isEmailSent && 
                <div className="hero-container">
                  <div className="description">
                    
                  <div className='login-grid-1'>
                  <div>
              {/* <h3 className='welcome'>Reset <span style={{color:"black"}}>Password OTP</span></h3>
              <p className='welcome-2'>Enter the 6-digit <br /> code sent to your Email address</p> */}
              {/* <form onSubmit={onSubmitOtp}>

              <div className='email-container'>
                <input 
                type="text" 
                placeholder='OTP'
                required 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="password-input-box"
                id="text" />

                <div className='absolut'>
                  <img src={mail} alt="" />
                </div>
        </div>
                <div>
                <button type='submit' 
                disabled={logging}
                className='login-button'
                >
                  {logging ? (
                      <div className="flex items-center space-x-2 justify-center">
                      <span className="animate-pulse">Loading</span>{" "}
                      <FaSpinner className=" animate-spin " />
                    </div>
                  ) : (
                  "Submit"
                  )}
                  </button>
                  </div>
              </form> */}

            <form onSubmit={onSubmitOtp} className='bg-white
            p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-center mb-6 text-red-700'>
               Reset Password Otp
            </h1>
            <p className='text-center mb-6 text-red-700'>
            Enter 6-digit Code Sent to your email address.
            </p>
            <div className='flex justify-between mb-8' onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index)=>(
                    <input 
                    type="text"
                    maxLength="1"
                    key={index}
                    required 
                    className='w-12 h-12 bg-[#FFBBB8]
                    text-black text-center text-xl
                    rounded-md'
                    ref={e => inputRefs.current[index] = e}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>
            <div>
                <button type='submit' 
                disabled={logging}
                className='login-button'
                >
                  {logging ? (
                      <div className="flex items-center space-x-2 justify-center">
                      <span className="animate-pulse">Loading</span>{" "}
                      <FaSpinner className=" animate-spin " />
                    </div>
                  ) : (
                  "Submit"
                  )}
                  </button>
                  </div>
            </form>
              
              
              </div>
              </div>
                  </div>
                  
                  {/* <div className="image-login">
                    <img
                      src={assets.loginImage}
                      alt="Sagar's Photo"
                    />
                  </div> */}
                </div>
                }
              </div>

              <div className="hero">
                {isOtpSubmitted && isEmailSent &&
                <div className="hero-container">
                  <div className="description">
                    
                  <div className='login-grid-1'>
                  <div>
              <h3 className='welcome'>New <span style={{color:"black"}}>Password</span></h3>
              <p className='welcome-2'>Enter Your New Password</p>
              <form onSubmit={onSubmitNewPassword}>

              <div className="password-container">
                        
                        <div className="password-input">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            required
                            placeholder='Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="password-input-box"
                          />
                          <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}>
                          <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                          </div>
                        </div>
                      </div>
                <div>
                <button type='submit' 
                disabled={logging}
                className='login-button'
                >
                  {logging ? (
                      <div className="flex items-center space-x-2 justify-center">
                      <span className="animate-pulse">Loading</span>{" "}
                      <FaSpinner className=" animate-spin " />
                    </div>
                  ) : (
                  "Submit"
                  )}
                  </button>
                  </div>
              </form>

              
              
              </div>
              </div>
                  </div>
                  
                  {/* <div className="image-login">
                    <img
                      src={assets.loginImage}
                      alt="Sagar's Photo"
                    />
                  </div> */}
                </div>
                }
              </div>
              <ToastContainer />
    </div>
  )
}

export default ForgotPassword