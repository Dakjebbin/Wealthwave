import { assets } from "../assets/assest"
import "../styles/courses.css"

const Courses = () => {
  return (
    <section>
     
       <div className="our-courses"> 
        <hr /> 
      <span> Our Courses </span>
       </div>

       <div className="courses-grid">
            <div className="course-grid-1">
                <p className="course-name">
                    DBA
                </p>
                <img src={assets.books} alt="" />
                <p className="earn-p">
                    $200 To Earn
                </p>
                <img src={assets.earn} alt="" />
                <p className="earn-p">
                    $2,000 - $4,000
                </p>
                <span>
                    <img src={assets.time} alt="" />
                    <p>(17Hours)</p>
                </span>
            </div>
            <div className="course-grid-1">
            <p className="course-name">
                UBC
                </p>
                <img src={assets.books} alt="" />
                <p className="earn-p">
                    $500 To Earn
                </p>
                <img src={assets.earn} alt="" />
                <p className="earn-p">
                    $5,000 - $7,000
                </p>
                <span>
                    <img src={assets.time} alt="" />
                    <p>(24Hours)</p>
                </span>
            </div>
            <div className="course-grid-1">
            <p className="course-name">
                    LEGACY BUILDER
                </p>
                <img src={assets.books} alt="" />
                <p className="earn-p">
                    $1,000 To Earn
                </p>
                <img src={assets.earn} alt="" />
                <p className="earn-p">
                    $10,000 - $12,000
                </p>
                <span>
                    <img src={assets.time} alt="" />
                    <p>(48Hours)</p>
                </span>
            </div>
            <div className="course-grid-1">
            <p className="course-name">
                    CLICK BANK
                </p>
                <img src={assets.books} alt="" />
                <p className="earn-p">
                    $2,000 To Earn
                </p>
                <img src={assets.earn} alt="" />
                <p className="earn-p">
                    $20,000 - $25,000
                </p>
                <span>
                    <img src={assets.time} alt="" />
                    <p>(48Hours)</p>
                </span>
            </div>
            <div className="course-grid-1">
            <p className="course-name">
                AMAZON
                </p>
                <img src={assets.books} alt="" />
                <p className="earn-p">
                    $4,000 To Earn
                </p>
                <img src={assets.earn} alt="" />
                <p className="earn-p">
                    $40,000 - $45,000
                </p>
                <div>
                    <span>
                    <img src={assets.time} alt="" />
                    <p>(48Hours)</p>
                    </span>
                </div>
            </div>
       </div>
      
    </section>
  )
}

export default Courses