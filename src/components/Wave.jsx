import "../styles/wave.css"
import { assets } from '../assets/assest'

const Wave = () => {
    
  return (
    <section id="home">
      <div className="bg-gradient-to-t bg-cover">
        <img 
          className="h-[250px] w-full object-cover rounded-xl sm:h-[400px] md:h-[400px]" // Ensures image covers the container without distortion
          src={assets.back} 
          alt="" 
        />
      </div>

      <div className="flex items-center m-auto flex-wrap justify-between mt-7">
       
          <div className=" flex flex-wrap text-center flex-col font-restructure">
          <p className="text-3xl">400+</p>
          <p>Completed Projects</p>
          </div>

          <div className="flex flex-wrap text-center flex-col font-restructure">
          <p className="text-3xl">100+</p>
          <p>Courses</p>
          </div>

          <div className="flex flex-wrap text-center flex-col font-restructure">
          <p className="text-3xl">200+</p>
          <p>Partners</p>
          </div>
        
      </div>

      <div>
    <p className="text-center font-bold text-3xl mt-10 text-flex text-ali">
    Flexible Digital and Affiliates Marketing Investment Options.
    </p>
    <p className="text-center text-base text-flex text-alimber">
    Platform designed with more than 50 partners across Europe and America to provide high-quality 
    affiliate and digital marketing courses specifically for earning.
    </p>
      </div>
    </section>
  )
}

export default Wave;
