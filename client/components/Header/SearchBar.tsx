/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
type Props = {};

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
  useEffect(() => {
    // setActive(false);
  });
  return (
    <form className="relative ml-auto mr:0 md:mx-0 w-[50%] md:w-[30%]">
    
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        type="text"
        className="border-b-2 w-full border-[#FAF7F6] bg-transparent py-2 text-[#FAF7F6] placeholder:text-[#FAF7F6] focus:outline-none"
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
        <div className="absolute left-0 z-10 w-full bg-[#fff] p-3 shadow">
          {searchData.map((i: any) => {
            return (
              <Link key={i._id} href={`/product/${i._id}`}>
                <div className="flex items-center">
                  <img
                    src={`${backend_url}${i.image}`}
                    alt={i.name}
                    className="mr-2 w-[30%]"
                  />
                  <h5>{i.name}</h5>
                  
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </form>
  );
}

export default SearchBar;
