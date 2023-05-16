"use client";
import { useRouter, redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

function Loading({}: Props) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(function () {
        // window.location.reload();
        router.refresh();

    }, 1000);
    setTimeout(function () {
      // window.location.reload();
      router.push('/account');
      
  }, 1000);
  });
  
  // if (!isAuthenticated) {
  //   router.push("/");
  // }

  return <div>Redirecting....</div>;
}

export default Loading;
