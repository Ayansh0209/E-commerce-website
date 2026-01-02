import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductReviews } from "./reviewApi";

export const fetchReviews = createAsyncThunk(
  "review/fetchByProduct",
  async (productId) => {
    return await fetchProductReviews(productId);
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
