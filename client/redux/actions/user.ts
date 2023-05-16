import axios from "axios";
import { server } from "../../server";
import { Dispatch } from 'redux';
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../store";
// load user
export const loadUser = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error: any) {
    dispatch({
      type: "LoadUserFail",
      payload: error?.response?.data?.message,
    });
  }
};

// Customer update information
export const updateCustomerInformation =
  (email:string, phoneNumber:string, password:string, address:string) => async (dispatch:any) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-customer-info`,
        { 
          email,
          password,
          phoneNumber,
          address
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error:any) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

  // Vendor update information
export const updateVendorInformation =
(email:string, phoneNumber:string, password:string, address:string, shopName:string) => async (dispatch:any) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });

    const { data } = await axios.put(
      `${server}/user/update-vendor-info`,
      { 
        email,
        password,
        phoneNumber,
        address,
        shopName
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error:any) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    });
  }
};

// Shipper update information
export const updateShipperInformation =
(email:any, phoneNumber:any, password:any) => async (dispatch:any) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });

    const { data } = await axios.put(
      `${server}/user/update-shipper-info`,
      { 
        email,
        password,
        phoneNumber,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error:any) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    });
  }
};