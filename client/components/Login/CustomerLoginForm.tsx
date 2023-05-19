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
import { server } from "@/server";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {};

function CustomerLoginForm({}: Props) {
  const navigate = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state: any) => state.user);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-customer`,
        {
          name,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        navigate.push("/");
        toast.success("Login Success!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-around gap-5"
    >
      <input
        className="border-b-2 border-b-[#55564E] bg-transparent px-5 py-3 text-base placeholder:font-medium placeholder:text-[#55564E] focus:outline-none sm:text-lg md:text-xl"
        type="text"
        name=""
        placeholder="Username"
        autoComplete="username"
        id=""
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="relative">
        <input
          className="border-b-2 border-b-[#55564E] bg-transparent px-5 py-2 text-base placeholder:font-medium placeholder:text-[#55564E] focus:outline-none sm:text-lg md:text-xl"
          type={visible ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {visible ? (
          <AiOutlineEye
            className="absolute right-2 top-2 cursor-pointer text-[#55564E]"
            size={25}
            onClick={() => setVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="absolute right-2 top-2 cursor-pointer text-[#55564E]"
            size={25}
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      <button
        disabled={isLoading}
        className={`mt-5 bg-transparent px-5 py-2 text-xl font-bold text-[#55564E] transition-all duration-300 md:text-2xl lg:text-3xl ${
          isLoading ? "" : "btn-effect"
        }`}
        type="submit"
      >
        {isLoading ? (
          <div className="flex items-center justify-center" role="status">
            <svg
              aria-hidden="true"
              className="mx-auto mr-2 h-12 w-12 animate-spin fill-[#55564E] text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          "LOGIN"
        )}
      </button>
    </form>
  );
}

export default CustomerLoginForm;
