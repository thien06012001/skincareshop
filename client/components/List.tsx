'use client'
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import {Quicksand} from 'next/font/google'
type Props = {};
const quicksand = Quicksand({subsets:['latin']})

function List({}: Props) {
  const list = ["All", "Face", "Body", "Hair", "Makeup"];
  const params = useParams()
  return (
    <div className={`font-medium md:flex hidden w-[40%] items-center justify-around gap-4 bg-[#BBA999] text-[#FAF7F6] ${quicksand.className}`}>
      {list.map((list) => (
        <Link className="group flex flex-col justify-center items-center md:w-fit" href={`/Products/${list}`} key={list}>
          {list}
          <div className={`h-[2px]  bg-[#FAF7F6] transition-all duration-300 ${params.category === list ?'w-full' :'w-0 group-hover:w-full'}`} />
        </Link>
      ))}
    </div>
  );
}

export default List;
