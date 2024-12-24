import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#FFE6E4] grid lg:grid-cols-4">
        <div className="p-3">
          <h3 className="font-bold text-3xl mb-4">
            WEALTH
            <span className="text-[#FFBBB8]">
              WAVE
            </span>
          </h3>

          <p className="font-bold text-xl">
          A revenue-sharing model where a third-party promotes a business&apos; s
           products or services in exchange for a commission or reward.
          It&apos;s a key part of modern digital marketing and can help 
          businesses increase sales, attract traffic, and improve brand awareness
          </p>
        </div>

          <div className="bg-[#FE918C] p-8 flex flex-col text-center justify-between md:text-start">
            <ul>
              <li className="mb-4">
               <a className="text-white font-bold text-xl" href=""> Com<span className="text-black">pany</span> </a>
              </li>
              <li className="font-bold text-xl mb-4">
               Terms and Conditions
              </li>
              <li className="font-bold text-xl">
                Privacy Policy
              </li>
            </ul>

            <p className="text-white font-bold text-xl">
              Legal Information
            </p>
          </div>

          <div className="bg-[#FE918C] p-8 flex flex-col text-center justify-between md:text-start">
          <ul>
              <li className="mb-4">
               <a className="text-white font-bold text-xl" href="#home">Ho<span className="text-black">me</span></a>
              </li>
              <li className="mb-4">
                <a className="font-bold text-xl" href="#courses">Courses</a>
              </li>
              <li>
                <a className="font-bold text-xl" href="#about_us">About Us</a>
              </li>
              
            </ul>

            <div>
              <Link to="/contactUs">
                <a className="font-bold text-xl text-white" href="">Contact Us</a>
                </Link>
              </div>
          </div>

          <div className="bg-[#FE918C] p-8 flex flex-col text-center items-center justify-center md:text-start">
            <h2 className="text-white font-bold text-3xl tracking-wider mb-3">
              JO<span className="text-[#FF0C00]">IN</span> US <span className="text-[#FF0C00]">TODAY</span>
            </h2>
          <div>
            <Link to="/register">
          <Button className="font-bold bg-[#FE0000] border-none text-lg" variant="outline">Sign Up</Button>
          </Link>
          </div>

          
          </div>
          </div>
     <div className="bg-[#FFE6E4] p-2 text-xl italic">
      <p className="text-center">
      © 2022 WealthWave. All Rights Reserved.
      </p>
     </div>
    </footer>
  )
}

export default Footer