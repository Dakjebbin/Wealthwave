import React from 'react' // eslint-disable-line 
import Wave from './components/Wave'
import AboutUs from './components/AboutUs'
import Courses from './components/Courses'
import OurNumbers from './components/OurNumbers'
import OurCourses from './components/OurCourses'
import Footer from './components/Footer'


const App = () => {
  return (
   <main>
 <Wave/>
 <Courses/>
 <AboutUs/>
 <OurNumbers/>
 <OurCourses/>
 <Footer/>
   </main>
  )
}

export default App