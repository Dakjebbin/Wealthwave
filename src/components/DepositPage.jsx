import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAuthContext } from "../context/auth-context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoMdCopy } from "react-icons/io";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const DepositPage = () => {

const [paymentType, setPaymentType] = useState("btc");
const [paymentDetails, setPaymentDetails] = useState("bc1qa45ms62gtfv2wdue6lzzc6gw30tmt8jzr266c0");
const [conversionRate, setConversionRate] = useState("");
const [btcPrice, setBtcPrice] = useState(null);
const [ethPrice, setEthPrice] = useState(null);
const [packageInput, setPackageInput] = useState("");
const [rateLoading, setRateLoading] = useState(true);
const [logging, setLogging] = useState(false);

const navigate = useNavigate()

const handlePaymentTypeChange = (e) => {
    const selectedPaymentType = e.target.value;
    setPaymentType(selectedPaymentType);

    if (selectedPaymentType === "btc") {
        setPaymentDetails("bc1qa45ms62gtfv2wdue6lzzc6gw30tmt8jzr266c0")
    } else if (selectedPaymentType === "eth") {
        setPaymentDetails("0xYourEthereumWalletAddressHere"); 
    } else if (selectedPaymentType === "cashapp") {
        setPaymentDetails("$YourCashAppUsername"); 
    }
}

const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(paymentDetails).then(() => {
        toast.success("Wallet Address Copied");
    }).catch(err => {
        toast.error("Failed to copy wallet address " + err);
    });
};

  const chartData = [
    { month: "January", desktop: 186, mobile: 80, price: 31 },
    { month: "February", desktop: 305, mobile: 200, price: 42 },
    { month: "March", desktop: 237, mobile: 120, price: 38 },
    { month: "April", desktop: 73, mobile: 190, price: 29 },
    { month: "May", desktop: 209, mobile: 130, price: 35 },
    { month: "June", desktop: 214, mobile: 140, price: 40 },
  ];
  const { userData } = useAuthContext();

  // JavaScript object for chart configuration
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  const location = useLocation();
  const {packageName, price} = location.state || {};
   
