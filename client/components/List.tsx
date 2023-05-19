'use client'
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
    <ul className={`font-medium md:flex hidden w-[40%] items-center justify-around gap-4 bg-[#BBA999] text-[#FAF7F6] ${quicksand.className}`}>
      {list.map((list) => (
        <Link className="group flex flex-col justify-center items-center md:w-fit" href={`/Products/${list}`} key={list}>
          {list}
          <div className={`h-[2px]  bg-[#FAF7F6] transition-all duration-300 ${params.category === list ?'w-full' :'w-0 group-hover:w-full'}`} />
        </Link>
      ))}
    </ul>
  );
}

export default List;
