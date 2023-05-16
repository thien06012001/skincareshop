"use client";
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "@/styles/styles";
import { Country, State, City } from "country-state-city";
import { hubs } from "@/static/data";
function Checkout() {
  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [hub, setHub] = useState("");
  const router = useRouter();
  const paymentSubmit = () => {
    if (
      address === "" ||
      zipCode === null ||
      country === "" ||
      city === "" ||
      hub === "" ||
      fullName === ""
    ) {
      toast.error("Please fill all your delivery information!");
    } else {
      const shippingAddress = {
        address,
        zipCode,
        country,
        city,
      };
      const ordererInfo = {
        fullName,
        phoneNumber,
      };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        shippingAddress,
        user,
        ordererInfo,
        hub,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      router.push("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc: any, item: any) => acc + item.qty * item.price,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const totalPrice = (subTotalPrice + shipping - subTotalPrice / 10).toFixed(2);
  console.log(address);
  console.log(zipCode);
  console.log(country);
  console.log(hub);
  console.log(city);
  console.log(fullName);
  return (
    <div className="flex w-full flex-col px-5">
      <div className="flex justify-center ">
        <div className="basis-1/2">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
            hub={hub}
            setHub={setHub}
            fullName={fullName}
            setFullName={setFullName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </div>

        <div className="basis-1/3">
          <CartData
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
          />
        </div>
      </div>
      <div
        className={`mx-auto flex w-5/6 justify-end bg-[#F0E4DB] px-5 py-4`}
        onClick={paymentSubmit}
      >
        <button className=" flex items-center justify-center rounded-md bg-[#DDB7AC] px-7 py-2 text-lg font-bold text-[#55564E]">
          Continue
        </button>
      </div>
    </div>
  );
}
const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address,
  setAddress,
  zipCode,
  setZipCode,
  hub,
  setHub,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  absolute,
  setAbsolute,
}: any) => {
  return (
    <div className=" w-full rounded-l-lg bg-[#F0E4DB] px-3 py-5 ">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form className="flex flex-col space-y-5">
        <div className="flex flex-col gap-1 ">
          <input
            type="text"
            name="FullName"
            value={fullName}
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            id=""
            className="border-b border-[#BBA999] outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#2C2C2C]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            id=""
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border-b border-[#BBA999] outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#2C2C2C]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={user && user.email}
            required
            id=""
            className="border-b border-[#BBA999] outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#2C2C2C]"
          />
        </div>
        <div className="flex flex-col gap-1">
         
          <input
            type="text"
            name="Address"
            placeholder="Shipping Address"
            id=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-b border-[#BBA999] outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#2C2C2C]"
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex w-full flex-col">
            <select
              name="Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              id="Country"
              className="border-b border-[#BBA999] bg-transparent py-1 outline-none"
            >
              <option
                value=""
                className="border-2 border-[#BBA999] bg-[#F0E4DB] font-semibold"
              >
                Country
              </option>
              {Country.getAllCountries().map((country) => (
                <option
                  value={country.isoCode}
                  key={country.isoCode}
                  className="border-2 border-[#BBA999] bg-[#F0E4DB] font-semibold"
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full flex-col">
            <select
              className="border-b border-[#BBA999] bg-transparent py-1 outline-none"
              name="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id=""
            >
              <option
                value=""
                className="border-2 border-[#BBA999] bg-[#F0E4DB] font-semibold"
              >
                City
              </option>
              {/* @ts-expect-error */}
              {City.getCitiesOfCountry(country).map((city) => (
                <option
                  value={city.name}
                  key={city.name}
                  className="border-2 border-[#BBA999] bg-[#F0E4DB] font-semibold"
                >
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className=" flex w-full ">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
              id=""
              className="w-full border-b border-[#BBA999] py-1 outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#2C2C2C]"
            />
          </div>
          <div className="flex w-full flex-col">
            <select
              className="border-b border-[#BBA999] bg-transparent py-1 outline-none"
              name="hub"
              value={hub}
              onChange={(e) => setHub(e.target.value)}
              id=""
            >
              <option className="border-2 border-[#BBA999] bg-[#F0E4DB] font-semibold">
                Distribution Hub
              </option>
              {hubs.map((hub) => (
                <option
                  value={hub.value}
                  key={hub.id}
                  className="border-2 border-[#BBA999] bg-[#F0E4DB] font-semibold"
                >
                  {hub.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
}: any) => {
  return (
    <div className="h-full rounded-r-lg bg-[#F0E4DB] px-4 py-5">
      <div className="h-full w-full rounded-md bg-[#DDB7AC] p-5 pb-8 text-[#2C2C2C]">
        <h1 className="mb-5 text-lg font-bold">Total</h1>
        <div className="flex flex-col space-y-5">
          <div className="flex justify-between">
            <h3 className="">Subtotal</h3>
            <h5 className="">${subTotalPrice}</h5>
          </div>

          <div className="flex justify-between">
            <h3 className="">Shipping</h3>
            <h5 className="">${shipping.toFixed(2)}</h5>
          </div>
          <div className="flex justify-between pb-3">
            <h3 className="">Discount</h3>
            <h5 className="">${subTotalPrice / 10}</h5>
          </div>
        </div>
        <hr className="my-3 border border-black" />
        <div className="flex justify-between pb-3">
          <h3 className="">Total</h3>
          <h5 className="">${totalPrice}</h5>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
