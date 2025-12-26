import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./productApi";

/* =====================
   ASYNC THUNKS
===================== */

export const fetchProduct = createAsyncThunk(
  "product/fetchProducts",
  async (params) => {
    return await fetchProducts(params);
  }
);

export const fetchProductId = createAsyncThunk(
  "product/fetchById",
  async (productId) => {
    return await fetchProductById(productId);
  }
);

/* =====================
   SLICE
===================== */

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProduct(state) {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // -------- PRODUCT LIST --------
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // -------- SINGLE PRODUCT --------
      .addCase(fetchProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
