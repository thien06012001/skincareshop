import { createReducer } from "@reduxjs/toolkit";
interface OrderState {
  isLoading: boolean,
  orders: any,
  shopOrders: any,
  shopOrderLoading:any,
  error:any, 
  shipperOrderLoading: any,
  shipperOrders: any
}
const initialState = {
  isLoading: true,
} as OrderState;

export const orderReducer = createReducer(initialState, {
  // get all orders of user
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  // get all orders of shop
  getAllOrdersShopRequest: (state) => {
    state.shopOrderLoading = true;
  },
  getAllOrdersShopSuccess: (state, action) => {
    state.shopOrderLoading = false;
    state.shopOrders = action.payload;
  },
  getAllOrdersShopFailed: (state, action) => {
    state.shopOrderLoading = false;
    state.error = action.payload;
  },

  // get all orders for shipper
  shipperAllOrdersRequest: (state) => {
    state.shipperOrderLoading = true;
  },
  shipperAllOrdersSuccess: (state, action) => {
    state.shipperOrderLoading = false;
    state.shipperOrders = action.payload;
  },
  shipperAllOrdersFailed: (state, action) => {
    state.shipperOrderLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
