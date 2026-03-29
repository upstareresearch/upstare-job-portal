import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/Reducers/userSlice";

export const store = configureStore({
    reducer:{
        user: userSlice
    }
});