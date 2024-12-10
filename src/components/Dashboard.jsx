import React, { useEffect, useState } from 'react' //eslint-disable-line
import { useAuthContext } from "../context/auth-context";
import "../styles/dash.css"

//import { useParams } from "react-router-dom";
import axios from 'axios';
const Dashboard = () => {

  const { userData } = useAuthContext();
  const [transaction, setTransaction] = useState([])
  
  const baseUrl = import.meta.env.VITE_BASEURL
  
console.log("the state variable",transaction);

  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchTransaction = async () => {
      if(!userData.email) return;

      try {
        const response = await axios.get(`${baseUrl}/transactions/get-transaction/${userData.email}`,{
          withCredentials:true
        })
        console.log(response);
        setTransaction(response.data.data)
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          console.log("No session => ", error?.response?.data);
        } else {
          console.log("Session error => ", error);
        }
      }
    }
    if (userData?.email) {
      fetchTransaction();
  }
  }, [userData]);

  return (
    <div>

      {userData && (
              <div>
                <div className='flex justify-between'>
                {userData.status === "blocked" ? (
                  <span className='bg-red-500 w-full text-center text-white py-1 rounded-lg text-lg font-semibold'>
        Error Occurred. Please Contact Admin
      </span>
      ) : (
        <span></span>
      )}
      {/* <div>
                <span className='flex items-center mr-3' >Welcome {userData?.username}
                <Avatar >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>WW</AvatarFallback>
      </Avatar>
      </span>
      </div> */}
                </div>

              <div>
                <p className='text-xl font-bold'> <span className='text-[#FE0000] '>Welcome</span> Back {userData?.username}</p>
              </div>

              <div className='bg-[#FF9994] grid p-10 gap-10 mt-8 rounded-md md:grid-cols-3 '>
                <div className='bg-white dash-text-box rounded-md flex p-5 flex-col items-center h-44 justify-between'>
                  <p className='font-medium'>
                    Total User
                  </p>
                  <h6 className='rating'>
                    50.675
                  </h6>
                  <p className='font-medium'>
                    <span className='flex'>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.4653 19.5319L16.4062 9.03751C15.6328 7.69689 14.3672 7.69689 13.5938 9.03751L7.53469 19.5319C6.76125 20.8725 7.39406 21.9675 8.94094 21.9675H21.0591C22.6059 21.9675 23.2388 20.8706 22.4653 19.5319Z" fill="#14AE5C"/>
                    </svg>
                   <span className='text-[#00FE37]'> 5.4%</span>Up from Yesterday
                   </span>
                  </p>
                </div>
                <div className='bg-white dash-text-box rounded-md flex p-5 flex-col items-center h-44 justify-between'>
                  <p className='font-medium'>
                    Total Order
                  </p>
                  <h6 className='rating'>
                    13,326
                  </h6>
                  <p className='font-medium'>
                    <span className='flex'>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.4653 19.5319L16.4062 9.03751C15.6328 7.69689 14.3672 7.69689 13.5938 9.03751L7.53469 19.5319C6.76125 20.8725 7.39406 21.9675 8.94094 21.9675H21.0591C22.6059 21.9675 23.2388 20.8706 22.4653 19.5319Z" fill="#14AE5C"/>
                    </svg>
                   <span className='text-[#00FE37]'> 7.4%</span>Up from Yesterday
                   </span>
                  </p>
                </div>
                <div className='bg-white dash-text-box rounded-md flex p-5 flex-col items-center h-44 justify-between'>
                  <p className='font-medium'>
                    Total Sales
                  </p>
                  <h6 className='rating'>
                    $67,000
                  </h6>
                  <p className='font-medium'>
                    <span className='flex'>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.53461 10.4681L13.5937 20.9625C14.3671 22.3031 15.6327 22.3031 16.4062 20.9625L22.4652 10.4672C23.2396 9.12655 22.6059 8.03156 21.059 8.03156H8.94086C7.39399 8.03156 6.76024 9.12749 7.53461 10.4681Z" fill="#FE0000"/>
                  </svg>
                   <span className='text-[#FE0000]'> 5.3%</span>Up from Yesterday
                   </span>
                  </p>
                </div>
              </div>



              {/* <div className=' mt-7'>
                <h2>Transaction History</h2>
                {transaction.length === 0 ? (
                          <p>No Transactions</p>
                        ) : (
                  <ul>
                    {transaction.map((transactions, index) => {
                    return( <div key={index} className='grid grid-cols-3'>
                          <div>Amount:
                            <p> ${transactions.amount}
                            </p>
                            </div>
                          <div>Status: 
                            <p>{transactions.status}
                            </p>
                            </div>
                          <div>Type: <p> {transactions.type}
                          </p>
                          </div>
                      </div>

                    )
                    })}
                  </ul>
                ) }
                </div> */}
              </div>

              )}
              {userData === null && (
                <div>
              <p className='animate animate-pulse'>Loading...</p>
            
              </div>
            )}

    </div>
  )
}

export default Dashboard