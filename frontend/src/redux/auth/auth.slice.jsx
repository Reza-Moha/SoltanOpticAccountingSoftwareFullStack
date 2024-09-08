const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  fetchProfileSuccess,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
