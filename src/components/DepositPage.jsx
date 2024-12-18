"use client";

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
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoMdCopy } from "react-icons/io";

const DepositPage = () => {

const [paymentType, setPaymentType] = useState("btc");
const [paymentDetails, setPaymentDetails] = useState("bc1qa45ms62gtfv2wdue6lzzc6gw30tmt8jzr266c0")

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

  const packagePrice = packageName && price ? `${packageName} - $${price}` : '';

  return (
    <div className="bg-[#FE918C33] ">
        {userData && (
      <main className="m-auto w-[90%]">
      <button className="bg-[#FF0C00] p-3 mt-5 mr-4 text-white font-bold font-playfair rounded-lg ">Dashboard</button>
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
        <input 
              type="text" 
              id="package-price" 
              value={packagePrice} // Combine both values
              readOnly
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
                  className="pt-1 pb-1 pl-3 w-full font-bold text-[0.85rem] md:text-lg rounded-xl bg-[#FE918C]"
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

            <div className="flex justify-center ">
                <button className="bg-[#FE0000] px-9 font-bold py-2 rounded-lg">
                    SUBMIT
                </button>
            </div>
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
