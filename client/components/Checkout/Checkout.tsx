"use client";
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "@/styles/styles";
import { Country, State } from "country-state-city";
import { hubs } from "@/static/data";
function Checkout() {
  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address, setAddress] = useState("");

  const [zipCode, setZipCode] = useState(null);
  const [hub, setHub] = useState("");
  const router = useRouter();
  const paymentSubmit = () => {
    if (
      address === "" ||
      zipCode === null ||
      country === "" ||
      city === "" ||
      hub === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address,
        zipCode,
        country,
        city,
        hub,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        shippingAddress,
        user,     
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

  return (
    <div className="flex w-full flex-col items-center py-8">
      <div className="1000px:w-[70%] 800px:flex block w-[90%]">
        <div className="800px:w-[65%] w-full">
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
          />
        </div>
        <div className="800px:w-[35%] 800px:mt-0 mt-8 w-full">
          <CartData
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
          />
        </div>
      </div>
      <div
        className={`${styles.button} 800px:w-[280px] mt-10 w-[150px]`}
        onClick={paymentSubmit}
      >
        <button className=" rounded-md bg-green-500 px-4 py-2 font-bold text-white">
          Go to Payment
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
}: any) => {
  return (
    <div className="800px:w-[95%] w-full rounded-md bg-white p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="h-[40px] w-[95%] rounded-[5px] border"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value=""></option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="h-[40px] w-[95%] rounded-[5px] border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex w-full pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Shipping address</label>
            <input
              type="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Distribution hub</label>
            <select
              className="h-[40px] w-[95%] rounded-[5px] border"
              value={hub}
              onChange={(e) => setHub(e.target.value)}
            >
              <option className="block pb-2" value=""></option>
              {hubs.map((hub) => (
                <option
                  key={hub.id}
                  value={hub.value}
                  className="bg-transparent text-[#55564E]"
                >
                  {hub.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="inline-block cursor-pointer text-[18px]"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user !== undefined &&
            user.addresses.map((item: any, index: any) => (
              <div key={index} className="mt-1 flex w-full">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress(item.address) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
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
    <div className="w-full rounded-md bg-[#fff] p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{subTotalPrice / 10}</h5>
      </div>
      <h5 className="pt-3 text-end text-[18px] font-[600]">${totalPrice}</h5>
      <br />
    </div>
  );
};
export default Checkout;
