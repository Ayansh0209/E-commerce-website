import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./adminDashboardApi";

/* ---------------- DASHBOARD FETCH ---------------- */

export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetch",
  async () => {
    return await api.fetchDashboard();
  }
);

/* ---------------- SLICE ---------------- */

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    stats: null,
    revenueChart: [],
    recentOrders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.revenueChart = action.payload.revenueChart;
        state.recentOrders = action.payload.recentOrders;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminDashboardSlice.reducer;
