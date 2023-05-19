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
import CustomerRegisterForm from "./CustomerRegisterForm";
import VendorRegisterForm from "./VendorRegisterForm";
import ShipperRegisterForm from "./ShipperRegisterForm";
import { VscTriangleRight } from "react-icons/vsc";
import { motion,AnimatePresence } from "framer-motion";
type Props = {};
type User = "Customer" | "Vendor" | "Shipper";
function RegisterForm({}: Props) {
  const [user, setUser] = useState<User>("Customer");
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="md:flex items-center justify-center text-white basis-2/5 hidden">
        <button
          onClick={() => setUser("Customer")}
          type="button"
          className={`uppercase font-bold transition-all duration-300 text-base md:text-xl flex rounded-tl-3xl py-6 px-3 w-full items-center justify-center text-center ${
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
          className={`uppercase font-bold transition-all duration-300 bg-[#BBA999] text-base md:text-xl flex  py-6 px-3 w-full items-center justify-center text-center ${
            user === "Vendor" ? "bg-transparent text-[#55564E]" : "bg-[#BBA999]"
          } `}
        >
          Vendor
        </button>
        <button
          onClick={() => setUser("Shipper")}
          type="button"
          className={`uppercase font-bold transition-all duration-300 bg-[#BBA999] text-base md:text-xl flex rounded-tr-3xl py-6 px-3 w-full items-center justify-center text-center ${
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
          className={`text-center py-3 sm:py-4 px-3 w-full bg-[#BBA999] text-white font-bold text-lg sm:text-xl rounded-t-3xl flex items-center justify-center ${
            show ? "" : ""
          }`}
        >
          <span
            className=" flex items-center justify-center gap-2 cursor-pointer px-3 py-2"
            onClick={() => setShow(!show)}
          >
            {user === "Customer"
              ? "Customer"
              : user === "Vendor"
              ? "Vendor"
              : "Shipper"}
            <VscTriangleRight
              className={`text-white h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 cursor-pointer ${
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
      <div className="flex items-center justify-center md:mt-4 lg:mt-12 basis-3/5 pt-2">
        {user === "Customer" ? (
          <CustomerRegisterForm />
        ) : user === "Vendor" ? (
          <VendorRegisterForm />
        ) : (
          <ShipperRegisterForm />
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
