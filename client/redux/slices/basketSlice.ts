
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  items: <any>[],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // state.items = [...state.items, action.payload]
      const item = action.payload;
      const isItemExist = state.items.find((i: any) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          items: state.items.map((i: any) => (i._id === isItemExist._id ? item : i)),
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }
    },
    removeFromBasket: (state, action) => {
      // const index = state.items.findIndex(
      //   (basketItem: any) => basketItem.id === action.payload.id
      // )
      // let newBasket = [...state.items]
      // state.items = newBasket
      // if (index >= 0) {
      //   // If the item exists in the basket then remove it
      //   newBasket.splice(index, 1)
      // } else {
      //   console.warn(
      //     `Can't remove product (id: ${action.payload.id}) as its not in basket`
      //   )
      // }
      return {
        ...state,
        cart: state.items.filter((i:any) => i._id !== action.payload),
      };

    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) =>
  state.basket.items.reduce((total: any, item: any) => total + item.price, 0)

export default basketSlice.reducer;
