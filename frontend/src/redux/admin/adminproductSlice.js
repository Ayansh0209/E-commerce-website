import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./adminproductApi";

// GET ALL
export const getProducts = createAsyncThunk(
  "adminProducts/getAll",
  async (params) => {
    return await api.getAll(params);
  }
);

// ADD
export const addProduct = createAsyncThunk(
  "adminProducts/addOne",
  async (data) => {
    return await api.addOne(data);
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "adminProducts/delOne",
  async (id) => {
    await api.delOne(id);
    return id;
  }
);
export const updateProduct = createAsyncThunk(
  "adminProducts/update",
  async ({ id, data }) => {
    return await api.updateOne(id, data);
  }
);


const productSlice = createSlice({
  name: "adminProducts",
  initialState: {
    list: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.content;
        state.page = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
