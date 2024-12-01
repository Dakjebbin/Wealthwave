import React from 'react' // eslint-disable-line 
import "../styles/wave.css"
import background from "../assets/background.jpg"
import { Link } from 'react-router-dom'

const Wave = () => {
    
  return (
    <main >

        <section className='wave' id='home'>
      <h5>  WEALTH <span>WAVE</span> </h5> 
<h4>DIGITAL ONLINE AFFILIATE AGENCY</h4>
<p>We provide high-quality affiliate and digital marketing courses.</p>
 <p>A platform to invest in professional development.</p>
<p style={{color : "#B84E4E", paddingTop: "10px", paddingBottom: "30px"}}>Empower yourself and others through the power of choice</p>
<Link to = "/register">
<button className='register-button'>Get Started</button> </Link>
        </section>
        
        <section className='background-image'>
            <img className='img' src={background} alt="" />
        </section>


    </main>
  )
}

export default Wave