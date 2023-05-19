"use client";
import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useRouter, redirect } from "next/navigation";
import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import styles from "@/styles/styles";
type Props = {};
interface Order {
  cart: any;
  shippingAddress: any;
  hub: any;
  totalPrice: any;
  ordererInfo: any;
  paymentInfo: {
    id?: any;
    status?: any;
    type: any;
  };
}

function PaymentPage({}: Props) {
  const router = useRouter();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder") || "null");
    setOrderData(orderData);
  }, []);
  useEffect(() => {
    let timeoutId: any = null;

    const checkUser = () => {
      if (!isAuthenticated || user === undefined) {
        toast.error("Please login to access this page");
        router.push("/account");
      }
    };

    timeoutId = setTimeout(checkUser, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user, router]);
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Order",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: any) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    hub: orderData?.hub,
    totalPrice: orderData?.totalPrice,
    ordererInfo: orderData?.ordererInfo,
    paymentInfo: orderData?.paymentInfo,
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        toast.success("Order successful!");
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
        }

        router.push("/order/success");
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e: any) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      const cardElement = elements?.getElement(CardNumberElement);
      if (!stripe || !elements || !cardElement) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              router.push("/order/success");
              toast.success("Order successful!");
              if (typeof window !== "undefined") {
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
              }
            });
        }
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e: any) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        router.push("/order/success");
        toast.success("Order successful!");
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
        }

        // window.location.reload();
      });
  };

  return (
    <div>
      <CheckoutSteps active={2} />
      <div className="flex w-full flex-col items-center py-8">
        <div className="w-[90%]">
          <div className=" mx-auto w-full">
            <PaymentInfo
              user={user}
              open={open}
              setOpen={setOpen}
              onApprove={onApprove}
              createOrder={createOrder}
              paymentHandler={paymentHandler}
              cashOnDeliveryHandler={cashOnDeliveryHandler}
            />
          </div>
          {/* <div className=" mt-8 w-full">
            <CartData orderData={orderData} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}: any) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="800px:w-[95%] w-full rounded-md bg-[#F0E4DB] p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="mb-2 flex w-full border-b pb-5">
          <div
            className="relative flex h-[25px] w-[25px] items-center justify-center rounded-full border-[3px] border-[#1d1a1ab4] bg-transparent"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="h-[13px] w-[13px] rounded-full bg-[#1d1a1acb]" />
            ) : null}
          </div>
          <h4 className="pl-2 text-[18px] font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="flex w-full border-b">
            <form className="w-full text-[#2C2C2C]" onSubmit={paymentHandler}>
              <div className="flex w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2 font-light">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`w-[80%] border-b border-[#BBA999] py-3 text-[#444] outline-none`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2 font-light">Exp Date</label>
                  <CardExpiryElement
                    className={`w-[80%] border-b border-[#BBA999] py-3`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: "1.5",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2 font-light">Card Number</label>
                  <CardNumberElement
                    className={`w-[80%] border-b border-[#BBA999] py-3`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: "1.5",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2 font-light">CVV</label>
                  <CardCvcElement
                    className={`w-[80%] border-b border-[#BBA999] py-3`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: "1.5",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Order"
                className={`cursor-pointer rounded-md bg-[#DDB7AC] px-6 py-2 font-bold text-[#55564E]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="mb-2 flex w-full border-b pb-5">
          <div
            className="relative flex h-[25px] w-[25px] items-center justify-center rounded-full border-[3px] border-[#1d1a1ab4] bg-transparent"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="h-[13px] w-[13px] rounded-full bg-[#1d1a1acb]" />
            ) : null}
          </div>
          <h4 className="pl-2 text-[18px] font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="flex w-full border-b">
            <input
              type="submit"
              value="Order"
              onClick={() => setOpen(true)}
              className={`cursor-pointer rounded-md bg-[#DDB7AC] px-6 py-2 font-bold text-[#55564E]`}
            />
            {open && (
              <div className="fixed left-0 top-0 z-[99999] flex h-screen w-full items-center justify-center bg-[#00000039]">
                <div className="800px:w-[40%] 800px:h-[80vh] relative flex h-screen w-full flex-col justify-center overflow-y-scroll rounded-[5px] bg-white p-8 shadow">
                  <div className="flex w-full justify-end p-3">
                    <RxCross1
                      size={30}
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="mb-2 flex w-full border-b pb-5">
          <div
            className="relative flex h-[25px] w-[25px] items-center justify-center rounded-full border-[3px] border-[#1d1a1ab4] bg-transparent"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="h-[13px] w-[13px] rounded-full bg-[#1d1a1acb]" />
            ) : null}
          </div>
          <h4 className="pl-2 text-[18px] font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="flex w-full">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Order"
                className={`cursor-pointer rounded-md bg-[#DDB7AC] px-6 py-2 font-bold text-[#55564E]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
// const CartData = ({ orderData }: any) => {
//   const shipping = orderData?.shipping?.toFixed(2);
//   return (
//     <div className="w-full rounded-md bg-[#fff] p-5 pb-8">
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
//         <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
//         <h5 className="text-[18px] font-[600]">${shipping}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between border-b pb-3">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
//         <h5 className="text-[18px] font-[600]">
//           {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
//         </h5>
//       </div>
//       <h5 className="pt-3 text-end text-[18px] font-[600]">
//         ${orderData?.totalPrice}
//       </h5>
//       <br />
//     </div>
//   );
// };
export default PaymentPage;
