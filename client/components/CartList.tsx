/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import product from "../app/assets/product.png";
import { useSelector } from "react-redux";
import { backend_url } from "@/server";
import { useAppDispatch } from "@/redux/hook";
import { addTocart, removeFromCart } from "@/redux/actions/cart";
import { RxCross1 } from "react-icons/rx";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
type Props = {
  setShown: () => void;
};

function CartList({ setShow }: any) {
  const { cart } = useSelector((state: any) => state.cart);
  // const [value, setValue] = useState([cart].qty);
  const dispatch = useAppDispatch();
  const removeFromCartHandler = (data: any) => {
    dispatch(removeFromCart(data));
  };
  console.log(cart)
  const totalPrice = cart.reduce(
    (acc: any, item: any) => acc + item.qty * item.price,
    0
  );

  const increment = (data: any) => {
    // setValue(value + 1);
    const updateCartData = { ...data, qty: data.qty + 1 };
    quantityChangeHandler(updateCartData);
    console.log(data)
  };
  const quantityChangeHandler = (data: any) => {
    dispatch(addTocart(data));
  };
  const decrement = (data: any) => {
  
    const updateCartData = { ...data, qty: data.qty === 1 ? 1 : data.qty - 1 };
    quantityChangeHandler(updateCartData);
  };
  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-[#0000004b]">
      <div className=" fixed right-0 top-0 flex h-full w-full lg:w-[30%] flex-col justify-between overflow-y-scroll bg-white shadow-sm">
            {cart && cart.length === 0 ? (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="fixed right-3 top-3 flex w-full justify-end pr-5 pt-5">
                <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setShow(false)}
                />
                </div>
                <h5>Cart Items is empty!</h5>
            </div>
            ) : (
            <>
            <div>
              <div className="flex w-full justify-end pr-5 pt-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShow(false)}
                />
              </div>
              {/* Item length */}
              <div className={`p-4`}>
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i: any) => (
                    <div key={i._id} className="border-b p-4">
                      <div className="flex w-full items-center">
                        <div>
                          <div
                            className={`h-[25px]justify-center w-[25px] cursor-pointer rounded-full border border-[#e4434373] bg-[#e44343]`}
                            onClick={() => increment(i)}
                          >
                            <HiPlus size={18} color="#fff" />
                          </div>
                          <span className="pl-[10px]">{i.qty}</span>
                          <div
                            className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full bg-[#a7abb14f]"
                            onClick={() => decrement(i)}
                          >
                            <HiOutlineMinus size={16} color="#7d879c" />
                          </div>
                        </div>
                        <img
                          src={`${backend_url}${i.image}`}
                          alt=""
                          className="ml-2 mr-2 h-min w-[130px] rounded-[5px]"
                        />
                        <div className="pl-[5px]">
                          <h1>{i.name}</h1>
                          {/* <h4 className="text-[15px] font-[400] text-[#00000082]">
                            
                          </h4> */}
                          <h4 className="font-Roboto pt-[3px] text-[17px] font-[600] text-[#d02222]">
                          ${i.price * i.qty} 
                          </h4>
                        </div>
                        <RxCross1
                          className="cursor-pointer"
                          onClick={() => removeFromCartHandler(i)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <button className="h-[45px] flex items-center justify-center w-[30%] bg-[#e44343] rounded-[5px]">Check out(${totalPrice})</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartList;
