/* eslint-disable @next/next/no-img-element */

"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from '@/app/assets/346143109_218453740935825_5751210777328414100_n.png';
type Props = {};

function Footer({}: Props) {
  const [show, setShow] = useState(false);
  const list = ["Face", "Body", "Hair", "Makeup"];
  return (
    <footer className="flex w-full flex-col items-start justify-between space-y-5 bg-[#55564E] px-5 py-6 text-lg font-semibold text-[#ECD9C9]">
      <Link href='/' className="text-2xl font-bold">
        <img src={logo.src} alt="logo" className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20" />
      </Link>
      <div className="flex w-full flex-col justify-start gap-5 md:flex-row">
        <div className="space-y-2">
          <h1 className="flex items-center justify-between gap-3">
            NAVIGATION{" "}
            <span
              className="inline-block md:hidden"
              onClick={() => setShow(!show)}
            >
              {!show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              )}
            </span>
          </h1>
          <div className="hidden flex-col gap-1 text-sm font-light md:flex">
            {list.map((list) => (
              <Link href={`/Products/${list}`} key={list}>
                {list}
              </Link>
            ))}
          </div>
          <AnimatePresence>
            {show && (
              <motion.ul
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -100 }}
                className="flex flex-col gap-1 text-sm font-light"
              >
                {list.map((list) => (
                  <Link href={`/Products/${list}`} key={list}>
                    {list}
                  </Link>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <Link href="#">ABOUT US</Link>
        <Link href="#">TERMS & CONDITIONS</Link>
        <Link href="#">PRIVACY POLICY</Link>
      </div>
      <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-center gap-4 py-3 md:justify-start">
        <button className="rounded-lg border-2 border-[#ECD9C9] px-4 py-2">
          HELP CENTER
        </button>
        <button className="rounded-lg border-2 border-[#ECD9C9] px-4 py-2">
          CONTACT US
        </button>
      </div>
      <hr className="w-full border border-[#ECD9C9]" />
      <div className="px-5 py-2 text-xs font-extralight">
        <p>c 2023 LOGO?</p>
      </div>
    </footer>
  );
}

export default Footer;
