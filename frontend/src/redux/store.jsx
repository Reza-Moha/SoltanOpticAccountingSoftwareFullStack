import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import permissionSlice from "./slices/permissionSlice";
import rolesSlice from "./slices/rolesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    permissionSlice,
    rolesSlice,
  },
});
