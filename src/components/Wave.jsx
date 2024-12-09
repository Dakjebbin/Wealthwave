import "../styles/wave.css"
import { assets } from '../assets/assest'
import { useEffect, useRef, useState } from "react";

const Wave = () => {
    
  
  const [isProject, setIsProject ] = useState(0);
  const [isCourses, setIsCourses ] = useState(0);
  const [isPartner, setIsPartner ] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const numbersRef = useRef(null);

  const animateCount = (endValue, setState, duration) => {
    let start = 0;
    const increment = endValue / (duration / 50);

    const counter = setInterval(() => {
        start += increment;

        if(start >= endValue) {
            setState(endValue);
            clearInterval(counter);
        } else {
            setState(Math.ceil(start));
        }
    }, 50);
};

const startAnimations = () => {
  if (!hasAnimated) {
      animateCount(400, setIsProject, 2000);
      animateCount(100, setIsCourses, 2000);
      animateCount(200, setIsPartner, 2000);
      setHasAnimated(true);
  }
};

useEffect(() => {
  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if(entry.isIntersecting) {
                  startAnimations();
                  observer.unobserve(entry.target);
              }
          });
      },
      { threshold: 0.3 }
  );

  if(numbersRef.current) {
      observer.observe(numbersRef.current);
  }

  return () => {
      if (numbersRef.current) {
          observer.unobserve(numbersRef.current);
      }
  };
}, [hasAnimated]);


  return (
    <section ref={numbersRef} id="home">
      <div className="bg-gradient-to-t bg-cover">
        <img 
          className="h-[250px] w-full object-cover rounded-xl sm:h-[400px] md:h-[400px]" // Ensures image covers the container without distortion
          src={assets.back} 
          alt="" 
        />
      </div>

      <div className="flex items-center m-auto flex-wrap justify-between mt-7">
       
          <div className=" flex flex-wrap text-center flex-col font-restructure">
          <p className="text-xl sm:text-3xl">{isProject}+</p>
          <p>Completed Projects</p>
          </div>

          <div className="flex flex-wrap text-center flex-col font-restructure">
          <p className="text-xl sm:text-3xl">{isCourses}+</p>
          <p>Courses</p>
          </div>

          <div className="flex flex-wrap text-center flex-col font-restructure">
          <p className="text-xl sm:text-3xl">{isPartner}+</p>
          <p>Partners</p>
          </div>
        
      </div>

      <div>
    <p className="text-center font-bold text-3xl mt-10 mb-5 text-flex text-ali">
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
