/* eslint-disable @next/next/no-img-element */
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
import product from "../app/assets/product.png";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { useAppDispatch } from "@/redux/hook";
import { addTocart, removeFromCart } from "@/redux/actions/cart";
import { RxCross1 } from "react-icons/rx";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
type Props = {
  setShown: () => void;
};

function CartList({ setShow }: any) {
  const list = ["All", "Face", "Body", "Hair", "Makeup"];
  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-[#0000004b]">
      <AnimatePresence>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }} exit={{opacity:0, x:200}}
        className=" fixed right-0 top-0 flex h-full w-full flex-col justify-between overflow-y-scroll bg-[#BBA999] shadow-sm md:w-[50%] lg:w-[30%]"
      >
        <div className="fixed right-3 top-3 flex w-full justify-end pr-5 pt-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setShow(false)}
          />
          </div>
            <div className="flex flex-col w-full h-full justify-center items-center gap-4 text-xl font-semibold text-[#FAF7F6] ">
            <Link href={'/profile'} onClick={() => setShow(false)}>
              Profile
            </Link>
            {list.map(list => (
              <Link href={`/category/${list}`} key={list}  onClick={() => setShow(false)}>
                {list}
              </Link>
            ))}
          </div>
      </motion.div>
      </AnimatePresence>
      
    </div>
  );
}

export default CartList;
