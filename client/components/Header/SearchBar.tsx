/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { Quicksand } from "next/font/google";
type Props = {};
const quicksand = Quicksand({ subsets: ["latin"] });
function SearchBar({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>(null);
  const { allProducts } = useSelector((state: any) => state.products);
  const [active, setActive] = useState(false);
  const handleSearchChange = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product: any) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  console.log(active);
  return (
    <form
      // tabIndex={0}
      // onBlur={() => setActive(false)}
      className="relative ml-auto w-[60%] md:mx-0 md:w-[40%]"
    >
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setActive(true)}
        type="text"
        onBlur={() =>
          setTimeout(() => {
            setActive(false);
          }, 100)
        }
        className={`border-b-2 ${quicksand.className} w-full border-[#FAF7F6] bg-transparent py-2 text-[#FAF7F6] placeholder:text-[#FAF7F6] focus:outline-none`}
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="absolute right-2 top-2 h-6 w-6 cursor-pointer text-[#FAF7F6]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      {searchData && searchTerm !== "" && active === true ? (
        <div className="absolute left-0 z-10 w-full bg-[#fff] shadow">
          {/* <button className="w-full flex justify-end items-center p-3" onClick={() => setActive(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
          {searchData &&
            searchData.map((i: any) => {
              return (
                <Link
                  className="flex items-center justify-around"
                  key={i._id}
                  href={`/product/${i._id}`}
                >
                  <img
                    src={`${backend_url}${i.image}`}
                    alt={i.name}
                    className="mr-2 h-[100px] w-[100px] object-fill"
                  />
                  <h5 className="w-full h-full">{i.name}</h5>
                </Link>
              );
            })}
        </div>
      ) : null}
    </form>
  );
}

export default SearchBar;
