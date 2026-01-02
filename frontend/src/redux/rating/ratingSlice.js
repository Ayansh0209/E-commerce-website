import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductRatings } from "./ratingApi";

export const fetchRatings = createAsyncThunk(
  "rating/fetchByProduct",
  async (productId) => {
    return await fetchProductRatings(productId);
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    averageRating: 0,
    totalRatings: 0,
    distribution: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ratingSlice.reducer;
