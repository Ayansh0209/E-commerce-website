import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminCustomers } from "./adminDashboardApi";

export const fetchAdminCustomers = createAsyncThunk(
  "adminCustomers/fetch",
  async () => {
    return await getAdminCustomers();
  }
);

const adminCustomerSlice = createSlice({
  name: "adminCustomers",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAdminCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminCustomerSlice.reducer;
