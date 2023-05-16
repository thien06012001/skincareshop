"use client";

import { server } from "@/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    getStripeApikey();
  });
  return (
    <section>
        {stripeApikey && 
            <Elements stripe={loadStripe(stripeApikey)}>
                {children}
            </Elements>
        }
    </section>
    )
}
