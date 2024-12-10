
import "../styles/navbar.css"
import { Link } from 'react-router-dom'
import { assets } from "../assets/assest"
import { useEffect, useRef, useState } from "react"



const Navbar = () => {
    const [isNavActive, setIsNavActive] = useState(false);
    const mobileNavRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
          setIsNavActive(false);
        }
      };
  
      // Add event listener
      document.addEventListener("mousedown", handleClickOutside);
  
      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleToggle = () => {
      setIsNavActive(!isNavActive);
    };
  return (

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
      <Link to="/" id="home">Home</Link>
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

        <img className="block lg:hidden" src={assets.menu_button} alt="" onClick={handleToggle} />
        </div>

        {/* My mobile view starts here */}  

        <nav  ref={mobileNavRef} className={`mobile-view ${isNavActive ? "active" : ""}`}>

          <div className="close-button">
            <img src={assets.close_btn} alt="" onClick={handleToggle} />
          </div>
          <ul className="navbar-mobile">
                <li>
            <Link to="/" id="home" onClick={handleToggle}>Home</Link>
          </li>

            <li>
              <a href="#courses" onClick={handleToggle}>Courses</a>
            </li>

            <li>
              <a href="#about_us" onClick={handleToggle}>About Us</a>
            </li>

            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>

            <div className="button-mobile-container">
                  <Link to="/login">
          <button className="mobile-login-button-1">
                 Login
          </button>
          </Link>
          </div>
        </nav>
    </header>
  )
}

export default Navbar
