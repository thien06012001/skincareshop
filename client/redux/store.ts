import { configureStore} from '@reduxjs/toolkit'
import { userReducer } from "./reducers/user";
import { productReducer } from './reducers/product';
import { cartReducer } from './reducers/cart';
import { orderReducer } from './reducers/order';

const Store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch
export default Store;