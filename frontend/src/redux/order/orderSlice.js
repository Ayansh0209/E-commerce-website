import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  getOrderByIdAPI,
  getUserOrdersAPI
} from "./orderApi";

export const createOrder = createAsyncThunk(
  "order/create",
  async (addressData) => {
    return await createOrderAPI(addressData);
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (orderId) => {
    return await getOrderByIdAPI(orderId);
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async () => {
    return await getUserOrdersAPI();
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],          
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearOrder(state) {
      state.order = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch order by id
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch all orders (history)
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
