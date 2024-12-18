import { assets } from "../assets/assest"


const AboutUsComponent = () => {
  return (
    <div className="bg-[#FFBBB8] font-playfair ">
        <div className="w-[95%] m-auto">
        <h1 className="text-center font-bold text-2xl py-3">ABOUT US</h1>

        <p className="text-xl mb-5">
        Driving change and positive impact through inclusive, 
        accessible and relevant digital learning.
        </p>

        <div className="w-[80%] h-64 m-auto">
          <img className="w-full h-full object-cover rounded-lg" src={assets.about_com1} alt="" />
        </div>

        <div className="mt-5 mb-5">
          <p className="text-xl">
          WealthWave is a digital learning experience focused on 
          providing locally relevant learning opportunities that 
          address critical employment and educational skill gaps in emerging markets.
          </p>
          <p className="text-xl">
          WealthWave offers exactly those knowledge modules and learning materials needed in the partner countries of German development cooperation and 
          that match our learners&apos; economic and cultural needs.
          </p>
        </div>

        <div className="w-[80%] h-64 m-auto">
          <img className="w-full h-full object-cover rounded-lg" src={assets.about_com2} alt="" />
        </div>
        <div  className="mt-5 pb-5">
          <p className="text-xl">
          Marginalised groups such as women and girls, as well as people 
          living in more remote and rural areas, are particularly affected by 
          restrained access to education. This results in a lack of required competencies and 
          difficulties finding employment in local labour markets.
          This concern is what we from WealthWave, together with our partners, set out to change by reaching young 
          people through innovative e-learning offers.
          </p>
        </div>
        </div>
    </div>
  )
}

export default AboutUsComponent