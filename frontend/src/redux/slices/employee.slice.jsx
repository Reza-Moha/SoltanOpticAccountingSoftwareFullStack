import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateRolesApi,
  createNewEmployeeApi,
  getAllEmployeeApi,
  deleteEmployeeByIdApi,
} from "@/services/admin/admin.service";
import toast from "react-hot-toast";

export const fetchAllEmployees = createAsyncThunk(
  "employee/fetchEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEmployeeApi();
      return data.allEmployee;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (values, { rejectWithValue }) => {
    try {
      const newEmployee = await createNewEmployeeApi(values);
      if (newEmployee.statusCode === 201) {
        toast.success(newEmployee.message);
        return newEmployee.newEmployee;
      }
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data.message);
      return rejectWithValue(data);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const data = await updateRolesApi(id, values);
      toast.success(data.message);
      return data.updatedRole;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteEmployeeByIdApi(id);
      toast.success(data.message);
      return id;
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data.message);
      return rejectWithValue(data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.employeeList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createNewEmployee.fulfilled, (state, action) => {
        state.employeeList.push(action.payload);
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.rolesList.findIndex(
          (role) => role.id === action.payload.id
        );
        if (index !== -1) {
          state.rolesList[index] = action.payload;
        }
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.rolesList = state.employeeList.filter(
          (per) => per.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
