"use client";
import { useRouter, redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

function Loading({}: Props) {
  const router = useRouter();
    const { user, isAuthenticated } = useSelector((state: any) => state.user);
  useEffect(() => {
    // setTimeout(function () {
  
    //   router.refresh();
    // }, 1000);
    // setTimeout(function () {
      
    //   router.push("/account");
    // }, 1000);
    if (!window.location.hash) {
      window.location.hash = 'loaded';
      window.location.reload();
    } else {
      if(!isAuthenticated){
        router.push("/account");
      } 
    }
  });

  // if (!isAuthenticated) {
  //   router.push("/");
  // }

  return <div>Redirecting....</div>;
}

export default Loading;
