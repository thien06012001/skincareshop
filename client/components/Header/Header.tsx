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
import logo from "../../app/assets/Ivory.png";
import { selectItems } from "@/redux/slices/basketSlice";
type Props = {};

function Header({}: Props) {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSelector(
    (state: any) => state.user
  );
  const items = useSelector(selectItems);
  const { cart } = useSelector((state: any) => state.cart);
  const [show, setShow] = useState(false);
    console.log(cart)
 

  return (
    <header className="sticky top-0 z-50 flex flex-col items-center justify-between gap-5 bg-[#FBF6F6] py-4 pb-0">
      <div className="flex w-full items-center justify-between px-3">
        <Link href="/" className="text-xl font-bold text-[#BBA999]">
          <img
            src={logo.src}
            alt=""
            className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </Link>
        <div className="flex items-center gap-5">
          <SearchBar />
          {show && <CartList setShow={setShow} />}
          <Link className="relative px-2 py-1" href={"/cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 cursor-pointer text-[#BBA999]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {/* {cart && cart!== undefined && (
              <span className="absolute right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#BBA999] text-center text-xs text-[#FBF6F6]">
              {cart?.length}
            </span>
            )} */}
            {items && items!== undefined && (
              <span className="absolute right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#BBA999] text-center text-xs text-[#FBF6F6]">
              {items?.length}
            </span>
            )}
          </Link>

          <div className="relative">
            {user ? (
              <img
                onClick={() => router.push("/profile")}
                src={`${backend_url}${user?.avatar}`}
                className="h-[35px] w-[35px] cursor-pointer rounded-full"
                alt=""
              />
            ) : (
              <BiUser
                className="h-8 w-8 cursor-pointer text-[#BBA999]"
                onClick={() => router.push("/account")}
              />
            )}
          </div>
        </div>
      </div>
      <List />
    </header>
  );
}

export default Header;
