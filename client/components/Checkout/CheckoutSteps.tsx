import React from "react";
import styles from "@/styles/styles";
function CheckoutSteps({ active }: any) {
  return (
    <div className="my-3 flex w-full justify-center items-center gap-4">
      <div
        className={`rounded-md font-bold ${
          active > 1
            ? "text-[#2C2C2C]"
            : "bg-[#DDB7AC] px-5 py-1 text-[#55564E]"
        } `}
      >
        1. Address
      </div>
      <div
        className={`rounded-md font-bold ${
          active > 1
            ? " bg-[#DDB7AC] text-[#55564E] px-5 py-1 "
            : "text-[#2C2C2C]"
        } `}
      >
        2. Payment
      </div>
      {/* <div
        className={`rounded-md font-bold ${
          active > 2
            ? "bg-[#DDB7AC] px-5 py-1 text-[#55564E]"
            : "text-[#2C2C2C]"
        } `}
      >
        3. Success
      </div> */}
    </div>
  );
}

export default CheckoutSteps;
