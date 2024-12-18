
import { toast, ToastContainer } from "react-toastify"
import { assets } from "../assets/assest.js"
import Navbar from "./Navbar.jsx"
import { useState } from "react"

const ContactUs = () => {

    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setMessage("")
        setEmail("")
        setName("")
        toast.success("Message Sent SuccessFully")
    }
  return (
    <div>
        <Navbar/>

        <div className="bg-[#FFE6E4]">

            <div className="flex m-auto w-[95%] gap-10 pt-14">
                    <div className="flex-grow">
                        <div className="w-[500px] mb-5">
                            <img className="w-full" src={assets.contact_page_image} alt="" />
                        </div>

                        <div className="mb-5">
                            <p className="font-playfair text-2xl">Let us know what you would like to communicate <br /> and we wil get back to you
                            as soon as possible.
                            </p>
                        </div>

                        <div>
                            <form onSubmit={handleContactSubmit}>
                            <div className="mb-5">
                            <input type="email"
                             placeholder="Enter Your Email Address"
                             className="bg-[#D9D9D9] w-[300px] font-playfair py-2 pl-4 rounded-md"
                             required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                            

                            <div className="mb-5">
                            <input type="text" 
                            placeholder="Enter Your Name"
                            className="bg-[#D9D9D9] w-[300px] font-playfair py-2 pl-4 rounded-md"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                                <div className="mb-2">
                            <textarea name="" id="" cols="38" rows="3"
                            placeholder="Your Comments"
                            className="bg-[#D9D9D9] font-playfair rounded-md px-4 pt-3"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            </div>

                                <div className="mb-6">
                            <button type="submit" className="bg-[#FE0000] text-white py-2 px-5 rounded-lg font-semibold">SEND</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="w-[550px]">
                        <img className="w-full object-cover" src={assets.contact_page_image_2} alt="Contact" />
                        </div>
                    </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ContactUs