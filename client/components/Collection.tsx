import React from "react";
import Image from "next/image";
import collection from "../app/assets/homepage_springcollection.png";
import Link from "next/link";
type Props = {};

function Collection({}: Props) {
  return (
    <div className="grid w-full items-center justify-center gap-5 px-4 pb-12 sm:pb-16 md:grid-cols-2 md:pb-24 ">
      <div className="flex items-center justify-end">
        <Image src={collection} alt="collection" width={300} height={250} />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-[#2C2C2C] sm:text-2xl md:text-3xl lg:text-4xl">
          SPRING <br /> COLLECTION
        </h1>
        <p className="max-w-xs">
          Spring is coming! Dont miss an extra 10% promo code.
        </p>
        <Link
          href="#"
          className="flex w-fit items-center justify-center rounded-md border border-[#0C110D] px-7 py-1 uppercase mt-5 mx-auto md:mx-0 md:mt-12"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default Collection;
