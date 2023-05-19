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
import { configureStore} from '@reduxjs/toolkit'
import { userReducer } from "./reducers/user";
import { productReducer } from './reducers/product';
import { cartReducer } from './reducers/cart';
import { orderReducer } from './reducers/order';
import basketReducer from './slices/basketSlice'
const Store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
        basket: basketReducer,
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch
export default Store;