import React, { useEffect, useState } from 'react' //eslint-disable-line
import { useAuthContext } from "../context/auth-context";

import Layout from '../layouts/sidebar-layout'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  <Layout>
{userData && (
        <div>
          <div className='flex justify-between'>
          {userData.status === "blocked" ? (
            <span className='bg-red-500 max-w-96 text-center text-white px-4 py-2 rounded-lg text-lg font-semibold'>
  Error Occurred. Please Contact Admin
</span>
) : (
  <span></span>
)}
     
<div>
          <span className='flex items-center mr-3' >Welcome {userData?.username}
          <Avatar >
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>WW</AvatarFallback>
</Avatar>
</span>
</div>
          </div>
        

           
         <div className=' mt-7'>
          <h2>Transaction History</h2>
          {transaction.length === 0 ? (
                    <p>No Transactions</p>
                  ) : (
            <ul>
              {transaction.map((transactions, index) => {
               return( <div key={index} className='grid grid-cols-3 '>
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
          </div>

        </div>

        )}

        {userData === null && (
          <div>
        <p className='animate animate-pulse'>Loading...</p>
       
        </div>
      )}
    
</Layout>

    </div>
  )
}

export default Dashboard