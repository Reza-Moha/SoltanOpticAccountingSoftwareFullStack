import {
  createNewLensCategoryApi,
  createNewLensApi,
  createNewLensTypeApi,
  createNewRefractiveIndexApi,
  deleteLensCategoriesByIdApi,
  deleteLensTypeById,
  deleteRefractiveIndexByIdApi,
  getAllLensCategoriesApi,
  getAllLensTypeApi,
  getAllRefractiveIndexApi,
  getAllLensApi,
} from "@/services/admin/admin.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

export const createNewLens = createAsyncThunk(
  "lens/createNewLens",
  async (values, { rejectWithValue }) => {
    try {
      const data = await createNewLensApi(values);
      if (data.statusCode === 201) {
        toast.success(data.message);
        return data.createdNewLens;
      }
    } catch (error) {
      const data = error?.response?.data;
      console.log(data);

      toast.error(data.errors.message);
      return rejectWithValue(data);
    }
  }
);

export const fetchAllLens = createAsyncThunk(
  "lens/fetchAllLens",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllLensApi();
      return data.allLens;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const createNewLensCategoires = createAsyncThunk(
  "lens/createNewLensCategoires",
  async (values, { rejectWithValue }) => {
    try {
      const newCategory = await createNewLensCategoryApi(values);
      if (newCategory.statusCode === 201) {
        toast.success(newCategory.message);
        return newCategory.newLensCategory;
      }
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data.message);
      return rejectWithValue(data);
    }
  }
);

export const deleteLensCategories = createAsyncThunk(
  "lens/deleteLensCategories",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteLensCategoriesByIdApi(id);
      toast.success(data.message);
      return id;
    } catch (error) {
      const errors = error?.response?.data?.errors;
      toast.error(errors.message);
      return rejectWithValue(errors);
    }
  }
);

export const fetchAllLensCategories = createAsyncThunk(
  "lens/fetchLensCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { allLensCategories } = await getAllLensCategoriesApi();
      return allLensCategories;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const lensSlice = createSlice({
  name: "lens",
  initialState: {
    lensList: [],
    refractiveIndexList: [],
    lensType: [],
    lensCategories: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLens.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLens.fulfilled, (state, action) => {
        state.lensList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllLens.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
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
      .addCase(fetchAllLensCategories.fulfilled, (state, action) => {
        state.lensCategories = action.payload;
      })

      .addCase(createNewRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList.push(action.payload);
      })
      .addCase(createNewLens.fulfilled, (state, action) => {
        state.lensList.push(action.payload);
      })
      .addCase(createNewLensCategoires.fulfilled, (state, action) => {
        state.lensCategories.push(action.payload);
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
      })
      .addCase(deleteLensCategories.fulfilled, (state, action) => {
        state.lensCategories = state.lensCategories.filter(
          (LCategory) => LCategory.id !== action.payload
        );
      });
  },
});

export default lensSlice.reducer;
