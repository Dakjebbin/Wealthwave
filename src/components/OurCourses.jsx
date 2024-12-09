import { Button } from "@/components/ui/button"
import { assets } from "../assets/assest"


const OurCourses = () => {
  return (
  <section>
    <div className="bg-[#FE918C] mt-10 p-6 rounded-xl flex flex-col justify-center items-center flex-wrap">
        <h3 className="font-bold text-3xl text-white mb-3">
            Find the right courses for your success
        </h3>

        <p className="font-bold text-xl mb-4">
        Choose from more than 50 courses to get the course you need 
        to transform your life and achieve your goals.
        </p>
        <div>
        <Button className="font-bold text-lg" variant="outline">Explore Courses</Button>
        </div>
        
    </div>

    <div className="hero">
        <div className="hero-container">
        <div className="image">
            <img
              src={assets.rectangle}
              alt="Sagar's Photo"
            />
          </div>
          <div className="description ">
            <h1 className="font-bold text-2xl pb-6 bg-[#FE918C] p-5 rounded-lg">
            Our goal is to provide inclusive, accessible, relevant and
            safe digital and affiliate marketing in partner countries of German development cooperation
            </h1>
          </div>
          
        </div>
      </div>
  </section>
  )
}

export default OurCourses