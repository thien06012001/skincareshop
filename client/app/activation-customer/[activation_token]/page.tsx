"use client";
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
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { server } from "../../../server";

import { useParams } from "next/navigation";
type Props = {
  params: {
    activation_token: string;
  };
};
function ActivatePage({ params: { activation_token } }: Props) {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation-customer`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}

export default ActivatePage;
