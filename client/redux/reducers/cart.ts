import { createReducer } from "@reduxjs/toolkit";
interface CartState {
  cart: any[]

}
// const storedCartItems = String(localStorage.getItem("cartItems"))
// const initialState = {
  
//   cart: String(localStorage.getItem("cartItems"))
//     ? JSON.parse(String(localStorage.getItem("cartItems")))
//     : [],
// } as CartState;
let initialState: CartState;

if (typeof localStorage !== 'undefined') {
  initialState = {
    cart: String(localStorage.getItem('cartItems'))
      ? JSON.parse(String(localStorage.getItem('cartItems')))
      : [],
  };
} else {
  initialState = {
    cart: [],
  };
}
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
