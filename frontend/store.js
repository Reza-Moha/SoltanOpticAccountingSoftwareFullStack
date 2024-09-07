import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/auth/auth.slice";

const store = configureStore({
  reducer: {
    authSlice,
  },
});

export default store;