useEffect(() => {
  const fetchRates = async () => {
   
    try {
    
      // const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd");
     
      const btc = 101174;
     const eth = 3695.91;
     
     setBtcPrice(btc);
     setEthPrice(eth);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        toast.error(
           error?.response?.data
         );
        //  setTimeout(() => fetchRates(retryCount + 1), 10000);
       } else {
         toast.error("reg error => ", error);
       }
      
    } finally{
      
      setRateLoading(false);
    }

  };

  fetchRates();
}, [])

  
  useEffect(() => {
    if (packageInput) {
      const priceMatch = packageInput.match(/(?:\$)(\d+(\.\d+)?)/); // Extract price from input string (e.g., "$200" or "$199.99")
      if (priceMatch && priceMatch[1]) {
        const amountInUsd = parseFloat(priceMatch[1]);

        if (paymentType === "btc" && btcPrice) {
          const equivalentBtc = amountInUsd / btcPrice;
          setConversionRate(`${equivalentBtc.toFixed(6)} BTC`);
        } else if (paymentType === "eth" && ethPrice) {
          const equivalentEth = amountInUsd / ethPrice;
          setConversionRate(`${equivalentEth.toFixed(6)} ETH`);
        } else if (paymentType === "cashapp") {
          setConversionRate("")
        }
      }
    }
  }, [packageInput, paymentType, btcPrice, ethPrice]);

  useEffect(() => {
    if (packageName && price) {
      setPackageInput(`${packageName} - $${price}`);
    }
  }, [packageName, price]);

  axios.defaults.withCredentials = true
  const baseUrl = import.meta.env.VITE_BASEURL
  
  const handleFunding = async (e) => {
      setLogging(true)
    e.preventDefault();
      if(!userData.email) {
        toast.error("Please log in to fund your wallet");
        return;
      }
      if (userData.status === "blocked") {
        toast.error("Unauthorized Access, Please Contact Admin")
        return;
      }

      const plan = packageName || undefined;
      const amount = parseFloat(packageInput.match(/(?:\$)(\d+(\.\d+)?)/)?.[1]) || 0;

      if (amount <= 0) {
        toast.error("Invalid amount to fund");
        return;
      }
 
      try {
        const response = await axios.post(`${baseUrl}/userFund/fund`,{
          email: userData.email,
          amount,
          plan
        },{
          withCredentials:true
        });
        

        if (response?.data && response?.data?.success) {
          toast.success("We have received your request, Please Upload Proof of Payment");
          navigate("/confirmation",  { state: { amount, plan } })
        } else {
          toast.error("Failed to fund the wallet. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response?.data?.message || "An error occurred");
        } else {
          toast.error("Network or server error. Please try again.");
        }
      } finally {
        setLogging(false);
      }
      
  } 

  return (
    <div className="bg-[#FE918C33] ">
        {userData && (
      <main className="m-auto w-[90%]">
<div className="w-full pt-5">
{userData.status === "blocked" ? (
        <div className='bg-red-500 w-full text-center text-white py-1 rounded-lg text-lg font-semibold'>
        Error Occurred. Please Contact Admin
      </div>
      ) : (
        <span></span>
      )}

</div>
<Link to="/dashboard">
      <button className="bg-[#FF0C00] p-3 mt-5 mr-4 text-white font-bold font-playfair rounded-lg ">Dashboard</button>
      </Link>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-[#FE918C]">Analytics</CardTitle>
            <CardDescription className="font-bold text-black text-xl"> Our Transactional  Optimization</CardDescription>
          </CardHeader>
          <CardContent >
            {/* Pass chartConfig to the ChartContainer component */}
            <ChartContainer className="h-[200px] w-full" config={chartConfig}>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                {/* Use chartConfig to define the colors of bars */}
                <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4}>
                  {/* Adding the dynamic price label for desktop */}
                  <LabelList 
                    dataKey="price" 
                    position="top" 
                    style={{ fontSize: '12px', fontWeight: 'bold', fill: 'black' }} 
                    formatter={(value) => `$${value}k`} // Format the price with $
                  />
                </Bar>
                <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing Revenue Growth for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <div className="flex mt-10 flex-wrap gap-16 lg:gap-36 pb-10">

        <div className=" flex-grow basis-96">
            <p className="font-playfair text-xl">Package</p>
            <form onSubmit={handleFunding}>
        <input 
              type="text" 
              id="package-price" 
              value={packageInput} // Combine both values
              readOnly
              onChange={(e) => setPackageInput(e.target.value)}
              className="pt-1 pb-1 pl-3 w-72 font-bold text-lg rounded-xl bg-[#FE918C]"
            />
       
       <div className="mt-7">
            <p className="font-playfair text-xl">Payment Type</p>

            <select
                id="paymentType"
                value={paymentType}
                onChange={handlePaymentTypeChange}
                className="pt-1 pb-1 pl-3 w-72 font-bold text-lg rounded-xl bg-[#FE918C]"
              >
                <option value="btc">Bitcoin</option>
                <option value="eth">Ethereum</option>
                <option value="cashapp">CashApp</option>
              </select>
        </div>

       
        <div className="mt-7 mb-7">
              <p className="font-playfair text-xl">Wallet Address</p>
              {paymentType === "btc" && (
                <div className="flex relative">
                <input
                  type="text"
                  id="paymentDetails"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="Enter your BTC wallet address"
                  className="pt-1 pb-1 pl-3 w-full pr-10  font-bold text-[0.85rem] md:text-lg rounded-xl bg-[#FE918C]"
                />
                <div className="absolute right-3 bottom-1 md:bottom-3 cursor-pointer">
                <IoMdCopy 
                size={20}
                onClick={handleCopyToClipboard} />
                </div>
                </div>
              )}
              {paymentType === "eth" && (
                <input
                  type="text"
                  id="paymentDetails"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="Enter your Ethereum wallet address"
                  className="pt-1 pb-1 pl-3 w-full font-bold text-lg rounded-xl bg-[#FE918C]"
                />
              )}
              {paymentType === "cashapp" && (
                <input
                  type="text"
                  id="paymentDetails"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="Enter your CashApp username"
                  className="pt-1 pb-1 pl-3 w-full font-bold text-lg rounded-xl bg-[#FE918C]"
                />
              )}
            </div>

            <p className="font-playfair text-xl">Rates</p>
            <div className="flex mb-7">
             
            {rateLoading ? (
                  <p className="animate-pulse text-xl font-bold text-gray-500">Loading...</p>
                ) : (
                  <input
                    type="text"
                    id="paymentDetails"
                    value={conversionRate}
                    readOnly
                    placeholder="Converted Rates Please Wait"
                    className="pt-1 pb-1 pl-3 w-full font-bold text-[0.85rem] md:text-lg rounded-xl bg-[#FE918C]"
                  />
                )}
                
                </div>

                <div className="flex justify-center "> 
                <button type='submit' 
                disabled={logging}
                className="bg-[#FE0000] px-9 font-bold py-2 rounded-lg"
                >
                  {logging ? (
                      <div className="flex items-center space-x-2 justify-center">
                      <span className="animate-pulse">Loading</span>{" "}
                      <FaSpinner className=" animate-spin " />
                    </div>
                  ) : (
                  "SUBMIT"
                  )}
                  </button>
                  </div>
            </form>
        </div>

        <div className="flex-grow flex-col basis-96 flex items-center text-center">
              <h3 className="font-bold font-playfair text-xl mb-6">
                We Provide the <br /> Best Experience for our clients
              </h3>

            <div className="mb-6">
              <p className="font-playfair font-bold text-xl">
                88%
              </p>
              <p className="font-playfair text-lg"> Revenue Growth</p>
              </div>

              <div >
              <p className="font-playfair font-bold text-xl">
                400%
              </p>
              <p className="font-playfair text-lg">Integrated</p>
              </div>

              <div className="mt-7">
              <p className="font-playfair font-bold text-xl">
                24+
              </p>
              <p className="font-playfair text-lg">Countries</p>
              </div>
        </div>
        </div>
        <ToastContainer/>
      </main>

   
    )}
    </div>
  );
};

export default DepositPage;
