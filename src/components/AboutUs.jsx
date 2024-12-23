import { assets } from "../assets/assest"
import "../styles/courses.css"
import "../styles/about.css"
import { Link } from "react-router-dom"

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
            A revenue-sharing model where a third-party promotes a business&apos;s products or services 
            in exchange for a commission or reward.
            </p>
            <p>
            Digital learning with Wealthwave allows young people to unlock their full potential, acquire new skills,
             and significantly improve their chances in the local labor market.
            </p>
            <Link to="/AboutUs">
            <button className="bg-red-500 p-3 text-white font-bold shadow-md shadow-black rounded-md animate-pulse">Read More</button>
            </Link>
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

      <div className="flex flex-col mt-10 sm:flex-row">
        <div className="bg-[#FFE6E4] flex-1 p-10">
          <p className="font-bold text-[19px] my-text">
          Wealth Wave is your 24/7 digital platform, optimized for all digital devices.
          </p>
          <p className="font-bold text-[19px] my-text">
          Register now and Start earning
          </p>
        </div>
        <div className="bg-[#EDA9A6] flex-1 p-10">
          <p className="font-bold text-[19px] my-text">
          Join our extensive partner network.
        
          </p>
          
        </div>
      </div>

      
      <div className="hero">
        <div className="hero-container">
          <div className="description">
            <p>
            Why choose WealthWave?
            </p>
            <p>
            Innovative investment opportunities 
                offers many ways to invest and what you need to know for your professional development.
            </p>
          </div>
          <div className="image">
            <img
              src={assets.why}
              alt="Sagar's Photo"
            />
          </div>
        </div>
      </div>

      <div className="hero">
        <div className="hero-container">
        <div className="image">
            <img
              src={assets.support}
              alt="Sagar's Photo"
            />
          </div>
          <div className="description">
            <h1 className="font-bold text-2xl pb-6">
            Support our mission and partner with us!
            </h1>
            <p>
            Our goal is to provide inclusive, accessible, relevant and safe digital and 
            affiliate marketing in partner countries of German development cooperation.
            We partner with companies and organizations from business, civil society, politics, 
            international development cooperation and science to develop our course offering.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default AboutUs