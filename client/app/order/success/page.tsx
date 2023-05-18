"use client";
import { useRouter, redirect } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'
function Success() {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  useEffect(() => {
    let timeoutId: any = null;
  
    const checkUser = () => {
      if (!isAuthenticated || user === undefined) {
        toast.error('Please login to access this page')
        router.push('/account');
      }
    };
  
    timeoutId = setTimeout(checkUser, 2000);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user, router]);
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = 'loaded';
      window.location.reload();
    }
  }, []);

  return (
    <div className="h-screen">
      <h5 className="mb-14 text-center text-[25px] text-[#000000a1] ">
        Your order is successful 😍
      </h5>
      <br />
      <Link
        href={"/"}
        className="mx-auto flex w-fit items-center justify-center rounded-md bg-green-500 px-3 py-1"
      >
        Home
      </Link>
    </div>
  );
}

export default Success;
