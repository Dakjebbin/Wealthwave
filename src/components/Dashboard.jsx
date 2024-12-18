import React, { useEffect, useState } from 'react' //eslint-disable-line
import { useAuthContext } from "../context/auth-context";
import "../styles/dash.css"

//import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
const Dashboard = () => {

  const { userData } = useAuthContext();
  const [transaction, setTransaction] = useState([]);
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0);
  const [profits, setProfits] = useState(0);
  
  const baseUrl = import.meta.env.VITE_BASEURL
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchTransaction = async () => {
      if(!userData.email) return;

      try {
        const response = await axios.get(`${baseUrl}/transactions/get-transaction/${userData.email}`,{
          withCredentials:true
        })
      
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


  useEffect(() => {
    const fetchBalance = async () => {
      if (!userData.email) return;
  
      try {
       
        const response = await axios.get(`${baseUrl}/transactions/get-transaction/${userData.email}`, {
          withCredentials: true
        });

        const transactionsData = response.data.data;

        const completedDeposits = transactionsData.filter(t => t.type === 'Deposit' && t.status === 'Completed');
        const completedProfits = transactionsData.filter(t => t.type === 'Profit' && t.status === 'Completed');
 
        const totalDeposit = completedDeposits.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        
        const totalProfits = completedProfits.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        
        setBalance(totalDeposit);   
        setProfits(totalProfits); 
        setTransactions(transactionsData); 
        
  
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          console.log("Error fetching data:", error?.response?.data);
        } else {
          console.log("Error:", error);
        }
      }
    };
  
    if (userData?.email) {
      fetchBalance();
    }
  }, [userData?.email]); // Only refetch when the userData changes
  



  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  

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
    
                </div>

              <div>
                <p className='text-xl font-bold'> <span className='text-[#FE0000] '>Welcome</span> Back {userData?.username}</p>
              </div>

              <div className='bg-[#FF9994] flex flex-wrap p-10 gap-10 mt-8 rounded-md'>
                <div className='bg-white flex-grow basis-32 dash-text-box rounded-md flex p-5 flex-col items-center h-44 justify-between'>
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
                <div className='bg-white flex-grow basis-32 dash-text-box rounded-md flex p-5 flex-col items-center h-44 justify-between'>
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
                <div className='bg-white flex-grow basis-32 dash-text-box rounded-md flex p-5 flex-col items-center h-44 justify-between'>
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

              <div className='flex flex-wrap gap-10 lg:gap-28 mt-9 '>
                <div className='flex-grow basis-80 bg-[#FFBBB8] p-8 rounded-md fund-box items-center flex flex-col'>
                  <p className='mb-5 text-3xl'>
                    Balance
                  </p>

                  <p className='mb-5 text-2xl'>
                    $ {balance}
                  </p>

                  <Link to="/courses">
                  <button className='bg-white text-2xl font-semibold px-9 py-1'>
                    + Fund Account
                  </button>
                  </Link>
                </div>

                <div className='flex-grow basis-80 bg-[#FFBBB8] p-8 rounded-md fund-box items-center flex flex-col'>
                 
                  <p className='mb-5 text-3xl'>
                    Profits
                  </p>

                  <p className='mb-5 text-2xl'>
                    $ {profits}
                  </p>

                  <button className='bg-white px-10 font-semibold text-2xl py-1'>
                   Transfer
                  </button>
                  
                </div>
              </div>

                <div>
                <h2 className='text-center mt-10 font-semibold text-2xl'>Transaction History</h2>

                  {/* <div className='flex transaction-list bg-[#FFE6E4] px-4 rounded-sm flex-wrap mt-10'>
                    <p className='flex-grow text-sm sm:text-xl '>Type</p>
                    <p className='flex-grow text-sm pl-9 sm:text-xl'>Amount</p>
                    <p className='flex-grow text-sm pl-4 sm:text-xl'>Status</p>
                    <p className='flex-grow text-sm sm:text-xl'>Date Created</p>
                  </div> */}
        {transaction.length === 0 ? (
           <div className="text-center text-lg text-gray-500 mt-10">
           No Transactions Yet
         </div>
        ) : (
          <div className='flex transaction-list bg-[#FFE6E4] px-4 rounded-sm flex-wrap mt-10'>
            <p className='flex-grow text-sm sm:text-xl'>Type</p>
            <p className='flex-grow text-sm pl-9 sm:text-xl'>Amount</p>
            <p className='flex-grow text-sm pl-4 sm:text-xl'>Status</p>
            <p className='flex-grow text-sm sm:text-xl'>Date Created</p>
          </div>
        )}

{transaction.length > 0 && (
            <div>
                  <ol className='flex flex-wrap px-4 mt-5'>
                    <li className=' flex-grow '>{transaction.map((transactions, index) => (
                        <div key={index} className='uppercase mb-3 text-sm sm:text-xl '>
                          {transactions.type}
                        </div>
                    ))}</li>
                    <li className='flex-grow'>{transaction.map((transactions, index) => (
                        <div key={index} className='mb-3 text-sm sm:text-xl'>
                         ${transactions.amount}
                        </div>
                    ))}</li>
                    <li className='flex-grow'>{transaction.map((transactions, index) => (
                        <div key={index} className='mb-3 text-sm sm:text-xl'>
                         {transactions.status}
                        </div>
                    ))}</li>
                    <li className='flex-grow'>{transaction.map((transactions, index) => (
                        <div key={index} className='mb-3 text-sm sm:text-xl'>
                         {formatDate(transactions.createdAt)}
                        </div>
                    ))}</li>
                  </ol>
                  </div>
                    )}
                </div>
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