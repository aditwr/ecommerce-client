import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orders: [],
  order: null,
};

export const createNewOrder = createAsyncThunk(
  "shoppingOrder/createOrder",
  async (orderData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/shop/order/create`,
        orderData
      );

      return response.data;
    } catch (error) {
      console.log("Error in createOrder", error);
      return error.response.data;
    }
  }
);

export const capturePayment = createAsyncThunk(
  "shoppingOrder/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    console.log("paymentId", paymentId);
    console.log("payerId", payerId);
    console.log("orderId", orderId);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/shop/order/capture-payment`,
        {
          paymentId,
          payerId,
          orderId,
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error in capturePayment", error);
      return error.response.data;
    }
  }
);

export const getOrdersByUserId = createAsyncThunk(
  "shoppingOrder/getOrders",
  async ({ userId, page, limit, sort }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/shop/order/${userId}/get?page=${page}&limit=${limit}&sort=${sort}`
      );
      return response.data;
    } catch (error) {
      console.log("Error in getOrdersByUserId", error);
      return error.response.data;
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    createOrderStart(state) {
      state.isLoading = true;
    },
    createOrderSuccess(state, action) {
      state.isLoading = false;
      state.approvalURL = action.payload.approvalURL;
      state.order = action.payload.order;
    },
    createOrderFail(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("orderId", action.payload.orderId);
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });

    builder
      .addCase(getOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(getOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      });
  },
});

export default shoppingOrderSlice.reducer;
