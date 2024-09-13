import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import basicDefinitionsSlice from "./slices/basicDefinitionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    basicDefinitions: basicDefinitionsSlice,
  },
});
