// add to wishlist
// 
export const addToWishlist = (data:any) => async (dispatch:any, getState:any) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });
  if (typeof window !== undefined) {
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));

    }
    return data;
  };
  
  // remove from wishlist
  export const removeFromWishlist = (data:any) => async (dispatch:any, getState:any) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data._id,
    });
    if(typeof window !== undefined) {
      localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));

    }
    return data;
  };
  