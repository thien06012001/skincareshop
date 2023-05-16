"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { server } from "../../server";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { VscTriangleRight } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";
import { hubs } from "@/static/data";
type Props = {};
type location = "Ho Chi Minh" | "Hue" | "Ha Noi";
function ShipperRegisterForm({}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hub, setHub] = useState("");
  const [show, setShow] = useState(false);
  const buttonList = ["Ha Noi", "Quang Tri", "Ba Ria-Vung Tau", " Ho Chi Minh"];

  const role = "shipper";
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      toast.error(
        "Username must contain only letters (lower and upper case) and digits."
      );
      setIsLoading(false);
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/.test(
        password
      )
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character from the set !@#$%^&*, and must not contain any other characters"
      );
      setIsLoading(false);
      return;
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    if (avatar) {
      newForm.append("file", avatar);
    }
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("role", role);
    newForm.append("hub", hub);
    axios
      .post(`${server}/user/create-shipper`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setHub("Ho Chi Minh");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <form
      className="flex w-full flex-col gap-4 space-y-0 px-0 md:space-y-2 lg:space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="grid items-center justify-center md:grid-cols-2">
        <div className="flex w-full flex-col items-center justify-center">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              className="h-20 w-20 rounded-full object-cover md:h-52 md:w-52"
            />
          ) : (
            <FaUserCircle className="h-20 w-20 text-[#55564E] md:h-52 md:w-52" />
          )}
          <label
            htmlFor="file-input"
            className="btn-effect mt-1 flex cursor-pointer items-center justify-center bg-transparent px-4 py-2 font-medium text-gray-700 md:mt-2 lg:mt-4"
          >
            <span className="text-base tracking-wider text-[#55564E] sm:text-lg md:text-xl">
              Upload your Profile
            </span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              className="sr-only"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
        <div className="flex flex-col gap-6 px-5">
          <input
            type="text"
            name="text"
            autoComplete="name"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-[#55564E] bg-transparent px-3 py-2 placeholder:tracking-wider placeholder:text-[#55564E] valid:bg-transparent focus:outline-none"
          />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-[#55564E] bg-transparent px-3 py-2 placeholder:tracking-wider placeholder:text-[#55564E] focus:bg-transparent focus:outline-none"
          />
          <div className=" relative">
            <input
              type={visible ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-[#55564E] bg-transparent px-3 py-2 placeholder:tracking-wider placeholder:text-[#55564E] focus:outline-none"
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
          <div className=" relative">
            <select
              name="hub"
              autoComplete="hub"
              placeholder="Choose Location"
              required
              value={hub}
              onChange={(e) => setHub(e.target.value)}
              className="w-full border-b-2 border-[#55564E] bg-transparent px-3 py-2 placeholder:tracking-wider placeholder:text-[#55564E] focus:bg-transparent focus:outline-none"
            >
              <option value="" className="block border pb-2">
                Choose your distribution hub
              </option>
              {hubs.map((hub) => (
                <option
                  key={hub.id}
                  value={hub.value}
                  className="bg-transparent text-[#55564E]"
                >
                  {hub.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className={`mx-auto w-fit bg-transparent px-4 py-2 text-lg font-bold uppercase text-[#55564E] disabled:hover:shadow-none md:text-xl lg:text-2xl ${
          isLoading ? "" : "btn-effect"
        }`}
      >
        {isLoading ? (
          <div
            className="flex w-fit items-center justify-center tracking-widest"
            role="status"
          >
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
          "REGISTER"
        )}
      </button>
    </form>
  );
}

export default ShipperRegisterForm;
