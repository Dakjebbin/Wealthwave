import React from 'react' //eslint-disable-line
import "../styles/about.css"
import background from "../assets/background.jpg"



const AboutUs = () => {
  return (
    <div id='about_us'>
       <section className='about-grid'>
        <div className='grid-1'>
        <h6>What is Wealth Wave?</h6>
        <p>
        Wealth Wave provides cutting-edge tools and analytical research to help business optimize their affiliate 
and digital marketing operations. <br /><br /> Our platform  includes intelligent  tools that use powerful
 algorithms to improve your campaigns and get better outcomes. <br /><br />
What We Offer <br /><br />
Wealth Wave offers many ways to invest on affiliate marketing and what you should know for your professional development.

        </p>
        </div>
        
        <div className='image-2'>
            <img className='img' src={background} alt="" />
        </div>
               </section>


               <section className='about-grid'>
               <div className='image-2'>
            <img className='img' src="" alt="" />
        </div>
               <div className='grid-1'>
        <h6 style={{marginLeft:"10px"}}>Affiliate Marketing</h6>
        <p>
        Affiliate marketing is a form of online marketing that involves promoting products or services 
        from go another company and earning commissions on sales or referrals made through your unique affiliate link.
        <br /><br />
        It&apos;s a key part of modern digital marketing and can help businesses increase sales, attract traffic, and improve brand awareness.
        </p>
        </div>
               </section>

               <hr style={{margin:"auto", width:"90%"}}/>
               <section>
                <h4 className='omo'>ABOUT US</h4>
                
                <div>

                </div>

                <div className='map-container'>
                  <img className='map' src="" alt="" />
                </div>
               </section>
    </div>
  )
}

export default AboutUs