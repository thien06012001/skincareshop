import Link from "next/link";
import React from "react";

type Props = {};

function List({}: Props) {
  const list = ["Face", "Body", "Hair", "Makeup"];
  return (
    <ul className="md:flex max-w-sm w-[40%] hidden items-center justify-around gap-4 bg-[#BBA999] py-2 text-[#FAF7F6] font-medium">
      {list.map((list) => (
        <Link className="group flex flex-col justify-center items-center text-base" href={`/category/${list}`} key={list}>
          {list}
          <div className="h-[2px] w-0 group-hover:w-full bg-[#FAF7F6] transition-all duration-300" />
        </Link>
      ))}
    </ul>
  );
}

export default List;
