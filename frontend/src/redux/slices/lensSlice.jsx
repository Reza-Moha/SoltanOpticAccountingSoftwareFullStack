import {
  createNewRefractiveIndexApi,
  deleteEmployeeByIdApi,
  getAllRefractiveIndexApi,
  updateRefractiveIndexApi,
} from "@/services/admin/admin.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

export const fetchAllRefractiveIndex = createAsyncThunk(
  "lens/fetchRefractive",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllRefractiveIndexApi();
      return data.allRefractiveIndex;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewRefractiveIndex = createAsyncThunk(
  "lens/createReflactiveIndex",
  async (values, { rejectWithValue }) => {
    try {
      const newRefractive = await createNewRefractiveIndexApi(values);
      if (newRefractive.statusCode === 201) {
        toast.success(newRefractive.message);
        return newRefractive.newIndex;
      }
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data.message);
      return rejectWithValue(data);
    }
  }
);

export const deleteRefractiveIndex = createAsyncThunk(
  "lens/deleteRefractiveIndex",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteEmployeeByIdApi(id);
      toast.success(data.message);
      return id;
    } catch (error) {
      const errors = error?.response?.data?.errors;
      toast.error(errors.message);
      return rejectWithValue(errors);
    }
  }
);

export const updateRefractiveindex = createAsyncThunk(
  "lens/updateRefractiveIndex",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const data = await updateRefractiveIndexApi(id, values);
      toast.success(data.message);
      return data.updatedRefractiveIndex;
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data.message);
      return rejectWithValue(data);
    }
  }
);

const lensSlice = createSlice({
  name: "lens",
  initialState: {
    lensList: [],
    refractiveIndexList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRefractiveIndex.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllRefractiveIndex.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createNewRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList.push(action.payload);
      })

      .addCase(updateRefractiveindex.fulfilled, (state, action) => {
        const index = state.refractiveIndexList.findIndex(
          (ref) => ref.id === action.payload.id
        );
        if (index !== -1) {
          state.refractiveIndexList[index] = action.payload;
        }
      })

      .addCase(deleteRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList = state.refractiveIndexList.filter(
          (ref) => ref.id !== action.payload
        );
      });
  },
});

export default lensSlice.reducer;
