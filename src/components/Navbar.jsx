
import "../styles/navbar.css"
import { Link } from 'react-router-dom'
import { assets } from "../assets/assest"



const Navbar = () => {

  return (
    // <header className='app-update'>
    // <header className='app'>
    //   <div className='logo-box'>
    // <Link to="/"><img className='logo' src={logo} alt="" /></Link>
    // </div>
    //     <nav className='Navbar md:block sm: hidden'>
    //       <ul>
            
    //         <a href="#home">
    //           <li><span style={{color: "#FE0000"}}>HOME</span></li>
    //           </a>
    //         <a href="#courses"><li>COURSES</li></a>
    //         <a href="#about_us"><li><span style={{color: "#FE0000"}}>ABOUT US</span></li></a>
    //         <a href="#contact"><li>CONTACT US</li></a>
    //       </ul>
    //     </nav>
    //     <Link to="/login">
    //  <button className='login-button-1 md:block sm: hidden'>Login</button></Link>
     
    
    //   <img className="block md:hidden" src={assets.menu_button} alt="" />
   
    // </header>

    // <nav>
    // <ul>
            
    //         <a href="#home">
    //           <li><span style={{color: "#FE0000"}}>HOME</span></li>
    //           </a>
    //         <a href="#courses"><li>COURSES</li></a>
    //         <a href="#about_us"><li><span style={{color: "#FE0000"}}>ABOUT US</span></li></a>
    //         <a href="#contact"><li>CONTACT US</li></a>
    //       </ul>
    // </nav>

    // </header>

    <header>
      <div className="header">
        <div className="logo-box">
          <Link to="/">
        <img src={assets.logo} alt="" />
        </Link>
        </div>

        <nav className="hidden lg:block">
          <ul className="navbar">
            <li>
              <a href="#home">Home</a>
            </li>

            <li>
              <a href="#courses">Courses</a>
            </li>

            <li>
              <a href="#about_us">About Us</a>
            </li>

            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link to="/login">
   <button className="login-button-1 " >
Login
   </button>
   </Link>
        </div>

        <img className="block lg:hidden" src={assets.menu_button} alt="" />
        </div>

        <nav className="bg-[#ee4646] mobile-view">

          <div>
            <img src={assets.close_btn} alt="" />
          </div>
          <ul className="navbar-mobile">
            <li>
              <a href="#home">Home</a>
            </li>

            <li>
              <a href="#courses">Courses</a>
            </li>

            <li>
              <a href="#about_us">About Us</a>
            </li>

            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Navbar
