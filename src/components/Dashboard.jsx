import React, { useEffect, useState } from 'react'; //eslint-disable-line
import { useAuthContext } from "../context/auth-context";
import "../styles/dash.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import axios from 'axios';
import Loader from './Loader';

const Dashboard = () => {
  const { userData } = useAuthContext();
  const [transactions, setTransactions] = useState([]); // Store all transactions
  const [balance, setBalance] = useState(0);           // Total balance
  const [profits, setProfits] = useState(0);             // Total profits
  const [accumulatingBalance, setAccumulatingBalance] = useState(0);  // Accumulated balance
  
  const baseUrl = import.meta.env.VITE_BASEURL;

  axios.defaults.withCredentials = true;

  // Fetch transactions and balance information
  useEffect(() => {
    const fetchBalance = async () => {
      if (!userData?._id) return;

      try {
        // Fetch transactions and balance data from the server
        const response = await axios.get(`${baseUrl}/transactions/get-transactionAdmin/${userData._id}`, {
          withCredentials: true
        });

        const transactionsData = response.data.data;

        // Set the transactions data directly
        setTransactions(transactionsData);

      } catch (error) {
        if (error instanceof axios.AxiosError) {
          console.log("Error fetching data:", error?.response?.data);
        } else {
          console.log("Error:", error);
        }
      }
    };

    if (userData?._id) {
      fetchBalance();
    }
  }, [userData?._id]); // Refetch when userData changes

  useEffect(() => {
    if (userData) {
      const balance = userData.balance; // Directly use balance from userData
      const profits = userData.profit;  // Directly use profits from userData
      setAccumulatingBalance(balance + profits); 
      setBalance(balance)
      setProfits(profits) // Accumulating balance = balance + profit
    }
  }, [userData]);

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
          <div className="flex justify-between">
            {userData.status === "blocked" && (
              <div className="overflow-hidden bg-red-700 mb-5 rounded-lg w-full">
                <div className="whitespace-nowrap animate-scroll mt-3 text-center text-white py-1 rounded-lg text-2xl font-semibold">
                  An Error Occurred. Please Contact Support
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="text-xl font-bold">
              <span className="text-[#FE0000]">Welcome</span> Back {userData?.username}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 lg:gap-4 mt-9">
            <div className="flex-grow basis-96 bg-[#FFBBB8] p-8 rounded-md fund-box flex flex-col">
              <p className="mb-4 text-2xl">Capital</p>
              <div className="flex justify-between">
                <p className="mb-5 text-2xl">${balance}</p>
                <div>
                  <FaWallet size={25} />
                </div>
              </div>
            </div>

            <div className="flex-grow basis-96 bg-[#FFBBB8] p-8 rounded-md fund-box flex flex-col">
              <p className="mb-5 text-2xl">Accumulating Balance</p>
              <div className="flex justify-between">
                <p className="mb-5 text-2xl">${accumulatingBalance}</p>
                <div>
                  <FaArrowRightArrowLeft size={25} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 lg:gap-4 mt-5">
            <div className="flex-grow basis-96 bg-[#FFBBB8] p-8 rounded-md fund-box flex flex-col">
              <p className="mb-5 text-2xl">Profits</p>
              <p className="mb-5 text-2xl">${profits}</p>
            </div>

            <div className="flex-grow basis-96 bg-[#FFBBB8] p-8 rounded-md fund-box flex flex-col">
              <p className="mb-5 text-2xl">Sales Status</p>
              <div className="flex justify-between">
                <div>
                  <span className="flex">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.4653 19.5319L16.4062 9.03751C15.6328 7.69689 14.3672 7.69689 13.5938 9.03751L7.53469 19.5319C6.76125 20.8725 7.39406 21.9675 8.94094 21.9675H21.0591C22.6059 21.9675 23.2388 20.8706 22.4653 19.5319Z"
                        fill="#14AE5C"
                      />
                    </svg>
                    <span className="font-bold">0</span>
                  </span>
                  <p className="ml-6">Total Won</p>
                </div>

                <div>
                  <span className="flex">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.53461 10.4681L13.5937 20.9625C14.3671 22.3031 15.6327 22.3031 16.4062 20.9625L22.4652 10.4672C23.2396 9.12655 22.6059 8.03156 21.059 8.03156H8.94086C7.39399 8.03156 6.76024 9.12749 7.53461 10.4681Z"
                        fill="#FE0000"
                      />
                    </svg>
                    <span className="font-bold">0</span>
                  </span>
                  <p className="ml-6">Total Loss</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-center mt-10 font-semibold text-2xl">Transaction History</h2>
            {transactions.length === 0 ? (
              <div className="text-center text-lg text-gray-500 mt-10">
                No Transactions Yet
              </div>
            ) : (
              <div className="overflow-x-auto mt-10">
                <table className="min-w-full bg-[#FFE6E4] rounded-sm">
                  <thead>
                    <tr className="text-sm sm:text-xl text-left bg-[#FFBBBB]">
                      <th className="p-4">Type</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="border-b border-[#FFD7D2]">
                        <td className="p-4">{transaction.type}</td>
                        <td className="p-4">${transaction.amount}</td>
                        <td className="p-4">{transaction.status}</td>
                        <td className="p-4">{formatDate(transaction.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
