import "../styles/wave.css"
import { assets } from '../assets/assest'

const Wave = () => {
    
  return (
    <main id="home">
      <section className="bg-gradient-to-t bg-cover">
        <img 
          className="h-[250px] w-full object-cover rounded-xl sm:h-[400px] md:h-[400px]" // Ensures image covers the container without distortion
          src={assets.back} 
          alt="" 
        />
      </section>

      <section className="flex items-center m-auto flex-wrap justify-between mt-7">
       
          <div className="leading-[.5] flex flex-wrap text-center flex-col font-restructure">
          <p>400+</p>
          <p>Completed Projects</p>
          </div>

          <div className="leading-[.5] flex flex-wrap text-center flex-col font-restructure">
          <p>100+</p>
          <p>Courses</p>
          </div>

          <div className="leading-[.5] flex flex-wrap text-center flex-col font-restructure">
          <p>200+</p>
          <p>Partners</p>
          </div>
        
      </section>

      <section>
    <p className="text-center font-bold text-3xl mt-10 text-flex text-ali">
    Flexible Digital and Affiliates Marketing Investment Options.
    </p>
    <p className="text-center text-base text-flex text-alimber">
    Platform designed with more than 50 partners across Europe and America to provide high-quality 
    affiliate and digital marketing courses specifically for earning.
    </p>
      </section>
    </main>
  )
}

export default Wave;
