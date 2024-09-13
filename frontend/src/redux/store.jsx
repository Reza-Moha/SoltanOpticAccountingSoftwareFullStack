import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import permissionSlice from "./slices/permissionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    permissionSlice,
  },
});
