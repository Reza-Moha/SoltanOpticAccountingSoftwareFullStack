import {
  createNewLensTypeApi,
  createNewRefractiveIndexApi,
  deleteLensTypeById,
  deleteRefractiveIndexByIdApi,
  getAllLensTypeApi,
  getAllRefractiveIndexApi,
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
      const data = await deleteRefractiveIndexByIdApi(id);
      toast.success(data.message);
      return id;
    } catch (error) {
      const errors = error?.response?.data?.errors;
      toast.error(errors.message);
      return rejectWithValue(errors);
    }
  }
);

export const fetchAllLensType = createAsyncThunk(
  "lens/fetchLensType",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllLensTypeApi();
      return data.allLensType;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewLensType = createAsyncThunk(
  "lens/createLensType",
  async (values, { rejectWithValue }) => {
    try {
      const data = await createNewLensTypeApi(values);
      if (data.statusCode === 201) {
        toast.success(data.message);
        return data.newLensType;
      }
    } catch (error) {
      const data = error?.response?.data;
      console.log(data);

      toast.error(data.errors.message);
      return rejectWithValue(data);
    }
  }
);

export const deleteLensType = createAsyncThunk(
  "lens/deleteLensType",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteLensTypeById(id);
      toast.success(data.message);
      return id;
    } catch (error) {
      const errors = error?.response?.data?.errors;
      toast.error(errors.message);
      return rejectWithValue(errors);
    }
  }
);

const lensSlice = createSlice({
  name: "lens",
  initialState: {
    lensList: [],
    refractiveIndexList: [],
    lensType: [],
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
      .addCase(fetchAllLensType.fulfilled, (state, action) => {
        state.lensType = action.payload;
      })

      .addCase(createNewRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList.push(action.payload);
      })

      .addCase(createNewLensType.fulfilled, (state, action) => {
        state.lensType.push(action.payload);
      })

      .addCase(deleteRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList = state.refractiveIndexList.filter(
          (ref) => ref.id !== action.payload
        );
      })
      .addCase(deleteLensType.fulfilled, (state, action) => {
        state.lensType = state.lensType.filter(
          (lType) => lType.id !== action.payload
        );
      });
  },
});

export default lensSlice.reducer;
