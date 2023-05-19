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
