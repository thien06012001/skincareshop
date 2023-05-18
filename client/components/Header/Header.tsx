/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import SearchBar from "./SearchBar";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import { backend_url } from "@/server";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "@/server";
import List from "../List";
import CartList from "../CartList";
import logo from "../../app/assets/346143109_218453740935825_5751210777328414100_n.png";
import { selectItems } from "@/redux/slices/basketSlice";
import { Quicksand } from "next/font/google";
type Props = {};
const quicksand = Quicksand({ subsets: ["latin"] });
function Header({}: Props) {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSelector(
    (state: any) => state.user
  );
  const items = useSelector(selectItems);
  const { cart } = useSelector((state: any) => state.cart);
  const [show, setShow] = useState(false);

  return (
    <header
      className={`${quicksand.className} sticky top-0 z-50 flex h-[10vh] w-full items-center justify-between bg-[#BBA999] px-3`}
    >
      <Link href="/" className="w-[10%] text-xl font-bold text-[#FAF7F6]">
        <img
          src={logo.src}
          alt="logo"
          className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
      </Link>
      <div className="flex w-[85%] items-center md:w-[75%] md:justify-around lg:w-[65%]">
        <List />
        <SearchBar />
        <div className="ml-auto mr-0 flex w-[35%] justify-around md:mx-0 md:w-[20%]">
          <Link
            className="relative flex items-center justify-center px-2 py-1"
            href={"/cart"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 cursor-pointer text-[#FAF7F6]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {cart && cart !== undefined && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF7F6] text-center text-xs font-medium text-[#BBA999]">
                {cart?.length}
              </span>
            )}
          </Link>

          <div className="relative hidden h-11 w-11 items-center justify-center md:flex">
            {user ? (
              <Link href="/profile">
                <img
                  src={`${backend_url}${user.avatar}`}
                  className="m-auto h-11 w-11 cursor-pointer rounded-full object-cover"
                  alt={user.name}
                />
              </Link>
            ) : (
              <BiUser
                className="m-auto h-12 w-12 cursor-pointer text-[#FAF7F6]"
                onClick={() => router.push("/account")}
              />
            )}
          </div>
          <div className=" flex h-11 w-11 items-center justify-center md:hidden ">
            {user ? (
              <div className="flex flex-col">
                <img
                  src={`${backend_url}${user.avatar}`}
                  className="m-auto h-10 w-10 cursor-pointer rounded-full object-cover md:h-11 md:w-11"
                  alt={user.name}
                  onClick={() => setShow(!show)}
                />
                <AnimatePresence>
                  {show && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CartList setShow={setShow} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <BiUser
                className="m-auto h-12 w-12 cursor-pointer text-[#FAF7F6]"
                onClick={() => router.push("/account")}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
