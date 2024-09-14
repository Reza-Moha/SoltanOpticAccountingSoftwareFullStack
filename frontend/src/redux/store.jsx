import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import permissionSlice from "./slices/permissionSlice";
import roleSice from "./slices/roleSice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    permissionSlice,
    roleSice,
  },
});
