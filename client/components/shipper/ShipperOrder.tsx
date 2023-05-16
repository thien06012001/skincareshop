"use client";
import React from "react";
import { useSelector } from "react-redux";

function ShipperOrder() {
  const { shipperOrders, shipperOrderLoading } = useSelector(
    (state: any) => state.order
  );
  const { user } = useSelector((state: any) => state.user);
  console.log(shipperOrders.filter((order: any) => order.hub === user.hub)[0]);
  console.log(user);
  return (
    <div>
      <h1 className="text-xl font-bold">
        ACTIVE
      </h1>
      <h1 className="font-light px-3"> Distribution hub: {user.hub}</h1>

      {shipperOrders &&
        shipperOrders
          .filter((order: any) => order.hub === user.hub)
          .map((order: any) => (
            <div className="bg-white" key={order._id}>
              <div>{order.status}</div>
            </div>
          ))}
    </div>
  );
}

export default ShipperOrder;
