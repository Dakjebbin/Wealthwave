import React, { useState } from 'react' // eslint-disable-line
import "../styles/navbar.css"
import { Link } from 'react-router-dom'
import logo from "../assets/logo.jpg"
import {menu} from "../assets/assest.js"

const Navbar = () => {

 // const [navActive, isNavActive] = useState(false)

  // const toggleNav = () => {
  //   isNavActive(!navActive)
  // }

  return (
    <div className='app-update'>
    <header className='app'>
      <div className='logo-box'>
    <Link to="/"><img className='logo' src={logo} alt="" /></Link>
    </div>
        <nav className='Navbar sm:hidden lg:block sm: hidden'>
          <ul>
            
            <a href="#home"><li><span style={{color: "#FE0000"}}>HOME</span></li></a>
            <a href="#courses"><li>COURSES</li></a>
            <a href="#about_us"><li><span style={{color: "#FE0000"}}>ABOUT US</span></li></a>
            <a href="#contact"><li>CONTACT US</li></a>
          </ul>
        </nav>
        <Link to="/login">
     <button className='login-button-1 sm:hidden lg:block sm: hidden'>Login</button></Link>
     
     <img className='w-6 lg:hidden'  src={menu} alt="" />
     
      {/* for mobile devices */}
  <nav className='bg-red-500 w-80 absolute right-0 top-0 h-screen sm:hidden '>
    
<ul className='ml-10 mt-10 h-60 flex flex-col justify-between'>
<Link to="/">
            <li><span>HOME</span></li></Link>
            <a href="#courses"><li>COURSES</li></a>
            <a href="#about_us"><li><span>ABOUT US</span></li></a>
            <a href="#contact"><li>CONTACT US</li></a>
</ul>
<Link to="/login">
     <button className='login-button-1'>Login</button></Link>
  </nav>
  
    </header>


   

    </div>
  )
}

export default Navbar
