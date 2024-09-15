import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updatePermissionApi,
  deletePermissionByIdApi,
  createNewRoleApi,
  getAllRoleApi,
} from "@/services/admin/admin.service";
import toast from "react-hot-toast";

export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllRoleApi();
      return data.allRole;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewRole = createAsyncThunk(
  "role/createPermission",
  async (values, { rejectWithValue }) => {
    try {
      const data = await createNewRoleApi(values);
      toast.success(data.message);
      return data.role;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  "permissions/updatePermission",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const data = await updatePermissionApi(id, values);
      toast.success(data.message);
      console.log(data);

      return data.permission;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "permissions/deletePermission",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deletePermissionByIdApi(id);
      toast.success(data.message);
      return id;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const rolesSlice = createSlice({
  name: "role",
  initialState: {
    rolesList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.rolesList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createNewRole.fulfilled, (state, action) => {
        state.rolesList.push(action.payload);
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.rolesList.findIndex(
          (role) => role.id === action.payload.id
        );
        if (index !== -1) {
          state.rolesList[index] = action.payload;
        }
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.rolesList = state.rolesList.filter(
          (per) => per.id !== action.payload
        );
      });
  },
});

export default rolesSlice.reducer;
