'use client'
import { useRouter,redirect } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
function Success() {
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  setTimeout(() => {
    if (!isAuthenticated || user === undefined) {
      redirect("/account");
    }
  }, 2000);
  return (
    <div className="h-screen">
      <h5 className="mb-14 text-center text-[25px] text-[#000000a1] ">
        Your order is successful 😍
      </h5>
      <br />
      <Link href={'/'} className="flex items-center justify-center px-3 py-1 bg-green-500 w-fit rounded-md mx-auto">
        Home
     </Link>
    </div>
  );
}

export default Success;
