import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import roomSlice from "./slices/roomSlice";

export const store = configureStore({
    reducer:{
        userSlice,
        roomSlice
    }
})