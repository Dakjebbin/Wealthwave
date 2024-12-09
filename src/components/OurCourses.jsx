import { Button } from "@/components/ui/button"


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
  </section>
  )
}

export default OurCourses