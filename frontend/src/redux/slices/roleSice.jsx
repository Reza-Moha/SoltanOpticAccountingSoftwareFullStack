import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPermissionApi,
  createNewPermissionApi,
  updatePermissionApi,
  deletePermissionByIdApi,
  createNewRoleApi,
} from "@/services/admin/admin.service";
import toast from "react-hot-toast";

export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllPermissionApi();
      return data.allPermission;
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

const roleSlice = createSlice({
  name: "role",
  initialState: {
    roleList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roleList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createNewRole.fulfilled, (state, action) => {
        state.roleList.push(action.payload);
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roleList.findIndex(
          (per) => per.id === action.payload.id
        );
        if (index !== -1) {
          state.roleList[index] = action.payload;
        }
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roleList = state.roleList.filter(
          (per) => per.id !== action.payload
        );
      });
  },
});

export default roleSlice.reducer;
