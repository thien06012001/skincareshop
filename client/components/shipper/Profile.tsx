"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { updateShipperInformation } from "@/redux/actions/user";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
type Props = {};

function Profile({}: Props) {
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [changePhone, setChangePhone] = useState(true);
  let [address, setAddress] = useState(user && user.address);
  if (address === undefined) {
    address = user?.address;
  }
  const email = user?.email;
  const [password, setPassword] = useState("");
  let [phoneNumber, setPhoneNumber] = useState<string>(
    user && user.phoneNumber
  );
  if (phoneNumber === undefined && user?.phoneNumber !== undefined) {
    phoneNumber = user?.phoneNumber;
  }
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const checkPhone = () => {
    if (!/^[0-9\s]*$/.test(phoneNumber) && phoneNumber !== undefined) {
      toast.error("The phone number must only contain numbers and spaces");
      return;
    }
    setShow(true);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateShipperInformation(email, phoneNumber, password));
    toast.success("Updated Customer Information successfully");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    setShow(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1 }}
      className="m-auto w-full bg-[#F0E4DB] px-4 py-3 text-[#2C2C2C]"
    >
      <h1 className="text-xl font-bold">MY PROFILE</h1>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col space-y-3 px-4 py-2 "
      >
        <div className="relative px-3 border-b border-[#BBA999] py-2">
          <h1>{user?.name}</h1>
        </div>
        <div className="relative px-3 border-b border-[#BBA999] py-2">
          <h1>{user?.email}</h1>
        </div>
        <div className="relative px-3 border-b border-[#BBA999] py-2">
          {changePhone ? (
            <h1>
              +84{" "}
              {user?.phoneNumber === undefined && phoneNumber === ""
                ? "Phone Number"
                : user?.phoneNumber !== undefined && phoneNumber === ""
                ? user?.phoneNumber
                : phoneNumber}
              {/* {user?.phoneNumber} */}
            </h1>
          ) : (
            <div className="">
              +84{" "}
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setIsDisabled(false);
                }}
                placeholder="New Phone number"
                className="w-[80%] bg-transparent outline-none"
                name=""
                id=""
              />
            </div>
          )}
          {changePhone ? (
            <svg
              onClick={() => setChangePhone(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute right-0 top-2 h-6 w-6 cursor-pointer text-[#6F6D6DC9]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          ) : (
            <svg
              onClick={() => setChangePhone(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute right-0 top-2 h-6 w-6 cursor-pointer text-[#6F6D6DC9]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        </div>
        {show && (
          <div className="product absolute inset-0 z-10 flex flex-col items-center justify-center gap-5">
            <div className=" relative border-b border-[#BBA999]">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  bg-transparent py-2 placeholder:tracking-wider placeholder:text-[#55564E] focus:outline-none"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer text-[#55564E]"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer text-[#55564E]"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              {" "}
              <button
                type="submit"
                className="mx-auto rounded-lg bg-white px-4 py-1"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
      <div className=" flex w-full items-center justify-end gap-5 px-2 py-3">
        <button
          disabled={isDisabled}
          onClick={checkPhone}
          className="rounded bg-green-500 px-3 py-1 text-white transition-all duration-300 disabled:grayscale"
        >
          SAVE
        </button>
      </div>
    </motion.div>
  );
}

export default Profile;
