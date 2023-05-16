"use client";
import LoginForm from "@/components/Login/LoginForm";
import RegisterForm from "@/components/Register/RegisterForm";
import React from "react";
import { redirect,useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
type Props = {};
type Form = "Login" | "Register";
function AccountPage({}: Props) {
  const [form, setForm] = useState<Form>("Login");
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const router = useRouter()
  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <div className="background relative flex h-screen w-full items-center justify-center bg-cover bg-no-repeat px-3 ">
      <div className="absolute top-5 left-5" onClick={() => router.push('/')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-10 w-10 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="form-background m-auto flex min-h-fit w-[70%] min-w-fit flex-col space-y-8 rounded-3xl pb-5 shadow-lg shadow-black">
        <>{form === "Login" ? <LoginForm /> : <RegisterForm />}</>
        <button
          className="mx-auto -mt-10 w-fit basis-1/4 px-4 text-center text-lg font-medium tracking-wide text-[#55564E] underline underline-offset-4 lg:mt-3"
          onClick={() => {
            if (form === "Register") {
              setForm("Login");
            } else {
              setForm("Register");
            }
          }}
        >
          {form === "Login"
            ? "Not a member yet? Register  "
            : "Already a member? Sign in "}
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
