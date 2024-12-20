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
// import { PiHandWithdrawBold } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoMdWallet } from "react-icons/io";
import { FaSignal } from "react-icons/fa";
import { PiHandDepositBold } from "react-icons/pi";
// import Dashboard from "./Dashboard";

const Sidebar = () => {
  axios.defaults.withCredentials = true;
  const { userData } = useAuthContext();
  const [open, setOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const baseUrl = import.meta.env.VITE_BASEURL;

  const handleLogout = async (e) => {
    e.preventDefault();

    setLoggingOut(true);
    try {
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
      icons: <IoMdWallet size={30}/>,
      label: "Withdrawal",
      url: "/Withdraw"
    },
    {
      icons: <PiHandDepositBold size={30}/>,
      label: "Deposit",
      url: "/courses",
    },
    {
      icons: <FaSignal size={30}/>,
      label: "Signal",
      url: "/signal",
    },{
      icons: <IoIosContact size={30} />,
      label: "KYC",
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

  const [code, setCode] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (userData?.status === 'blocked') {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      // Check if the code was generated for today already
      if (lastUpdated !== today) {
        // Generate a code based on today's date
        const generatedCode = generateCodeFromDate(today);
        setCode(generatedCode);
        setLastUpdated(today); // Update the lastUpdated state
      }
    }
  }, [userData, lastUpdated]);

  const generateCodeFromDate = (date) => {
    const hash = [...date].reduce((acc, char) => acc + char.charCodeAt(0), 0); 
    const code = (hash % 900000) + 100000; 
    return code;
  };


  if (!userData) {
    // Handle the case where userData is not available
    return (
      <div className="text-center p-5">
        <p className="text-lg">Loading user data...</p>
      </div>
    );
  }

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
           <div className="p-5 bg-white shadow-lg rounded-md">
      {userData?.status === 'active' ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-600">Signal Available</h2>
          <p className="text-lg mt-4">You can continue with transactions.</p>
        </div>
      ) : userData?.status === 'blocked' ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">No Signal On your Account</h2>
          <p className="text-lg mt-4">Here is your 6-digit code: </p>
           <div className="mt-4 text-2xl font-bold text-blue-600">{code}</div> 
          <p className='mt-4 text-lg'>To Purchase a Signal</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-600">Status Unknown</h2>
          <p className="text-lg mt-4">Unable to determine the status of your account.</p>
        </div>
      )}
    </div>
  

           </div>
          </div>
        </>
      )}
       <ToastContainer />
    </div>
   
  );
};

export default Sidebar;
