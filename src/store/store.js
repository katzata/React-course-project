import { configureStore } from "@reduxjs/toolkit";
import logedInReducer from "./reducers/logedInSlice/logedInSlice";

export default configureStore({
    reducer: {
        isLoged: logedInReducer,
    },
});