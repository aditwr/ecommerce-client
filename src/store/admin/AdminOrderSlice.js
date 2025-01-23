import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  orders: [],
  isLoading: false,
};

export const fetchAllOrders = createAsyncThunk(
  "shoppingOrder/getAllOrders",
  async ({ page = 1, limit = 10, sort = "newest" }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/order/get?page=${page}&limit=${limit}&sort=${sort}`
      );
      return response.data;
    } catch (error) {
      console.log("Error in getAllOrders", error);
      return error.response.data;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "shoppingOrder/updateOrderStatus",
  async ({ orderId, orderStatus }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/order/update/${orderId}`,
        { orderStatus }
      );
      return response.data;
    } catch (error) {
      console.log("Error in updateOrderStatus", error);
      return error.response.data;
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.data;
    });
    builder.addCase(fetchAllOrders.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default adminOrderSlice.reducer;
