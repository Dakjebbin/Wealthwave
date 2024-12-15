import { useState } from "react"
import "../styles/Ournumbers.css"
import { useRef } from "react";
import { useEffect } from "react";

const OurNumbers = () => {

    const [isCourses, setIsCourses ] = useState(0);
    const [isRegistered, setIsRegistered ] = useState(0);
    const [isTotal, setIsTotal ] = useState(0);
    const [isLanguage, setIsLanguage ] = useState(0);
    const [isPartner, setIsPartner ] = useState(0);
    const [isBonus, setIsBonus ] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const numbersRef = useRef(null)

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
            animateCount(100, setIsCourses, 2000);
            animateCount(1000, setIsRegistered, 2000);
            animateCount(100000, setIsTotal, 2000);
            animateCount(25, setIsLanguage, 2000);
            animateCount(250, setIsPartner, 2000);
            animateCount(230000, setIsBonus, 2000);
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
    <section ref={numbersRef}  className="bg-[#FFBBB8] rounded-2xl ournumbers">
        <h2 className="pt-6">Impact In Numbers</h2>

        <div className="flex flex-col items-center justify-between p-9 flex-wrap lg:flex-row ">
            <div className="mb-3 lg:mb-0">
                <p className="numbers text-center">
                    {isCourses}+
                </p>
                <p className="numbers-text text-center">
                    Courses
                </p>
            </div>

            <div className="mb-3 lg:mb-0">
                <p className="numbers text-center">
                   {isRegistered}+
                </p>
                <p className="numbers-text text-center">
                   Registered Marketers
                </p>
            </div>

            <div className="mb-3 lg:mb-0">
                <p className="numbers text-center">
                  {isTotal}+
                </p>
                <p className="numbers-text text-center">
                    Total Amount Earned in Dollars
                </p>
            </div>
        </div>

        <div className="flex flex-col items-center justify-between p-9 flex-wrap lg:flex-row">
            <div className="mb-3 lg:mb-0">
                <p className="numbers text-center ">
                   {isLanguage}+
                </p>
                <p className="numbers-text text-center">
                    Course Languages
                </p>
            </div>

            <div className="mb-3 lg:mb-0">
                <p className="numbers text-center">
                   {isPartner}+
                </p>
                <p className="numbers-text text-center">
                  Global Partners
                </p>
            </div>

            <div className="mb-3 lg:mb-0">
                <p className="numbers text-center">
                  {isBonus}+
                </p>
                <p className="numbers-text text-center">
                    Issued Bonuses in Dollars
                </p>
            </div>
        </div>
    </section>
  )
}

export default OurNumbers