import React, { useEffect, useState } from 'react' //eslint-disable-line
import { useAuthContext } from "../context/auth-context";
//import { toast } from 'react-toastify';
import Layout from '../layouts/sidebar-layout'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//import { useParams } from "react-router-dom";
import axios from 'axios';
const Dashboard = () => {

  const { userData } = useAuthContext();
  const [transaction, setTransaction] = useState([])
  const baseUrl = import.meta.env.VITE_BASEURL
  // const {email} = useParams()
  // console.log(email);
  
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


  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${baseUrl}/auth/logout`,
  //       {
  //       withCredentials:true
  //       }
  //   )

  //   if (response?.data.success) {
  //     toast.success(response?.data?.message);
  //     window.location.assign("/login");
  //   }
      
  //   } catch (error) { 
  //     if (error instanceof axios.AxiosError) {
  //       console.log('');
  //     } if(error === 404 || error) {
  //       const errorMessage =  error.message 
  //       toast.error(errorMessage)  
  //     }
  //   }
    
  // }



  return (
    <div>
  <Layout >
{userData && (
        <div>
          <div className='absolute right-0 flex items-center'>
          <span >Welcome {userData?.username}</span>
          <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
          </div>
        

          {userData.status === "blocked" ? (
  <span>Error Occurred. Please Contact Admin</span>
) : (
  <span></span>
)}
         

         
          {/* <button onClick={handleLogout} className='bg-red-700 border-solid border-2'>
            Log Out
          </button>
         */}

         <div>
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
</Layout>
    </div>
  )
}

export default Dashboard