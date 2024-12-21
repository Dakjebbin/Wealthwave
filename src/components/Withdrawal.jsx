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
import PinModal from "./PinModal";

const Withdrawal = () => {
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

  const [paymentChannel, setPaymentChannel] = useState('btc');
  const [paymentDetail, setPaymentDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [balance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentDetail || !amount) {
      alert('Please enter payment details and amount');
      return;
    }

    if (parseFloat(amount) > balance) {
        alert('Withdrawal amount exceeds available balance.');
        return;
      }


    setShowModal(true); // Show the modal when submitting
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
            
              {userData.status === "blocked" ? (
                <div className="overflow-hidden bg-red-700 mb-5 rounded-lg">
                  <div className=' w-full whitespace-nowrap animate-scroll mt-3 text-center text-white py-1 rounded-lg text-2xl font-semibold'>
       An Error Occurred. Please Contact Support
      </div>
      </div>
      ) : (
        <span></span>
      )}
      <div>
                <p className='text-xl font-bold'> <span className='text-[#FE0000] '>Welcome</span> Back {userData?.username}</p>
              </div>

<div className="min-h-screen  flex justify-center items-center">
<div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-semibold mb-6 text-center">Withdrawal</h1>
      <div className="mb-4">
        <p className="text-lg">Available Balance: <span className="font-bold">${balance}</span></p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Payment Channel</label>
          <select
            id="paymentChannel"
            value={paymentChannel}
            onChange={(e) => setPaymentChannel(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="btc">BTC Wallet Address</option>
            <option value="cashapp">CashApp</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Enter Payment Details</label>
          <input
            type="text"
            id="paymentDetail"
            value={paymentDetail}
            onChange={(e) => setPaymentDetail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter BTC Address or CashApp Username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Enter Amount to Withdraw</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Amount"
            min="1"
            max={balance}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#EDA9A6] text-white font-bold p-2 rounded-md hover:bg-[#9c504c]"
          >
            Withdraw
          </button>
        </div>
      </form>

      {/* Pin Modal */}
      {showModal && <PinModal setShowModal={setShowModal} />}
    </div>

</div>
            </div>
          </div>
        </>
      )}
       <ToastContainer />
    </div>
   
  );
};

export default Withdrawal;
