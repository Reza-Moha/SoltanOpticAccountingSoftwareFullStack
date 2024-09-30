import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNewRefractiveIndexApi } from "@/services/admin/admin.service";
import toast from "react-hot-toast";

// export const fetchAllEmployees = createAsyncThunk(
//   "employee/fetchEmployee",
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllEmployeeApi();
//       return data.allEmployee;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
      //   .addCase(fetchAllEmployees.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(fetchAllEmployees.fulfilled, (state, action) => {
      //     state.employeeList = action.payload;
      //     state.isLoading = false;
      //   })
      //   .addCase(fetchAllEmployees.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.error = action.payload;
      //   })

      .addCase(createNewRefractiveIndex.fulfilled, (state, action) => {
        state.refractiveIndexList.push(action.payload);
      });

    //   .addCase(updateEmployee.fulfilled, (state, action) => {
    //     const index = state.employeeList.findIndex(
    //       (em) => em.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.employeeList[index] = action.payload;
    //     }
    //     console.log(state.employeeList[index]);
    //   })

    //   .addCase(deleteEmployee.fulfilled, (state, action) => {
    //     state.employeeList = state.employeeList.filter(
    //       (emp) => emp.id !== action.payload
    //     );
    //   });
  },
});

export default lensSlice.reducer;
