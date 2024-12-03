
import "../styles/navbar.css"
import { Link } from 'react-router-dom'
import logo from "../assets/logo.jpg"


const Navbar = () => {

  return (
    <div className='app-update'>
    <header className='app'>
      <div className='logo-box'>
    <Link to="/"><img className='logo' src={logo} alt="" /></Link>
    </div>
        <nav className='Navbar lg:block sm: hidden'>
          <ul>
            
            <a href="#home">
              <li><span style={{color: "#FE0000"}}>HOME</span></li>
              </a>
            <a href="#courses"><li>COURSES</li></a>
            <a href="#about_us"><li><span style={{color: "#FE0000"}}>ABOUT US</span></li></a>
            <a href="#contact"><li>CONTACT US</li></a>
          </ul>
        </nav>
        <Link to="/login">
     <button className='login-button-1'>Login</button></Link>
     
  
    </header>


   

    </div>
  )
}

export default Navbar
