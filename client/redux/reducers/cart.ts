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
import { createReducer } from "@reduxjs/toolkit";
interface CartState {
  cart: any
  storage: any
}
// const storedCartItems = localStorage.getItem("cartItems")
// // const initialState = {
  
// //   cart: String(localStorage.getItem("cartItems"))
// //     ? JSON.parse(String(localStorage.getItem("cartItems")))
// //     : [],
// // } as CartState;
// let initialState: CartState;

// if (typeof storedCartItems !== 'undefined' && storedCartItems!== null) {
//   initialState = {
//     cart: Array(storedCartItems)
//       ? JSON.parse(String(storedCartItems))
//       : <any>[],
//   };
// } else {
//   initialState = {
//     cart: <any>[],
//   };
// }
let storage = ''
if (typeof window !== "undefined") {
  storage = localStorage?.getItem("cartItems") || ""
}
const initialState = {
  cart: storage
    ? JSON.parse(String(storage))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i:any) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i:any) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i:any) => i._id !== action.payload),
    };
  },
});
