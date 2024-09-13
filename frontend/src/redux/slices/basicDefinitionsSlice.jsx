import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPermissionApi,
  createNewPermissionApi,
  updatePermissionApi,
  deletePermissionByIdApi,
} from "@/services/admin/admin.service";
import toast from "react-hot-toast";

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllPermissionApi();
      return data.allPermission;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPermission = createAsyncThunk(
  "permissions/createPermission",
  async (values, { rejectWithValue }) => {
    try {
      const data = await createNewPermissionApi(values);
      toast.success(data.message);
      return data.permission;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePermission = createAsyncThunk(
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

export const deletePermission = createAsyncThunk(
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

const basicDefinitionSlice = createSlice({
  name: "permissions",
  initialState: {
    permissionsList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissionsList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissionsList.push(action.payload);
      })

      .addCase(updatePermission.fulfilled, (state, action) => {
        const index = state.permissionsList.findIndex(
          (per) => per.id === action.payload.id
        );
        if (index !== -1) {
          state.permissionsList[index] = action.payload;
        }
      })

      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissionsList = state.permissionsList.filter(
          (per) => per.id !== action.payload
        );
      });
  },
});

export default basicDefinitionSlice.reducer;
