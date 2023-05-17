import Link from "next/link";
import React from "react";

type Props = {};

function List({}: Props) {
  const list = ["Face", "Body", "Hair", "Makeup"];
  return (
    <ul className="md:flex w-full hidden items-center justify-evenly gap-4 bg-[#BBA999] px-5 py-3 text-[#FAF7F6] font-medium">
      {list.map((list) => (
        <Link href={`/category/${list}`} key={list}>
          {list}
        </Link>
      ))}
    </ul>
  );
}

export default List;
