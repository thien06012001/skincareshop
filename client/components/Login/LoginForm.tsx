"use client";
// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
//   Chau Chan Bang(s3975015)
//   Chau Chan Thien(s3975010)
//   Ophelie Manon Tran(s3968993)
//   Nguyen Dang Thanh Trung(s3978674)
//   Han Yeeun(s3912055)
// Acknowledgement: Acknowledge the resources that you use here.;
import React, { useState } from "react";
import CustomerLoginForm from "./CustomerLoginForm";
import VendorLoginForm from "./VendorLoginForm";
import ShipperLoginForm from "./ShipperLoginForm";
import { VscTriangleRight } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";
type Props = {};
type User = "Customer" | "Vendor" | "Shipper";
function LoginForm({}: Props) {
  const [user, setUser] = useState<User>("Customer");
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col ">
      <div className=" hidden basis-2/5 items-center justify-center text-white md:flex">
        <button
          onClick={() => setUser("Customer")}
          type="button"
          className={`flex w-full items-center justify-center rounded-tl-3xl px-3 py-6 text-center text-base font-bold uppercase transition-all duration-300 md:text-xl ${
            user === "Customer"
              ? "bg-transparent text-[#55564E]"
              : "bg-[#BBA999]"
          }`}
        >
          customer
        </button>
        <button
          onClick={() => setUser("Vendor")}
          type="button"
          className={`flex w-full items-center justify-center bg-[#BBA999] px-3 py-6 text-center  text-base font-bold uppercase transition-all duration-300 md:text-xl ${
            user === "Vendor" ? "bg-transparent text-[#55564E]" : "bg-[#BBA999]"
          } `}
        >
          Vendor
        </button>
        <button
          onClick={() => setUser("Shipper")}
          type="button"
          className={`flex w-full items-center justify-center rounded-tr-3xl bg-[#BBA999] px-3 py-6 text-center text-base font-bold uppercase transition-all duration-300 md:text-xl ${
            user === "Shipper"
              ? "bg-transparent text-[#55564E]"
              : "bg-[#BBA999]"
          }`}
        >
          Shipper
        </button>
      </div>
      <div className="block md:hidden">
        <h1
          className={`flex w-full items-center justify-center rounded-t-2xl bg-[#BBA999] px-3 py-3 text-center text-lg font-bold text-white sm:py-4 sm:text-xl ${
            show ? "" : ""
          }`}
        >
          <span
            className=" flex cursor-pointer  items-center justify-center gap-2 px-3 py-2"
            onClick={() => setShow(!show)}
          >
            {user === "Customer"
              ? "Customer"
              : user === "Vendor"
              ? "Vendor"
              : "Shipper"}
            <VscTriangleRight
              className={`h-5 w-5 cursor-pointer text-white transition-all duration-300 sm:h-6 sm:w-6 ${
                show ? "rotate-90" : ""
              } `}
            />
          </span>
        </h1>
        <AnimatePresence>
          {show && (
            <motion.div exit={{opacity:0}} transition={{duration:0.5}} className={` absolute z-10 w-full `}>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              
                onClick={() => {
                  setUser("Customer");
                  setShow(false);
                }}
                type="button"
                className={`flex w-full items-center justify-center  bg-[#BBA999] px-3 py-3 text-center text-base font-bold uppercase text-[#55564E] transition-all duration-300 hover:text-white md:text-xl ${
                  user === "Customer" ? "hidden" : ""
                } `}
              >
                customer
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              
                onClick={() => {
                  setUser("Vendor");
                  setShow(false);
                }}
                type="button"
                className={`flex w-full items-center justify-center  bg-[#BBA999] px-3 py-3 text-center text-base font-bold  uppercase text-[#55564E] transition-all duration-300 hover:text-white md:text-xl ${
                  user === "Vendor" ? "hidden" : ""
                } `}
              >
                Vendor
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
             
                onClick={() => {
                  setUser("Shipper");
                  setShow(false);
                }}
                type="button"
                className={`flex w-full items-center justify-center  bg-[#BBA999] px-3 py-3 text-center text-base font-bold  uppercase text-[#55564E] transition-all duration-300 hover:text-white md:text-xl ${
                  user === "Shipper" ? "hidden" : ""
                }`}
              >
                Shipper
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-12 flex basis-3/5 items-center justify-center py-5">
        {user === "Customer" ? (
          <CustomerLoginForm />
        ) : user === "Vendor" ? (
          <VendorLoginForm />
        ) : (
          <ShipperLoginForm />
        )}
      </div>
    </div>
  );
}

export default LoginForm;
