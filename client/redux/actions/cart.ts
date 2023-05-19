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
// add to cart
export const addTocart = (data: any) => async (dispatch: any, getState: any) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));

  }
  return data;
};

// remove from cart
export const removeFromCart = (data: any) => async (dispatch: any, getState: any) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));

  }
  return data;
};
