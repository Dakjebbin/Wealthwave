import { assets } from "../assets/assest"
import "../styles/courses.css"
import "../styles/about.css"

const AboutUs = () => {
  return (
    <section>
      <div className="our-courses"> 
        <hr /> 
      <span> About Us</span>
       </div>

       <div className="hero">
        <div className="hero-container">
          <div className="description">
            <p>
            WealthWave is a digital learning experience focused on providing
            locally relevant opportunities that address unemployment and educational skill gabs.
            A revenue-sharing model where a third-party promotes a business's products or services 
            in exchange for a commission or reward.
            </p>
            <p>
            Digital learning with Wealthwave allows young people to unlock their full potential, acquire new skills,
             and significantly improve their chances in the local labor market.
            </p>
          </div>
          <div className="image">
            <img
              src={assets.about_image}
              alt="Sagar's Photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs