import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCartAPI,
  getCartAPI,
  removeCartItemAPI,
  updateCartItemAPI
} from "./cartApi";

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async () => await getCartAPI()
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (data) => await addItemToCartAPI(data)
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId, { dispatch }) => {
    await removeCartItemAPI(cartItemId);
    dispatch(fetchCart());
  }
);


export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ cartItemId, data }) =>
    await updateCartItemAPI(cartItemId, data)

)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
