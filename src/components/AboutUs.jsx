import { assets } from "../assets/assest"
import "../styles/courses.css"
import "../styles/about.css"

const AboutUs = () => {
  return (
    <section id="about_us">
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


      <div className="hero">
        <div className="hero-container">
        <div className="image">
            <img
              src={assets.about_image_2}
              alt="Sagar's Photo"
            />
          </div>
          <div className="description-2">
            <p className="text-left font-bold">
            What Does WealthWave Offer?
            </p>
            <p className="text-red-600">
           Intelligent System and Strong Analysis
            </p>
            <p>
            WealthWave provides cutting-edge tools and analytical research to help
            businesses optimize their affiliate and digital marketing operations.
             Our platform includes intelligent tools that use powerful algorithms to
              improve your campaigns and get better outcomes.
            </p>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col justify-between gap-7 sm:flex-row sm:gap-32">
        <div className="flex flex-col items-center bg-[#FFE6E4] p-7 rounded-xl expert">
        <p className="font-bold text-3xl mb-9">Expert Team</p>
      <p className="font-medium text-xl">
      Our team is the engine behind our success. We have a diversified and experienced 
        team of savvy and attentive experts in financial modelling and analysis, legal requirements, 
        tax structuring, compliance,
        corporate governance, marketing and corporate finance.
      </p>
  
        </div>

        <div className="flex flex-col items-center bg-[#FFE6E4] p-7 rounded-xl expert">
        <p className="font-bold text-3xl mb-9"> Track Record</p>
      <p className="font-medium text-xl">
        By applying the knowledge and experience we’ve gained over the years,
        we have innovated a number of industry firsts, and today are one of the largest.
          administrators of small-cap funds,
        with $20million in assets under administration.
      </p>
        </div>
      </div>
    </section>
  )
}

export default AboutUs