/* eslint-disable @next/next/no-img-element */
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
import React, { useEffect } from "react";
import { backend_url } from "@/server";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import Profile from "./Profile";
import Order from "./Order";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { loadUser, updateCustomerInformation } from "@/redux/actions/user";
import axios from "axios";
import { server } from "@/server";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { VscTriangleRight } from "react-icons/vsc";
import { Quicksand } from "next/font/google";
type Props = {};
const quicksand = Quicksand({subsets:['latin']})
type options = "profile" | "order";
function CustomerProfile({}: Props) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const email = user?.email;
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState<options | string>("profile");
  const [show, setShow] = useState(false);
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        router.push("/loading");
        if (typeof window !== 'undefined'){
          localStorage.setItem("cartItems", JSON.stringify([]));
        }
       
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const List = [
    {
      id: "profile",
      title: "My Profile",
    },
    {
      id: "order",
      title: "my order",
    },
  ];

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className={`${quicksand.className} hidden h-auto min-h-screen basis-1/5 flex-col items-center gap-5 bg-[#2C2C2C] py-4 lg:flex`}>
        <div className="mx-auto flex flex-col items-center gap-2">
          <img
            src={`${backend_url}${user?.avatar}`}
            className="h-28 w-28 cursor-pointer rounded-full"
            alt={user?.name}
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold text-white md:text-xl">
              {user?.name}
            </h1>
            <div className="mx-auto">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label
                htmlFor="image"
                className="flex w-fit cursor-pointer items-center justify-center rounded border-2 border-white bg-[#FAF7F68F]/50 px-4 py-1 text-sm text-white"
              >
                EDIT
              </label>
            </div>
            <button
              className="flex items-center gap-2 text-white"
              onClick={logoutHandler}
            >
              <FiLogOut className="h-4 w-4" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
        <div className="w-full text-start">
          {List.map((list) => (
            <div
              onClick={() => setOption(list.id)}
              className={`w-full cursor-pointer border-b border-[#2C2C2C] px-3 py-4 text-start uppercase transition-all duration-300 ${
                option === list.id
                  ? "bg-[#DDB7AC] text-[#2C2C2C]"
                  : "text-white"
              }`}
              key={list.id}
            >
              {list.title}
            </div>
          ))}
        </div>
      </div>

      <div className="block lg:hidden">
        <h1
          className={`flex w-full items-center justify-center bg-[#2C2C2C] px-3 py-3 text-center text-lg font-bold text-white sm:py-4 sm:text-xl ${
            show ? "" : ""
          }`}
        >
          <span
            className=" flex cursor-pointer items-center justify-center gap-2 px-3 py-2 uppercase"
            onClick={() => setShow(!show)}
          >
            {option === "profile" ? "My Profile" : "my order"}

            <VscTriangleRight
              className={`h-5 w-5 cursor-pointer text-white transition-all duration-300 sm:h-6 sm:w-6 ${
                show ? "rotate-90" : ""
              } `}
            />
          </span>
        </h1>
        <AnimatePresence>
          {show && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute z-10 w-full ${quicksand.className}`}
            >
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={() => {
                  setOption("profile");
                  setShow(false);
                }}
                type="button"
                className={`flex w-full items-center justify-center bg-[#2C2C2C] px-3 py-3 text-center text-base font-bold  uppercase text-white transition-all duration-300 hover:text-white md:text-xl ${
                  option === "profile" ? "hidden" : ""
                } `}
              >
                My profile
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setOption("order");
                  setShow(false);
                }}
                type="button"
                className={`flex w-full items-center justify-center  bg-[#2C2C2C] px-3 py-3 text-center text-base font-bold  uppercase text-white transition-all duration-300 hover:text-white md:text-xl ${
                  option === "order" ? "hidden" : ""
                }`}
              >
                My order
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`mx-auto mt-4 flex flex-col items-center lg:hidden ${quicksand.className}`}>
        <img
          src={`${backend_url}${user?.avatar}`}
          className="h-28 w-28 cursor-pointer rounded-full"
          alt={user?.name}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold text-black md:text-xl">
            {user?.name}
          </h1>
          <div className="mx-auto">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label
              htmlFor="image"
              className="flex w-fit cursor-pointer items-center justify-center rounded border-2 border-black bg-[#FAF7F68F]/50 px-4 py-1 text-sm text-black"
            >
              EDIT
            </label>
          </div>
          <button
            className="mx-auto mt-2 flex items-center gap-2 text-black"
            onClick={logoutHandler}
          >
            <FiLogOut className="h-4 w-4" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>

      <div className="mx-auto grid w-full basis-4/5 px-3 py-10">
        <AnimatePresence>
          {option === "profile" ? (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Profile />
            </motion.div>
          ) : (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Order />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CustomerProfile;
