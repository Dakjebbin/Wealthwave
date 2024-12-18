import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assest";
import { useAuthContext } from "../context/auth-context";
import { MdDashboard } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { MdOutlineMenuOpen } from "react-icons/md";
import { PiHandWithdrawBold } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import "../styles/dash-courses.css"
import {  useNavigate } from "react-router-dom";

const DashCourses = () => {
  axios.defaults.withCredentials = true;
  const { userData } = useAuthContext();
  const [open, setOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const baseUrl = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();

  const handleBuyClick = (packageName, price) => {
    navigate("/deposit", {state: {packageName, price}});
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoggingOut(true);
      const response = await axios.post(
        `${baseUrl}/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (response?.data.success) {
        toast.success(response?.data?.message);
        window.location.assign("/login");
      }
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        console.log("");
      }
      if (error === 404 || error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      }
    } finally{
      setLoggingOut(false);
    }
  };

  const menuitems = [
    {
      icons: <MdDashboard size={30} />,
      label: "Dashboard",
      url: "/dashboard",
    },
    {
      icons: <FaBook size={30} />,
      label: "Course",
      url: "/courses",
    },
    {
      icons: <PiHandWithdrawBold size={30} />,
      label: "Withdrawal",
    },
    {
      icons: <IoIosContact size={30} />,
      label: "Contact Us",
    },
    {
      icons: <IoIosContact size={30} />,
      label: "Settings",
    },
  ];

  const [isNavActive, setIsNavActive] = useState(false);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setIsNavActive(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className="md:flex">
      {userData && (
        <>
          {/* Sidebar for Desktop */}
          <nav
            className={`shadow-md p-2 bg-[#FFBBB8] hidden flex-col ${open ? `w-60` : `w-16`} md:flex duration-500 sticky top-0 h-screen`}
          >
            {/* Header */}
            <div className="px-3 py-2 h-20 flex justify-between items-center">
              <img src={assets.logo} alt="logo" className={`${open ? `w-10` : `w-0`} rounded-md`} />
              <div>
                <MdOutlineMenuOpen
                  size={34}
                  className={`duration-500 cursor-pointer ${!open && `rotate-180`}`}
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>

            {/* Body */}
            <ul className="flex-1">
              {menuitems.map((item, index) => (
                <li key={index} className="px-1 py-2 my-2 relative duration-300 flex gap-2 items-center group">
                  <a className=" hover:bg-white rounded-md cursor-pointer pt-1 pl-2 pr-32" href={item.url}>
                    <div>{item.icons}</div>
                    <p className={`${!open && `w-0 translate-x-24`} duration-500 overflow-hidden`}>
                      {item.label}
                    </p>
                  </a>
                  <p
                    className={`${open && "hidden"} absolute left-120 shadow-md rounded-md w-0 p-0 duration-300 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}
                  >
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="flex items-center gap-2 px-3 py-2">
              <div>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>WW</AvatarFallback>
                </Avatar>
              </div>
              <div className={`leading-5 ${!open && `w-0 translate-x-24`} duration-500 overflow-hidden`}>
                <p className="flex items-center mr-3">{userData?.username}</p>
                <p className="text-xs uppercase">{userData?.email}</p>

                 
                <button 
                onClick={handleLogout} 
                className="flex items-center bg-red-600 rounded-md text-white p-1"
                disabled={loggingOut}
                >
                  
                  {loggingOut ? (
                    <div className="flex items-center space-x-2 justify-center">
                    <span className="animate-pulse">Logging Out</span>{" "}
                    <FaSpinner className=" animate-spin " />
                  </div>
                  ) : (
                    <div className="flex">
                  <p className="mr-1 font-bold">Logout</p>
                  <IoIosLogOut className="cursor-pointer" size={25} />
                  </div>
                )}
                </button>
              </div>
            </div>
          </nav>

          {/* Sidebar for Mobile */}
          <div className="md:hidden">
            <div className="m-6 cursor-pointer" onClick={handleToggle} ref={mobileNavRef}>
              <MdOutlineMenuOpen size={34} />
            </div>

            <div
              ref={mobileNavRef}
              className={`fixed top-0 right-0 w-64 h-full bg-[#FFBBB8] transform transition-all duration-500 ${isNavActive ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="ml-5 mt-4">
                <img src={assets.logo} alt="logo" className="w-14 rounded-md" />
              </div>

              <nav>
                <ul>
                  {menuitems.map((item, index) => (
                    <li key={index} className="p-5 hover:bg-white hover:rounded-md hover:m-2 cursor-pointer">
                      <a href={item.url}>
                        <div>{item.icons}</div>
                        <p>{item.label}</p>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 pt-4 pl-4">
                  <div>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>WW</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="leading-5">
                    <p className="flex items-center mr-3">{userData?.username}</p>
                    <p className="text-xs uppercase">{userData?.email}</p>
 
                    <button 
                onClick={handleLogout} 
                className="flex items-center bg-red-600 rounded-md text-white p-1"
                disabled={loggingOut}
                >
                  
                  {loggingOut ? (
                    <div className="flex items-center space-x-2 justify-center">
                    <span className="animate-pulse">Logging Out</span>{" "}
                    <FaSpinner className=" animate-spin " />
                  </div>
                  ) : (
                    <div className="flex">
                  <p className="mr-1 font-bold">Logout</p>
                  <IoIosLogOut className="cursor-pointer" size={25} />
                  </div>
                )}
                </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Content area */}
          <div
            className={`flex-1 p-5 overflow-auto  md:max-h-screen transition-all duration-500 ${open ? "ml-4" : "ml-5"}`}
          >
         
            <div>
                <p className='text-xl font-bold'> <span className='text-[#FE0000] '>Welcome</span> Back {userData?.username}</p>
              </div>

              {userData.status === "blocked" ? (
                  <div className='bg-red-500 w-full mt-3 text-center text-white py-1 rounded-lg text-lg font-semibold'>
        Error Occurred. Please Contact Admin
      </div>
      ) : (
        <span></span>
      )}

              <div className="flex gap-10 flex-wrap mt-10">
                <div className="bg-[#FFBBB8] basis-80 flex-grow rounded-md p-10">
                    <p className="text-3xl font-bold">
                    Turn YOUR Passion, Hobby or Interest into YOUR Success Story!
                    </p>
                </div>

                <div className="w-64 h-48 basis-80 flex-grow ">
                    <img className="w-full h-full object-cover rounded-md" src={assets.support} alt="" />
                </div>

              </div>

              <p className="text-2xl mt-7 font-semibold">
                Start exploring these opportunities today, and pave the path to a more financially secure future. With the right strategies and dedication, 
                you can achieve more than $4,000 weekly passive income you’ve been dreaming of.
                </p>
              <div className="flex mt-7 gap-7 flex-wrap">

                  <div className="flex-grow basis-40">
                    <div className="bg-[#FFBBB8] mb-4 hover:-translate-y-3 duration-500 shadow-md shadow-[#4D4C4C] pt-10 px-1 rounded-lg pb-3 dash-courses-text">
                    <p className="text-center text-xl pb-2">DBA <br /> (Digital Beginners Academy)</p>
                    <p className="text-center text-[16px]">$200 to earn <br /> $2,000 - $4,000</p>
                    <div className="w-56 m-auto pb-2 pt-3">
                      <img className="w-full" src={assets.buy_courses} alt="" />
                    </div>
                    <p className="text-[#4D4C4C]">Total Sales - 4569</p>
                  </div>
                  <div className=" flex items-center justify-center">
                    
                  <button onClick={() => handleBuyClick("DBA", 200)} className="font-bold text-xl ">BUY</button>
                  
                  </div>
                  </div>
                  
                  <div className="flex-grow basis-40">
                    <div className="bg-[#FFBBB8] mb-4 hover:-translate-y-3 duration-500 shadow-md shadow-[#4D4C4C] pt-10 px-1 rounded-lg pb-4 dash-courses-text">
                    <p className="text-center text-xl pb-2">UBC <br /> (Ultimate Branding Course)</p>
                    <p className="text-center text-[16px]">$500 to earn <br /> $5,000 - $7,000</p>
                    <div className="w-56 m-auto pb-2 pt-3">
                      <img className="w-full" src={assets.buy_courses_2} alt="" />
                    </div>
                    <p className="text-[#4D4C4C]">Total Sales - 5236</p>
                  </div>
                  <div className=" flex items-center justify-center">
                  <button onClick={() => handleBuyClick("UBC", 500)} className="font-bold text-xl ">
                    BUY
                    </button>
                  </div>
                  </div>

                  <div className="flex-grow basis-40">
                    <div className="bg-[#FFBBB8] mb-4 hover:-translate-y-3 h-80 duration-500 shadow-md shadow-[#4D4C4C] pt-10 px-1 rounded-lg pb-3 dash-courses-text">
                    <p className="text-center text-xl pb-2">Legacy Builders</p>
                    <p className="text-center text-[16px]">$900 to earn <br /> $10,000 - $12,000</p>
                    <div className="w-56 m-auto pb-2 pt-3">
                      <img className="w-full" src={assets.dash_deposit1} alt="" />
                    </div>
                    <p className="text-[#4D4C4C] mt-5">Total Sales - 4569</p>
                  </div>
                  <div className=" flex items-center justify-center">
                  <button onClick={() => handleBuyClick("Legacy Builders", 900)} className="font-bold text-xl ">BUY</button>
                  
                  </div>
                  </div>

                  <div className="flex-grow basis-40">
                    <div className="bg-[#FFBBB8] mb-4 h-80 hover:-translate-y-3 duration-500 shadow-md shadow-[#4D4C4C] pt-10 px-1 rounded-lg pb-3 dash-courses-text">
                    <p className="text-center text-xl pb-2">Click Bank</p>
                    <p className="text-center text-[16px]">$2000 to earn <br /> $20,000 - $25,000</p>
                    <div className="w-56 m-auto pb-2 pt-3">
                      <img className="w-full" src={assets.dash_deposit2} alt="" />
                    </div>
                    <p className="text-[#4D4C4C]">Total Sales - 4569</p>
                  </div>
                  <div className=" flex items-center justify-center">
                  <button onClick={() => handleBuyClick("Click Bank", 2000)} className="font-bold text-xl ">BUY</button>
                  
                  </div>
                  </div>
                </div>
 
                <div className="mt-7 flex flex-wrap gap-7">
                <div className=" basis-40">
                    <div className="bg-[#FFBBB8] h-80 mb-4 hover:-translate-y-3 duration-500 shadow-md shadow-[#4D4C4C] pt-10 px-1 rounded-lg pb-3 dash-courses-text">
                    <p className="text-center text-xl pb-2">Amazon</p>
                    <p className="text-center text-[16px]">$4000 to earn <br /> $40,000 - $45,000</p>
                    <div className="w-56 m-auto pb-2 pt-3">
                      <img className="w-full" src={assets.dash_deposit3} alt="" />
                    </div>
                    <p className="text-[#4D4C4C]">Total Sales - 4569</p>
                  </div>
                  <div className=" flex items-center justify-center">
                  <button onClick={() => handleBuyClick("Amazon", 4000)} className="font-bold text-xl ">BUY</button>
                  </div>
                  </div>

                  <div className="flex-grow basis-96 ">
                    <p className="bg-[#FFE6E4] p-12 rounded-sm font-bold text-xl">
                    Our vision is a world in which digital
                    earning is inclusive, accessible,
                    relevant, safe and secure for all
                    </p>
                  </div>
                </div>
         </div>
          
        </>
      )}
      <ToastContainer/>
    </div>
  );
};

export default DashCourses;
