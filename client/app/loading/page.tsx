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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

function Loading({}: Props) {
  const router = useRouter();
    const { user, isAuthenticated } = useSelector((state: any) => state.user);
  useEffect(() => {

    if (!window.location.hash) {
      window.location.hash = 'loaded';
      window.location.reload();
    } else {
      if(!isAuthenticated){
        router.push("/account");
      } 
      else if(isAuthenticated){
        router.push("/");
      } 
    }
  });



  return <div className="h-full">Redirecting....</div>;
}

export default Loading;
