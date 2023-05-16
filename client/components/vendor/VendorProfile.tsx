/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { backend_url } from "@/server";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { loadUser, updateCustomerInformation } from "@/redux/actions/user";
import axios from "axios";
import { server } from "@/server";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import Profile from "./Profile";
import Order from "./Order";
import Product from "./Product";
import AddProduct from "./AddProduct";
import ShopOrder from "./ShopOrder";
type Props = {};
type options = "profile" | "order" | "product" | "add" | "shop";

function VendorProfile({}: Props) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const email = user?.email;
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState<options | string>("profile");
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        router.push("/loading");
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
    {
      id: "product",
      title: "my product",
    },
    {
      id: "add",
      title: "add new product",
    },
    {
      id: "shop",
      title: "Shop Orders",
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
    <div className="flex">
      <div className="flex h-auto min-h-screen basis-1/5 flex-col items-center gap-5 bg-[#2C2C2C] py-4">
        <div className="mx-auto flex gap-2">
          <img
            src={`${backend_url}${user?.avatar}`}
            className="h-28 w-28 cursor-pointer rounded-full"
            alt=""
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold text-white md:text-xl">
              {user?.name}
            </h1>
            <div>
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
      <div className="grid basis-4/5  px-3 py-10">
        <AnimatePresence>
          {option === "profile" ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Profile />
            </motion.div>
          ) : option === "order" ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Order />
            </motion.div>
          ) : option === "product" ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Product />
            </motion.div>
          ) : option === "add" ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AddProduct />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShopOrder />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default VendorProfile;
