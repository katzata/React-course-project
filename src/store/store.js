import { configureStore } from "@reduxjs/toolkit";
import logedInReducer from "./reducers/logedInSlice/logedInSlice";
import cartReducer from "./reducers/cartSlice/cartSlice";

export default configureStore({
    reducer: {
        isLoged: logedInReducer,
        cart: cartReducer
    },
});