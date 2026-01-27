import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUserAddressesAPI,
  addAddressAPI,
  updateAddressAPI,
  deleteAddressAPI
} from "./addressApi";

// THUNKS

export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async () => {
    return await fetchUserAddressesAPI();
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData) => {
    return await addAddressAPI(addressData);
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, addressData }) => {
    return await updateAddressAPI({ addressId, addressData });
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId) => {
    return await deleteAddressAPI(addressId);
  }
);

// SLICE

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null
  },
  reducers: {
    clearAddresses(state) {
      state.addresses = [];
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          addr => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          addr => addr._id !== action.payload
        );
      });
  }
});

export const { clearAddresses, setSelectedAddress } = addressSlice.actions;
export default addressSlice.reducer;
