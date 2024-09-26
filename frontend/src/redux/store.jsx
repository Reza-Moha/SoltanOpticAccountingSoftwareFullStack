import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import permissionSlice from "./slices/permissionSlice";
import rolesSlice from "./slices/rolesSlice";
import employeeSlice from "./slices/employee.slice";
import doctorsSlice from "./slices/doctors.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    permissionSlice,
    rolesSlice,
    employeeSlice,
    doctorsSlice,
  },
});
